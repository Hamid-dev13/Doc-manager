import { useState, useRef, useEffect } from 'react';

export default function EditableText({ value, onSave, placeholder, tag: Tag = 'span', className = '' }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => { setDraft(value); }, [value]);

  useEffect(() => {
    if (editing && inputRef.current) inputRef.current.focus();
  }, [editing]);

  const commit = () => {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== value) onSave(trimmed);
    else setDraft(value);
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && Tag !== 'textarea') { e.preventDefault(); commit(); }
    if (e.key === 'Escape') { setDraft(value); setEditing(false); }
  };

  if (editing) {
    const InputTag = Tag === 'textarea' ? 'textarea' : 'input';
    return (
      <InputTag
        ref={inputRef}
        className={`editable-input ${className}`}
        value={draft}
        onChange={e => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={Tag === 'textarea' ? 3 : undefined}
      />
    );
  }

  return (
    <Tag
      className={`editable-text ${className}`}
      onClick={() => setEditing(true)}
      title="Cliquer pour modifier"
    >
      {value || <span className="editable-placeholder">{placeholder}</span>}
    </Tag>
  );
}
