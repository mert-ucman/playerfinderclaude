import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ChevronDown, Check } from 'lucide-react';

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
}

export default function CustomSelect({ value, onChange, options, placeholder }: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLButtonElement>(null);

  const updatePosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const dropH = Math.min(230, options.length * 40 + 16);
    const openUpward = spaceBelow < dropH + 8 && rect.top > dropH + 8;
    setDropdownStyle({
      position: 'fixed',
      left: rect.left,
      width: rect.width,
      zIndex: 9999,
      ...(openUpward
        ? { bottom: window.innerHeight - rect.top + 5 }
        : { top: rect.bottom + 5 }),
    });
  };

  const handleOpen = () => {
    updatePosition();
    setOpen(o => !o);
  };

  useEffect(() => {
    if (!open) return;
    const onScroll = () => updatePosition();
    const onResize = () => updatePosition();
    const onMouseDown = (e: MouseEvent) => {
      const el = e.target as Node;
      if (triggerRef.current?.contains(el)) return;
      const portal = document.getElementById('cs-portal-active');
      if (portal?.contains(el)) return;
      setOpen(false);
    };
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onResize);
    document.addEventListener('mousedown', onMouseDown);
    return () => {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('mousedown', onMouseDown);
    };
  }, [open]);

  const dropdown = open
    ? ReactDOM.createPortal(
        <div id="cs-portal-active" className="cs-dropdown" style={dropdownStyle}>
          {placeholder && (
            <div
              className={`cs-option cs-opt-placeholder${!value ? ' active' : ''}`}
              onMouseDown={e => { e.preventDefault(); onChange(''); setOpen(false); }}
            >
              {placeholder}
            </div>
          )}
          {options.map(opt => (
            <div
              key={opt}
              className={`cs-option${value === opt ? ' active' : ''}`}
              onMouseDown={e => { e.preventDefault(); onChange(opt); setOpen(false); }}
            >
              {value === opt && <Check size={12} className="cs-check" />}
              {opt}
            </div>
          ))}
        </div>,
        document.body
      )
    : null;

  return (
    <div className="custom-select">
      <button
        ref={triggerRef}
        type="button"
        className={`cs-trigger${open ? ' open' : ''}${!value ? ' cs-placeholder' : ''}`}
        onClick={handleOpen}
      >
        <span>{value || placeholder || 'Seç...'}</span>
        <ChevronDown size={14} className="cs-arrow" />
      </button>
      {dropdown}
    </div>
  );
}
