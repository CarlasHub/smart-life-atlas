import { Calendar, History, MapPin, Receipt, ShieldCheck } from 'lucide-react';
import { MOCK_MEMORY } from '../data/assistant';

export function Memory({ activeDimensions, onNavigate }) {
  const memory = MOCK_MEMORY.lisbon_2022;
  const isConnected = activeDimensions.includes('memory');
  const confidencePercent = Math.round(memory.confidence * 100);

  return (
    <div className="main-content memory-page animate-fade-in">
      <header className="page-kicker">
        <p className="eyebrow">Memory</p>
        <h1 className="text-display-large">Ask about a day.</h1>
        <p className="text-body-large">Atlas can reconstruct a likely answer from calendar, receipt, and travel-history signals when Memory is connected.</p>
      </header>

      <section className="memory-search" aria-labelledby="memory-search-title">
        <label id="memory-search-title" className="text-title-medium" htmlFor="memory-question">Sample question</label>
        <div className="memory-question-box">
          <History size={20} aria-hidden="true" />
          <input id="memory-question" type="text" value={memory.question} readOnly aria-describedby="memory-question-help" />
        </div>
        <p id="memory-question-help" className="helper-text">This prototype uses deterministic synthetic history for the 11 June 2022 answer.</p>
      </section>

      {!isConnected ? (
        <section className="locked-panel" aria-label="Memory source required">
          <ShieldCheck size={28} aria-hidden="true" />
          <div>
            <h2 className="text-title-large">Memory is off.</h2>
            <p className="text-body-medium">I cannot answer that because the required source is not connected.</p>
          </div>
          <button type="button" className="m3-button primary" onClick={() => onNavigate('connect')}>Connect Memory</button>
        </section>
      ) : (
        <div className="memory-result">
          <section className="memory-answer" aria-labelledby="memory-answer-title">
            <header className="answer-header">
              <MapPin size={28} aria-hidden="true" />
              <div>
                <p className="eyebrow">Likely location</p>
                <h2 id="memory-answer-title" className="text-headline-medium">{memory.likelyLocation}</h2>
              </div>
            </header>
            <p className="answer-callout">{memory.answer}</p>
            <p className="text-body-large">{memory.narrative}</p>
            <div className="confidence">
              <span className="text-label-large">Confidence</span>
              <div
                className="bar-container"
                role="meter"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={confidencePercent}
                aria-label={`Confidence ${confidencePercent} percent`}
              >
                <div className="bar" style={{ width: `${confidencePercent}%` }} />
              </div>
              <span className="text-label-large">{confidencePercent}%</span>
            </div>
            <p className="uncertainty-note">{memory.uncertainty}</p>
          </section>

          <section className="memory-columns" aria-label="Memory evidence and timeline">
            <div>
              <div className="section-heading compact">
                <p className="eyebrow">Evidence</p>
                <h2 className="text-title-large">Why Atlas thinks this.</h2>
              </div>
              <div className="memory-evidence-list">
                {memory.evidence.map((evidence) => (
                  <article key={`${evidence.type}-${evidence.detail}`} className="memory-mini-card">
                    <header>
                      {evidence.type === 'Calendar' ? <Calendar size={19} aria-hidden="true" /> : <Receipt size={19} aria-hidden="true" />}
                      <span className="text-label-large">{evidence.type}</span>
                    </header>
                    <p className="text-body-medium">{evidence.detail}</p>
                    <span>{evidence.source}</span>
                  </article>
                ))}
              </div>
            </div>

            <div>
              <div className="section-heading compact">
                <p className="eyebrow">Timeline</p>
                <h2 className="text-title-large">11 June 2022 history.</h2>
              </div>
              <div className="history-card-list">
                {memory.timeline.map((item) => (
                  <article key={item.time} className="history-card">
                    <time>{item.time}</time>
                    <div>
                      <h3 className="text-title-medium">{item.title}</h3>
                      <p className="text-body-medium">{item.detail}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
