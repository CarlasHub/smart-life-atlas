import { useState } from 'react';
import { Mic, Send, ShieldCheck, UserCircle2 } from 'lucide-react';
import { PERSONAS, PRESET_QUERIES, getAssistantResponse } from '../data/assistant';
import { AtlasSpark } from './AtlasSpark';
import { SmartAvatar } from './SmartAvatar';

export function AskAtlas({ activeDimensions }) {
  const [persona, setPersona] = useState('calm');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const selectedPersona = PERSONAS.find((p) => p.id === persona);
  const insightReady = ['health', 'travel', 'integrity'].every((dimension) => activeDimensions.includes(dimension));

  const handleQuery = (query) => {
    const userMessage = { role: 'user', text: query.text };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    window.setTimeout(() => {
      const response = getAssistantResponse(query.id, activeDimensions, persona);
      setMessages((prev) => [...prev, { role: 'assistant', text: response }]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <div className="main-content ask-page animate-fade-in">
      <header className="assistant-hero">
        <div>
          <p className="eyebrow">Ask Atlas</p>
          <h1 className="text-display-large">A calm assistant for your real day.</h1>
          <p className="text-body-large">Ask about the approved synthetic sources. Atlas answers only when the required life area is connected.</p>
        </div>
        <div className="assistant-avatar-stack">
          <SmartAvatar
            active={isTyping}
            activeDimensions={activeDimensions}
            mode="ask"
            personaLabel={selectedPersona.label}
            insightReady={insightReady}
          />
          <span className="m3-badge-planned"><Mic size={15} aria-hidden="true" /> Voice mode planned</span>
        </div>
      </header>

      <section className="persona-selection" aria-labelledby="persona-title">
        <div className="section-heading compact">
          <p className="eyebrow">Persona</p>
          <h2 id="persona-title" className="text-headline-medium">Choose how Atlas speaks.</h2>
        </div>
        <div className="persona-grid">
          {PERSONAS.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`persona-card ${persona === p.id ? 'active' : ''}`}
              onClick={() => setPersona(p.id)}
              aria-pressed={persona === p.id}
            >
              <span className="persona-heading">
                <UserCircle2 size={23} aria-hidden="true" />
                <span className="text-title-medium">{p.label}</span>
              </span>
              <span className="text-body-medium">{p.desc}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="chat-interface" aria-labelledby="chat-title">
        <div className="chat-header">
          <div>
            <p className="eyebrow">Conversation</p>
            <h2 id="chat-title" className="text-title-large">Preset questions</h2>
          </div>
          <span className="privacy-chip"><ShieldCheck size={16} aria-hidden="true" /> Source-gated answers</span>
        </div>

        <div className="message-list" aria-live="polite">
          {messages.length === 0 && (
            <div className="empty-state">
              <AtlasSpark size={74} active={isTyping} />
              <p className="text-body-large">What would you like Atlas to check, Carla?</p>
              <p className="text-body-medium">Try the preset questions below to see deterministic source-aware answers.</p>
            </div>
          )}
          {messages.map((message, index) => (
            <div key={`${message.role}-${index}`} className={`message-item ${message.role}`}>
              {message.role === 'assistant' && <AtlasSpark size={24} />}
              <div className="bubble">
                <p className="text-body-medium">{message.text}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="message-item assistant">
              <AtlasSpark size={24} active />
              <div className="bubble typing" aria-label="Atlas is preparing an answer">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
            </div>
          )}
        </div>

        <div className="chat-controls">
          <div className="preset-queries" aria-label="Preset questions">
            {PRESET_QUERIES.map((q) => (
              <button key={q.id} type="button" className="m3-button tonal" onClick={() => handleQuery(q)}>
                {q.text}
              </button>
            ))}
          </div>
          <div className="input-bar" aria-label="Planned custom message input">
            <input type="text" value="Custom typing is planned for the next prototype." readOnly aria-label="Custom message input planned" />
            <button type="button" className="m3-button outlined" disabled aria-label="Send message">
              <Send size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
