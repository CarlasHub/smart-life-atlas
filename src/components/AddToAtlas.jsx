import { useEffect, useRef, useState } from 'react';
import {
  CalendarPlus,
  CheckCircle2,
  FilePlus2,
  FileText,
  History,
  NotebookPen,
  Paperclip,
  Plus,
  ShieldCheck,
  X,
} from 'lucide-react';
import { LIFE_DIMENSIONS } from '../data/sources';

const ENTRY_TYPES = [
  {
    id: 'note',
    label: 'Add note',
    shortLabel: 'Note',
    helper: 'Tell Atlas something important.',
    icon: NotebookPen,
  },
  {
    id: 'document',
    label: 'Add document',
    shortLabel: 'Document',
    helper: 'Name a PDF, form, or screenshot.',
    icon: FilePlus2,
  },
  {
    id: 'commitment',
    label: 'Add commitment',
    shortLabel: 'Commitment',
    helper: 'Add a promise, plan, or deadline.',
    icon: CalendarPlus,
  },
  {
    id: 'evidence',
    label: 'Add evidence',
    shortLabel: 'Evidence',
    helper: 'Attach proof to an insight.',
    icon: Paperclip,
  },
  {
    id: 'memory',
    label: 'Correct memory',
    shortLabel: 'Memory',
    helper: 'Fix or confirm a remembered detail.',
    icon: History,
  },
];

const TYPE_LOOKUP = Object.fromEntries(ENTRY_TYPES.map((type) => [type.id, type]));

