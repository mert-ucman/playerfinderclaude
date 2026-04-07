import { useState, useEffect } from 'react';

export function useModals() {
  const [showMatch, setShowMatch] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowMatch(false);
        setShowFilter(false);
        setShowRegister(false);
        setShowLogin(false);
        setShowMessages(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return {
    showMatch, setShowMatch,
    showFilter, setShowFilter,
    showRegister, setShowRegister,
    showLogin, setShowLogin,
    showMessages, setShowMessages,
  };
}
