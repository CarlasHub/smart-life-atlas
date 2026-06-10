import { Brain, CheckCircle2, Eye, LockKeyhole, Sparkles } from 'lucide-react';
import { AtlasSpark } from './AtlasSpark';

export function SmartAvatar({
  active = false,
  activeDimensions = [],
  mode = 'home',
  personaLabel = 'Calm Guide',
  insightReady = false,
}) {
  const connectedCount = activeDimensions.length;
  const hasMemory = activeDimensions.includes('memory');
  const avatarTitle = mode === 'ask' ? `Atlas is listening as ${personaLabel}` : 'Atlas is with you';
  const avatarStatus = insightReady
    ? 'I am watching a timing conflict before tomorrow evening.'
    : 'I am ready when the right life areas are connected.';

  return (
    <aside className={`smart-avatar-card ${mode}`} aria-label="Atlas smart avatar">
      <div className="avatar-stage">
        <AtlasSpark size={mode === 'ask' ? 118 : 132} active={active} />
        <span className="avatar-sensor sensor-blue"><Eye size={14} aria-hidden="true" /></span>
        <span className="avatar-sensor sensor-green"><CheckCircle2 size={14} aria-hidden="true" /></span>
        <span className="avatar-sensor sensor-yellow"><Sparkles size={14} aria-hidden="true" /></span>
      </div>

      <div className="avatar-copy">
        <p className="eyebrow">Smart avatar</p>
        <h2 className="text-title-large">{avatarTitle}</h2>
        <p className="text-body-medium">{avatarStatus}</p>
      </div>

      <dl className="avatar-intelligence">
        <div>
          <dt><Brain size={16} aria-hidden="true" /> Context</dt>
          <dd>{connectedCount} life {connectedCount === 1 ? 'area' : 'areas'} connected</dd>
        </div>
        <div>
          <dt><Eye size={16} aria-hidden="true" /> Focus</dt>
          <dd>{insightReady ? 'Recovery, flight, signing' : 'Waiting for required sources'}</dd>
        </div>
        <div>
          <dt><LockKeyhole size={16} aria-hidden="true" /> Memory</dt>
          <dd>{hasMemory ? '11 June 2022 recall is available' : 'Memory stays private until connected'}</dd>
        </div>
      </dl>
    </aside>
  );
}