function formatEntryTime(value) {
  return new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function formatSignalDate(value) {
  if (!value) {
    return null;
  }

  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function getDimensionLabel(id) {
  return LIFE_DIMENSIONS.find((dimension) => dimension.id === id)?.label || 'Memory';
}

function createEmptyForm() {
  return {
    type: ENTRY_TYPES[0].id,
    title: '',
    details: '',
    dimension: 'memory',
    when: '',
    fileName: '',
  };
}

export function AddToAtlas({ isOpen, onClose, onAddEntry }) {
  const [form, setForm] = useState(createEmptyForm);
  const dialogRef = useRef(null);
  const selectedType = TYPE_LOOKUP[form.type] || ENTRY_TYPES[0];

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    dialogRef.current?.focus();

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', closeOnEscape);

    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const submitEntry = (event) => {
    event.preventDefault();

    const entry = {
      id: `atlas-entry-${Date.now()}`,
      type: form.type,
      typeLabel: selectedType.shortLabel,
      title: form.title.trim(),
      details: form.details.trim(),
      dimension: form.dimension,
      dimensionLabel: getDimensionLabel(form.dimension),
      when: form.when,
      fileName: form.fileName,
      createdAt: new Date().toISOString(),
    };

    onAddEntry(entry);
    setForm(createEmptyForm());
    onClose();
  };

  return (
    <div
      className="add-atlas-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        ref={dialogRef}
        className="add-atlas-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-atlas-title"
        tabIndex={-1}
      >
        <header className="add-atlas-dialog-header">
          <div>
            <p className="eyebrow">Add to Atlas</p>
            <h2 id="add-atlas-title" className="text-headline-medium">Give Atlas more context.</h2>
            <p className="text-body-medium">This prototype stores the new signal only in this browser session.</p>
          </div>
          <button type="button" className="tour-icon-button" onClick={onClose} aria-label="Close Add to Atlas">
            <X size={18} aria-hidden="true" />
          </button>
        </header>

        <form className="add-atlas-form" onSubmit={submitEntry}>
          <fieldset className="add-atlas-type-grid">
            <legend className="text-label-large">What are you adding?</legend>
            {ENTRY_TYPES.map((type) => {
              const Icon = type.icon;
              const selected = form.type === type.id;

              return (
                <button
                  key={type.id}
                  type="button"
                  className={`add-atlas-type ${selected ? 'active' : ''}`}
                  onClick={() => updateField('type', type.id)}
                  aria-pressed={selected}
                >
                  <Icon size={19} aria-hidden="true" />
                  <span>{type.label}</span>
                  <small>{type.helper}</small>
                </button>
              );
            })}
          </fieldset>

          <div className="add-atlas-field-grid">
            <label className="add-atlas-field">
              <span>Title</span>
              <input
                type="text"
                value={form.title}
                onChange={(event) => updateField('title', event.target.value)}
                placeholder="Example: Medical certificate is ready"
                required
              />
            </label>

            <label className="add-atlas-field">
              <span>Life area</span>
              <select value={form.dimension} onChange={(event) => updateField('dimension', event.target.value)}>
                {LIFE_DIMENSIONS.map((dimension) => (
                  <option key={dimension.id} value={dimension.id}>{dimension.label}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="add-atlas-field">
            <span>Details</span>
            <textarea
              value={form.details}
              onChange={(event) => updateField('details', event.target.value)}
              placeholder="Write the note, correction, commitment, or evidence summary Atlas should remember."
              rows={4}
              required
            />
          </label>

          <div className="add-atlas-field-grid">
            <label className="add-atlas-field">
              <span>Date or deadline</span>
              <input type="datetime-local" value={form.when} onChange={(event) => updateField('when', event.target.value)} />
            </label>

            <label className="add-atlas-field">
              <span>File name</span>
              <input
                type="file"
                onChange={(event) => updateField('fileName', event.target.files?.[0]?.name || '')}
                aria-describedby="file-help"
              />
            </label>
          </div>

          <p id="file-help" className="add-atlas-help">
            <ShieldCheck size={16} aria-hidden="true" />
            File selection is simulated. The app stores the file name only and does not upload anything.
          </p>

          <footer className="add-atlas-actions">
            <button type="button" className="m3-button text" onClick={onClose}>Cancel</button>
            <button type="submit" className="m3-button primary">
              <Plus size={18} aria-hidden="true" />
              Add signal
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}

export function AddToAtlasSummary({ entries = [], onOpen }) {
  const recentEntries = entries.slice(0, 3);

  return (
    <section className="add-atlas-summary" aria-labelledby="add-atlas-summary-title">
      <div className="add-atlas-summary-header">
        <div className="section-heading compact">
          <p className="eyebrow">Add to Atlas</p>
          <h2 id="add-atlas-summary-title" className="text-headline-medium">Tell Atlas what apps may miss.</h2>
          <p className="text-body-medium">
            Add a note, document name, commitment, evidence item, or memory correction as a user-approved synthetic signal.
          </p>
        </div>
        <button type="button" className="m3-button primary" onClick={onOpen}>
          <Plus size={18} aria-hidden="true" />
          Add to Atlas
        </button>
      </div>

      {recentEntries.length ? (
        <div className="user-signal-list" aria-label="Recently added Atlas signals" aria-live="polite">
          {recentEntries.map((entry) => {
            const Icon = TYPE_LOOKUP[entry.type]?.icon || FileText;
            const signalDate = formatSignalDate(entry.when);

            return (
              <article key={entry.id} className="user-signal-card">
                <header>
                  <span className="user-signal-icon"><Icon size={18} aria-hidden="true" /></span>
                  <div>
                    <p className="eyebrow">{entry.typeLabel} - {entry.dimensionLabel}</p>
                    <h3 className="text-title-medium">{entry.title}</h3>
                  </div>
                </header>
                <p className="text-body-medium">{entry.details}</p>
                <footer>
                  <span><CheckCircle2 size={15} aria-hidden="true" /> Added {formatEntryTime(entry.createdAt)}</span>
                  {signalDate ? <span><CalendarPlus size={15} aria-hidden="true" /> {signalDate}</span> : null}
                  {entry.fileName ? <span><Paperclip size={15} aria-hidden="true" /> {entry.fileName}</span> : null}
                </footer>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="add-atlas-empty">
          {ENTRY_TYPES.map((type) => {
            const Icon = type.icon;

            return (
              <span key={type.id}>
                <Icon size={17} aria-hidden="true" />
                {type.shortLabel}
              </span>
            );
          })}
        </div>
      )}
    </section>
  );
}
