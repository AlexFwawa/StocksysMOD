import { useState, useEffect, useRef } from 'react';

const Toast = ({ toast, onClose }) => {
  const [closing, setClosing] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(100);
  const timerRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const remainingRef = useRef(30000); // 30 segundos

  const DURATION = 30000;

  const startTimer = () => {
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const newRemaining = remainingRef.current - elapsed;
      if (newRemaining <= 0) {
        clearInterval(timerRef.current);
        handleClose();
      } else {
        const totalElapsed = DURATION - newRemaining;
        setProgress(((DURATION - totalElapsed) / DURATION) * 100);
      }
    }, 50);
  };

  const pauseTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      const elapsed = Date.now() - startTimeRef.current;
      remainingRef.current = Math.max(0, remainingRef.current - elapsed);
    }
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    setPaused(true);
    pauseTimer();
  };

  const handleMouseLeave = () => {
    setPaused(false);
    startTimer();
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => onClose(toast.id), 300);
  };

  const isError = toast.type === 'error';

  return (
    <div
      className={`toast ${toast.type} ${closing ? 'closing' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="alert"
    >
      <div className="toast-icon">
        {isError ? (
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        ) : (
          <svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        )}
      </div>
      <div className="toast-content">
        <div className="toast-title">{toast.message}</div>
        {toast.detail && <div className="toast-message">{toast.detail}</div>}
      </div>
      <button className="toast-close" onClick={handleClose} aria-label="Cerrar notificación">
        <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <div className="toast-progress" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default Toast;
