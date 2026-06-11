import { useState } from 'react';
import { ArrowRight, CalendarDays, FileSignature, HeartPulse, MapPin, Plane, ShieldCheck } from 'lucide-react';
import { INSIGHTS } from '../data/insights';
import { getMorningNarrative } from '../data/narrative';
import { LIFE_DIMENSIONS } from '../data/sources';
import { SmartAvatar } from './SmartAvatar';
import heroImage from '../assets/atlas-immersive-hero.jpg';

const HERO_SIGNALS = [
  {
    id: 'recovery',
    label: 'Recovery',
    title: '36-hour no-fly window',
    detail: 'Procedure at 08:00 changes the rest of the timeline.',
    icon: HeartPulse,
    action: 'briefing',
  },
  {
    id: 'flight',
    label: 'Travel',
    title: 'Flight at 19:30',
    detail: 'UA242 is inside the medical restriction window.',
    icon: Plane,
    action: 'briefing',
  },
  {
    id: 'memory',
    label: 'Memory',
    title: 'Lisbon recall ready',
    detail: 'Atlas can answer where you were on 11 June 2022.',
    icon: MapPin,
    action: 'memory',
  },
];

export function Home({ activeDimensions, onNavigate, onStartJudgeMode }) {
  const [activeSignal, setActiveSignal] = useState(HERO_SIGNALS[0]);
  const isConnected = (id) => activeDimensions.includes(id);
  const insight = INSIGHTS[0];
  const conflictReady = insight.requiredDimensions.every(isConnected);

  return (
    <div className="main-content home-page animate-fade-in">
      <section className="home-hero" aria-labelledby="home-title">
        <img className="home-hero-art" src={heroImage} alt="" aria-hidden="true" />
        <div className="home-hero-overlay" aria-hidden="true" />
        <div className="hero-copy">
          <div className="atlas-lockup">
            <span className="atlas-wordmark">Atlas</span>
            <span>Personal intelligence for real life</span>
          </div>
          <p className="eyebrow">Good morning, Carla</p>
          <h1 id="home-title" className="text-display-large">Here is what Atlas noticed.</h1>
          <p className="text-body-large hero-narrative">{getMorningNarrative(activeDimensions)}</p>

          <div className="hero-actions" aria-label="Quick actions">
            <button type="button" className="m3-button primary" onClick={() => onNavigate('briefing')}>
              Review briefing <ArrowRight size={18} aria-hidden="true" />
            </button>
            <button type="button" className="m3-button tonal" onClick={() => onNavigate('ask')}>
              Ask Atlas
            </button>
            <button type="button" className="m3-button text" onClick={() => onNavigate('connect')}>
              Connect sources
            </button>
            <button type="button" className="m3-button outlined" onClick={onStartJudgeMode}>
              Judge overlay
            </button>
          </div>

          <p className="privacy-note">
            <ShieldCheck size={18} aria-hidden="true" />
            Atlas only reasons over approved synthetic sources you leave connected.
          </p>
        </div>

        <div className="immersive-panel">
          <SmartAvatar active={conflictReady} activeDimensions={activeDimensions} insightReady={conflictReady} />
          <div className="signal-preview" aria-live="polite">
            <p className="eyebrow">{activeSignal.label}</p>
            <h2 className="text-title-large">{activeSignal.title}</h2>
            <p className="text-body-medium">{activeSignal.detail}</p>
          </div>
        </div>

        <div className="hero-signal-dock" aria-label="Live Atlas signals">
          {HERO_SIGNALS.map((signal) => (
            <button
              key={signal.id}
              type="button"
              className={`hero-signal ${activeSignal.id === signal.id ? 'active' : ''}`}
              onMouseEnter={() => setActiveSignal(signal)}
              onFocus={() => setActiveSignal(signal)}
              onClick={() => onNavigate(signal.action)}
            >
              <signal.icon size={18} aria-hidden="true" />
              <span>{signal.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="personal-context-strip" aria-label="Personal context">
        <article>
          <CalendarDays size={22} aria-hidden="true" />
          <div>
            <p className="eyebrow">Today</p>
            <h2 className="text-title-medium">Procedure at 08:00</h2>
            <p className="text-body-medium">Atlas is keeping recovery instructions visible.</p>
          </div>
        </article>
        <article>
          <FileSignature size={22} aria-hidden="true" />
          <div>
            <p className="eyebrow">Tomorrow</p>
            <h2 className="text-title-medium">Signing at 09:00</h2>
            <p className="text-body-medium">The deadline and workaround are ready to review.</p>
          </div>
        </article>
        <article>
          <MapPin size={22} aria-hidden="true" />
          <div>
            <p className="eyebrow">Memory</p>
            <h2 className="text-title-medium">Lisbon recall is available</h2>
            <p className="text-body-medium">Ask where you were on 11 June 2022.</p>
          </div>
        </article>
      </section>

      <section className="life-strip" aria-labelledby="life-areas-title">
        <div className="section-heading">
          <p className="eyebrow">Life areas</p>
          <h2 id="life-areas-title" className="text-headline-medium">Connected context, kept simple.</h2>
        </div>
        <div className="life-chip-row" role="list">
          {LIFE_DIMENSIONS.map((dim) => (
            <div key={dim.id} className={`life-chip ${isConnected(dim.id) ? 'active' : ''} accent-${dim.accent}`} role="listitem">
              <dim.icon size={18} aria-hidden="true" />
              <span>{dim.label}</span>
              <strong>{isConnected(dim.id) ? 'On' : 'Off'}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className={`insight-feature ${conflictReady ? 'ready' : 'needs-sources'}`} aria-labelledby="important-insight-title">
        <div className="insight-main">
          <p className="eyebrow">Important insight</p>
          <h2 id="important-insight-title" className="text-headline-medium">
            {conflictReady ? insight.summary : 'Connect Health, Travel, and Integrity to check the timing conflict.'}
          </h2>
          <p className="text-body-large">
            {conflictReady
              ? 'The recovery rule, flight, and legal signing overlap in a way normal calendars usually miss.'
              : 'Atlas will not reason over this briefing until the required life areas are connected.'}
          </p>
        </div>
        <div className="insight-support">
          <span className="signal-pill">{conflictReady ? '98% confidence' : 'Needs sources'}</span>
          <button
            type="button"
            className="m3-button outlined"
            onClick={() => onNavigate(conflictReady ? 'briefing' : 'connect')}
          >
            {conflictReady ? 'Open evidence' : 'Choose sources'}
          </button>
        </div>
      </section>

      <section className="home-grid" aria-label="Atlas overview">
        <article className="soft-panel">
          <p className="eyebrow">Current narrative</p>
          <h2 className="text-title-large">A supportive brief, not a warning log.</h2>
          <p className="text-body-medium">Atlas keeps the day readable by turning scattered synthetic signals into one calm story with evidence attached.</p>
        </article>

        <article className="soft-panel">
          <p className="eyebrow">Next useful step</p>
          <h2 className="text-title-large">Resolve the timing before tomorrow evening.</h2>
          <p className="text-body-medium">The strongest path is to review Clause 8.1 and prepare the remote notary request if the connected sources stay enabled.</p>
        </article>
      </section>
    </div>
  );
}
