import { useState } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { useCategories } from '../../hooks/useCategories';
import { useToast } from '../../hooks/useToast';
import { crearCategoria, eliminarCategoria } from '../../services/categoriaService';
import ThemeCustomizer from './ThemeCustomizer';

const SettingsModal = ({ isOpen, onClose }) => {
  const { allowDecimals, setAllowDecimals, lowStockThreshold, setLowStockThreshold } = useSettings();
  const { categories, fetchCategories } = useCategories();
  const { showToast } = useToast();

  const [newCatName, setNewCatName] = useState('');
  const [activeTab, setActiveTab] = useState('general');

  if (!isOpen) return null;

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    try {
      await crearCategoria({ nombre: newCatName });
      setNewCatName('');
      showToast('Categoría creada', 'success');
      await fetchCategories();
    } catch (error) {
      showToast('Error al crear categoría', 'error');
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await eliminarCategoria(id);
      showToast('Categoría eliminada', 'success');
      await fetchCategories();
    } catch (error) {
      showToast('No se puede eliminar la categoría porque tiene productos asociados o hubo un error', 'error');
    }
  };

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header — fixed */}
        <div className="settings-modal-header">
          <h2 className="settings-modal-title">Ajustes del Sistema</h2>
          <button className="modal-close" onClick={onClose} aria-label="Cerrar ajustes">
            <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>

        {/* Tabs — fixed */}
        <div className="settings-modal-tabs-bar">
          <div className="settings-tabs">
            <button
              className={`settings-tab ${activeTab === 'general' ? 'active' : ''}`}
              onClick={() => setActiveTab('general')}
            >
              <svg viewBox="0 0 24 24"><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /><circle cx="12" cy="12" r="3" /></svg>
              General
            </button>
            <button
              className={`settings-tab ${activeTab === 'themes' ? 'active' : ''}`}
              onClick={() => setActiveTab('themes')}
            >
              <svg viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" /></svg>
              Temas
            </button>
          </div>
        </div>

        {/* Scrollable content area */}
        <div className="settings-modal-body">
          {/* ── General Tab ── */}
          {activeTab === 'general' && (
            <>
              {/* General Settings */}
              <div className="settings-section" style={{ marginBottom: '24px' }}>
                <h3 style={{ marginBottom: '12px', fontSize: '1.1rem', color: 'var(--text)' }}>Preferencias Generales</h3>

                <div className="form-group" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: 500, color: 'var(--text)' }}>Permitir decimales en stock</label>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Habilita el uso de números decimales para cantidades de productos.</span>
                  </div>
                  <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '40px', height: '24px', flexShrink: 0 }}>
                    <input
                      type="checkbox"
                      checked={allowDecimals}
                      onChange={(e) => setAllowDecimals(e.target.checked)}
                      style={{ opacity: 0, width: 0, height: 0 }}
                    />
                    <span className="slider" style={{
                      position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
                      backgroundColor: allowDecimals ? 'var(--accent)' : 'var(--border)',
                      transition: '.4s', borderRadius: '34px'
                    }}>
                      <span style={{
                        position: 'absolute', content: '""', height: '16px', width: '16px',
                        left: allowDecimals ? '20px' : '4px', bottom: '4px',
                        backgroundColor: 'white', transition: '.4s', borderRadius: '50%'
                      }}></span>
                    </span>
                  </label>
                </div>

                <div className="form-group">
                  <label>Umbral de Stock Bajo</label>
                  <input
                    type="number"
                    className="form-input"
                    value={lowStockThreshold}
                    onChange={(e) => setLowStockThreshold(Number(e.target.value))}
                    min="1"
                  />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Los productos con stock por debajo de este número se considerarán bajos en stock.
                  </span>
                </div>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '0 0 24px 0' }} />

              {/* Categories Management */}
              <div className="settings-section">
                <h3 style={{ marginBottom: '12px', fontSize: '1.1rem', color: 'var(--text)' }}>Categorías Personalizadas</h3>

                <form onSubmit={handleAddCategory} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                  <input
                    type="text"
                    className="form-input"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder="Nueva categoría..."
                    style={{ flex: 1 }}
                  />
                  <button type="submit" className="btn-primary" disabled={!newCatName.trim()}>
                    Agregar
                  </button>
                </form>

                <div className="categories-list" style={{
                  maxHeight: '200px', overflowY: 'auto',
                  border: '1px solid var(--border)', borderRadius: 'var(--radius-md)'
                }}>
                  {categories.length === 0 ? (
                    <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                      No hay categorías personalizadas.
                    </div>
                  ) : (
                    categories.map(cat => (
                      <div key={cat.idCat} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '12px 16px', borderBottom: '1px solid var(--border)'
                      }}>
                        <span>{cat.nombre}</span>
                        <button
                          onClick={() => handleDeleteCategory(cat.idCat)}
                          style={{
                            background: 'transparent', border: 'none', color: 'var(--error)',
                            cursor: 'pointer', padding: '4px'
                          }}
                          title="Eliminar categoría"
                        >
                          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}

          {/* ── Themes Tab ── */}
          {activeTab === 'themes' && (
            <ThemeCustomizer />
          )}
        </div>

      </div>
    </div>
  );
};

export default SettingsModal;
