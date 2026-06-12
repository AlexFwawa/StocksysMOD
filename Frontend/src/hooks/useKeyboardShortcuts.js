import { useEffect } from 'react';

/**
 * Hook para registrar atajos de teclado con SHIFT + Key.
 * Se desactiva cuando un input, textarea o select tiene foco.
 *
 * @param {Object} shortcuts - Mapa de tecla (minúscula) a callback, ej: { c: () => {}, s: () => {} }
 * @param {boolean} enabled - Si los shortcuts están habilitados (default: true)
 */
export const useKeyboardShortcuts = (shortcuts, enabled = true) => {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e) => {
      // No activar si un input/textarea/select tiene foco
      const tag = document.activeElement?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

      // Solo SHIFT + tecla (sin Ctrl ni Alt ni Meta)
      if (!e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) return;

      const key = e.key.toLowerCase();
      if (shortcuts[key]) {
        e.preventDefault();
        shortcuts[key]();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts, enabled]);
};
