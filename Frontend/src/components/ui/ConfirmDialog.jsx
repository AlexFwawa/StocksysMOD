import { useEffect, useState } from 'react';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, itemName, confirmText = 'Eliminar', loading = false }) => {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => { if (e.key === 'Escape') handleClose(); };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    if (loading) return;
    setClosing(true);
    setTimeout(() => { setClosing(false); onClose(); }, 200);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  if (!isOpen && !closing) return null;

  return (
    <div className={`modal-overlay ${closing ? 'closing' : ''}`} onClick={handleOverlayClick}>
      <div className="modal-container" style={{ maxWidth: '400px' }} role="alertdialog" aria-modal="true">
        <div className="modal-body" style={{ paddingTop: '28px' }}>
          <div className="confirm-icon danger">
            <svg viewBox="0 0 24 24">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <div className="confirm-message">
            <h3>{title || '¿Confirmar eliminación?'}</h3>
            <p>
              {message || (
                <>¿Estás seguro de que deseas eliminar <strong>"{itemName}"</strong>? Esta acción no se puede deshacer.</>
              )}
            </p>
          </div>
          <div className="confirm-actions">
            <button className="btn-secondary" onClick={handleClose} disabled={loading}>Cancelar</button>
            <button className="btn-danger" onClick={onConfirm} disabled={loading}>
              {loading ? 'Eliminando...' : confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
