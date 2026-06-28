import { useState, useCallback } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useToast } from '../../hooks/useToast';
import {
  PREDEFINED_THEMES,
  CUSTOMIZABLE_VARS,
  exportThemeAsCSS,
  importThemeFromCSS,
} from '../../context/ThemeContext';

/* ── HELPERS ── */
function getComputedVar(varName) {
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
}

function toHex(color) {
  if (!color) return '#888888';
  if (color.startsWith('#')) {
    if (color.length === 4) return '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3];
    return color.slice(0, 7);
  }
  const m = color.match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (m) {
    const hex = (n) => parseInt(n).toString(16).padStart(2, '0');
    return `#${hex(m[1])}${hex(m[2])}${hex(m[3])}`;
  }
  return '#888888';
}

function groupVars() {
  const groups = {};
  CUSTOMIZABLE_VARS.forEach(v => {
    if (!groups[v.group]) groups[v.group] = [];
    groups[v.group].push(v);
  });
  return groups;
}

/* ── MINI PREVIEW TOOLTIP ── */
const ThemePreviewTooltip = ({ theme, position }) => {
  const c = theme.colors;
  const bg = c['--bg-primary'] || (theme.base === 'dark' ? '#0f172a' : '#f0f4f8');
  const bgSec = c['--bg-secondary'] || (theme.base === 'dark' ? '#1e293b' : '#ffffff');
  const sidebarBg = c['--sidebar-bg'] || (theme.base === 'dark' ? '#0f172a' : '#1e293b');
  const sidebarText = c['--sidebar-text'] || '#94a3b8';
  const sidebarAccent = c['--sidebar-accent'] || '#818cf8';
  const accent = c['--accent'] || '#6366f1';
  const textPrimary = c['--text-primary'] || (theme.base === 'dark' ? '#f1f5f9' : '#1e293b');
  const textSecondary = c['--text-secondary'] || '#64748b';
  const border = c['--border-color'] || (theme.base === 'dark' ? '#334155' : '#e2e8f0');
  const success = c['--success'] || '#10b981';
  const danger = c['--danger'] || '#ef4444';
  const warning = c['--warning'] || '#f59e0b';

  return (
    <div className="theme-preview-tooltip" style={{ top: position.top, left: position.left }}>
      <div className="theme-preview-header" style={{ background: bgSec, color: textPrimary, borderColor: border }}>
        <span>{theme.emoji}</span>
        <span>{theme.name}</span>
        <span style={{ fontSize: '0.65rem', color: textSecondary, marginLeft: 'auto' }}>
          {theme.base === 'dark' ? '🌙 Oscuro' : '☀️ Claro'}
        </span>
      </div>
      <div className="theme-preview-mini" style={{ background: bg }}>
        <div className="theme-preview-sidebar-mock" style={{ background: sidebarBg }}>
          <div className="mock-dot active" style={{ background: sidebarAccent, width: '70%' }} />
          <div className="mock-dot" style={{ background: sidebarText, width: '85%' }} />
          <div className="mock-dot" style={{ background: sidebarText, width: '60%' }} />
          <div className="mock-dot" style={{ background: sidebarText, width: '75%' }} />
        </div>
        <div className="theme-preview-main-mock" style={{ background: bg }}>
          <div className="mock-card" style={{ background: bgSec, border: `1px solid ${border}` }}>
            <div className="mock-line" style={{ background: textPrimary, opacity: 0.8, maxWidth: '50%' }} />
            <div className="mock-badge" style={{ background: accent }} />
          </div>
          <div className="mock-card" style={{ background: bgSec, border: `1px solid ${border}` }}>
            <div className="mock-line" style={{ background: textSecondary, opacity: 0.5, maxWidth: '65%' }} />
            <div className="mock-badge" style={{ background: success }} />
          </div>
          <div className="mock-card" style={{ background: bgSec, border: `1px solid ${border}` }}>
            <div className="mock-line" style={{ background: textSecondary, opacity: 0.5, maxWidth: '40%' }} />
            <div className="mock-badge" style={{ background: warning }} />
          </div>
        </div>
      </div>
      <div className="theme-preview-swatches">
        <div style={{ background: sidebarBg }} />
        <div style={{ background: bg }} />
        <div style={{ background: accent }} />
        <div style={{ background: success }} />
        <div style={{ background: danger }} />
        <div style={{ background: warning }} />
        <div style={{ background: textPrimary }} />
      </div>
    </div>
  );
};

/* ── THEME CARD ── */
const ThemeCard = ({ theme, isActive, onSelect, onHover, onLeave }) => {
  const c = theme.colors;
  const sidebar = c['--sidebar-bg'] || (theme.base === 'dark' ? '#0f172a' : '#1e293b');
  const bg = c['--bg-primary'] || (theme.base === 'dark' ? '#0f172a' : '#f0f4f8');
  const accent = c['--accent'] || '#6366f1';
  const text = c['--text-primary'] || (theme.base === 'dark' ? '#f1f5f9' : '#1e293b');
  const border = c['--border-color'] || '#e2e8f0';

  return (
    <div
      className={`theme-card ${isActive ? 'active' : ''}`}
      onClick={() => onSelect(theme.id)}
      onMouseEnter={(e) => onHover(theme, e)}
      onMouseLeave={onLeave}
    >
      <div className="theme-card-preview">
        <div className="theme-card-preview-swatch" style={{ background: sidebar }} />
        <div className="theme-card-preview-swatch" style={{ background: bg }} />
        <div className="theme-card-preview-swatch" style={{ background: accent }} />
        <div className="theme-card-preview-swatch" style={{ background: text }} />
        <div className="theme-card-preview-swatch" style={{ background: border }} />
      </div>
      <span className="theme-card-emoji">{theme.emoji}</span>
      <span className="theme-card-name">{theme.name}</span>
    </div>
  );
};

/* ── MAIN COMPONENT ── */
const ThemeCustomizer = () => {
  const {
    activeThemeId,
    selectTheme,
    customThemes,
    saveCustomTheme,
    deleteCustomTheme,
  } = useTheme();
  const { showToast } = useToast();
  const [tooltip, setTooltip] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingTheme, setEditingTheme] = useState(null);

  const [bgImageUrlInput, setBgImageUrlInput] = useState('');

  const initCustomTheme = useCallback(() => {
    const colors = {};
    CUSTOMIZABLE_VARS.forEach(v => {
      colors[v.key] = toHex(getComputedVar(v.key));
    });
    return {
      id: `custom-${Date.now()}`,
      name: 'Mi Tema',
      emoji: '🎨',
      base: 'light',
      colors,
      bgImage: '',
      bgBlur: 0,
      bgGradient: { enabled: false, color1: '#6366f1', color2: '#a855f7', angle: 135 },
      isCustom: true,
    };
  }, []);

  const handleCardHover = useCallback((theme, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const tooltipWidth = 260;
    let left = rect.right + 12;
    if (left + tooltipWidth > window.innerWidth - 16) left = rect.left - tooltipWidth - 12;
    if (left < 16) left = Math.max(16, rect.left + rect.width / 2 - tooltipWidth / 2);
    let top = rect.top;
    if (top + 150 > window.innerHeight) top = window.innerHeight - 160;
    setTooltip({ theme, position: { top, left } });
  }, []);

  const handleCardLeave = useCallback(() => setTooltip(null), []);

  const openNewEditor = () => {
    setEditingTheme(initCustomTheme());
    setBgImageUrlInput('');
    setEditorOpen(true);
  };

  const openEditExisting = (theme) => {
    const colors = { ...theme.colors };
    CUSTOMIZABLE_VARS.forEach(v => {
      if (!colors[v.key]) colors[v.key] = toHex(getComputedVar(v.key));
    });
    setEditingTheme({
      ...theme,
      colors,
      bgImage: theme.bgImage || '',
      bgBlur: theme.bgBlur || 0,
      bgGradient: theme.bgGradient || { enabled: false, color1: '#6366f1', color2: '#a855f7', angle: 135 }
    });
    setBgImageUrlInput(theme.bgImage || '');
    setEditorOpen(true);
  };

  const handleEditorColorChange = (key, value) => {
    setEditingTheme(prev => ({ ...prev, colors: { ...prev.colors, [key]: value } }));
  };

  const handleSaveCustom = () => {
    if (!editingTheme.name.trim()) {
      showToast('Ingresá un nombre para el tema', 'error');
      return;
    }
    saveCustomTheme(editingTheme);
    showToast(`Tema "${editingTheme.name}" guardado`, 'success');
    setEditorOpen(false);
    setEditingTheme(null);
  };

  const handleExport = (theme) => {
    const css = exportThemeAsCSS(theme);
    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tema-${theme.id}.css`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Tema exportado como CSS', 'success');
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith('.css')) {
      showToast('Solo se permiten archivos .css', 'error');
      e.target.value = '';
      return;
    }
    if (file.size > 50 * 1024) {
      showToast('El archivo es demasiado grande (máx 50KB)', 'error');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const text = evt.target.result;
        if (/<script|javascript:|expression\s*\(|url\s*\(/i.test(text)) {
          showToast('El archivo contiene código no permitido', 'error');
          return;
        }
        const imported = importThemeFromCSS(text);
        imported.id = `imported-${Date.now()}`;
        saveCustomTheme(imported);
        showToast(`Tema "${imported.name}" importado correctamente`, 'success');
      } catch (err) {
        showToast(err.message || 'Error al importar el tema', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const isValidImageUrl = (url) => {
    if (!url) return false;
    return /\.(png|gif|webp|apng|jpeg|jpg)($|\?)/i.test(url.trim());
  };

  const handleAddImageUrl = () => {
    if (!bgImageUrlInput.trim()) {
      setEditingTheme(prev => ({ ...prev, bgImage: '' }));
      showToast('Imagen eliminada', 'success');
      return;
    }

    if (!isValidImageUrl(bgImageUrlInput)) {
      showToast('El link debe ser .png, .gif, .webp, .apng, o .jpeg', 'error');
      return;
    }

    setEditingTheme(prev => ({
      ...prev,
      bgImage: bgImageUrlInput.trim(),
      bgGradient: { ...prev.bgGradient, enabled: false }
    }));
    showToast('Imagen aplicada', 'success');
  };

  const handleGradientToggle = (enabled) => {
    setEditingTheme(prev => ({
      ...prev,
      bgGradient: { ...prev.bgGradient, enabled },
      bgImage: enabled ? '' : prev.bgImage
    }));
    if (enabled) {
      setBgImageUrlInput('');
    }
  };

  const groups = groupVars();

  return (
    <div className="theme-customizer">
      {/* ── Predefined Themes ── */}
      <h3 className="tc-heading">🎨 Temas predefinidos</h3>
      <div className="theme-grid">
        {PREDEFINED_THEMES.map(t => (
          <ThemeCard key={t.id} theme={t} isActive={activeThemeId === t.id}
            onSelect={selectTheme} onHover={handleCardHover} onLeave={handleCardLeave} />
        ))}
      </div>

      <hr className="settings-divider" />

      {/* ── Custom Themes ── */}
      <h3 className="tc-heading">✨ Temas personalizados</h3>

      {customThemes.length > 0 ? (
        <div className="custom-themes-list">
          {customThemes.map(t => (
            <div key={t.id} className="custom-theme-item">
              <div className="custom-theme-item-info" onClick={() => selectTheme(t.id)}
                onMouseEnter={(e) => handleCardHover(t, e)} onMouseLeave={handleCardLeave}>
                <span>{t.emoji}</span>
                <span className="custom-theme-item-name">{t.name}{activeThemeId === t.id && ' ✓'}</span>
              </div>
              <div className="custom-theme-item-actions">
                <button onClick={() => openEditExisting(t)} title="Editar">
                  <svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                </button>
                <button onClick={() => handleExport(t)} title="Exportar CSS">
                  <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                </button>
                <button className="delete" onClick={() => { deleteCustomTheme(t.id); showToast('Tema eliminado', 'success'); }} title="Eliminar">
                  <svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="theme-empty-state">No hay temas personalizados aún. ¡Creá uno!</div>
      )}

      {/* ── Actions Bar for Custom Themes ── */}
      <div className="theme-actions-bar" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button className="btn-sm btn-accent" onClick={openNewEditor}>
          <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          Crear tema
        </button>
        <button className="btn-sm btn-outline" onClick={() => document.getElementById('theme-file-input')?.click()}>
          <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
          Importar CSS
        </button>
        <input id="theme-file-input" type="file" accept=".css" style={{ display: 'none' }} onChange={handleImport} />
      </div>

      {/* ── Custom Theme Editor ── */}
      {editorOpen && editingTheme && (
        <>
          <hr className="settings-divider" />
          <div className="custom-editor-section">
            <div className="custom-editor-title">
              🖌️ {editingTheme.isCustom && customThemes.some(t => t.id === editingTheme.id) ? 'Editar' : 'Crear'} tema
            </div>

            <div className="custom-editor-name">
              <input type="text" className="form-input" value={editingTheme.name}
                onChange={(e) => setEditingTheme(prev => ({ ...prev, name: e.target.value }))} placeholder="Nombre del tema..." />
              <select className="form-input" value={editingTheme.base}
                onChange={(e) => setEditingTheme(prev => ({ ...prev, base: e.target.value }))}>
                <option value="light">☀️ Claro</option>
                <option value="dark">🌙 Oscuro</option>
              </select>
            </div>

            {/* ── Background Image via URL ── */}
            <div className="bg-section" style={{ marginTop: '16px', marginBottom: '16px', padding: '12px', background: 'var(--bg-hover)', borderRadius: 'var(--radius-md)' }}>
              <h4 className="bg-section-title" style={{ fontSize: '0.9rem', marginBottom: '8px' }}>
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2" style={{ marginRight: '6px' }}>
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                Fondo con Imagen (URL)
              </h4>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <input
                  type="text"
                  className="form-input"
                  value={bgImageUrlInput}
                  onChange={(e) => setBgImageUrlInput(e.target.value)}
                  placeholder="https://ejemplo.com/imagen.png"
                  style={{ flex: 1 }}
                />
                <button className="btn-sm btn-outline" onClick={handleAddImageUrl}>Aplicar</button>
              </div>

              {editingTheme.bgImage && (
                <div className="bg-blur-control">
                  <label className="bg-blur-label">
                    Desenfoque (blur)
                    <span className="bg-blur-value">{editingTheme.bgBlur}%</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={editingTheme.bgBlur}
                    onChange={(e) => setEditingTheme(prev => ({ ...prev, bgBlur: Number(e.target.value) }))}
                    className="bg-blur-slider"
                  />
                </div>
              )}

              {/* ── Gradient ── */}
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                <div className="bg-gradient-toggle" style={{ marginBottom: '12px' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center' }}>
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2" style={{ marginRight: '6px' }}>
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2a10 10 0 0 1 0 20" fill="currentColor" opacity="0.3" />
                    </svg>
                    Fondo con Gradiente
                  </span>
                  <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '36px', height: '20px', flexShrink: 0 }}>
                    <input
                      type="checkbox"
                      checked={editingTheme.bgGradient.enabled}
                      onChange={(e) => handleGradientToggle(e.target.checked)}
                      style={{ opacity: 0, width: 0, height: 0 }}
                    />
                    <span className="slider" style={{
                      position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
                      backgroundColor: editingTheme.bgGradient.enabled ? 'var(--accent)' : 'var(--border-color)',
                      transition: '.4s', borderRadius: '34px'
                    }}>
                      <span style={{
                        position: 'absolute', height: '14px', width: '14px',
                        left: editingTheme.bgGradient.enabled ? '18px' : '3px', bottom: '3px',
                        backgroundColor: 'white', transition: '.4s', borderRadius: '50%'
                      }} />
                    </span>
                  </label>
                </div>

                {editingTheme.bgGradient.enabled && (
                  <div className="bg-gradient-editor">
                    <div className="bg-gradient-preview" style={{
                      background: `linear-gradient(${editingTheme.bgGradient.angle}deg, ${editingTheme.bgGradient.color1}, ${editingTheme.bgGradient.color2})`,
                      height: '36px'
                    }} />

                    <div className="bg-gradient-colors" style={{ display: 'flex', gap: '12px' }}>
                      <div className="bg-gradient-color-pick" style={{ flex: 1 }}>
                        <label>Color 1</label>
                        <div className="color-row-input-wrap">
                          <input
                            type="color"
                            className="color-row-picker"
                            value={editingTheme.bgGradient.color1}
                            onChange={(e) => setEditingTheme(prev => ({ ...prev, bgGradient: { ...prev.bgGradient, color1: e.target.value } }))}
                          />
                        </div>
                      </div>
                      <div className="bg-gradient-color-pick" style={{ flex: 1 }}>
                        <label>Color 2</label>
                        <div className="color-row-input-wrap">
                          <input
                            type="color"
                            className="color-row-picker"
                            value={editingTheme.bgGradient.color2}
                            onChange={(e) => setEditingTheme(prev => ({ ...prev, bgGradient: { ...prev.bgGradient, color2: e.target.value } }))}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-angle" style={{ marginTop: '8px' }}>
                      <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                        Ángulo <span style={{ fontWeight: 'bold' }}>{editingTheme.bgGradient.angle}°</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        value={editingTheme.bgGradient.angle}
                        onChange={(e) => setEditingTheme(prev => ({ ...prev, bgGradient: { ...prev.bgGradient, angle: Number(e.target.value) } }))}
                        className="bg-blur-slider"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="color-groups-container">
              {Object.entries(groups).map(([groupName, vars]) => (
                <div key={groupName} className="color-group">
                  <div className="color-group-header">{groupName}</div>
                  {vars.map(v => (
                    <div key={v.key} className="color-row">
                      <span className="color-row-label">{v.label}</span>
                      <div className="color-row-input-wrap">
                        <input type="color" className="color-row-picker"
                          value={toHex(editingTheme.colors[v.key] || '#888888')}
                          onChange={(e) => handleEditorColorChange(v.key, e.target.value)} />
                        <input type="text" className="form-input color-row-hex"
                          value={editingTheme.colors[v.key] || ''}
                          onChange={(e) => handleEditorColorChange(v.key, e.target.value)} placeholder="#hex" />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Action buttons with flex styling to prevent overlap */}
            <div className="theme-actions-bar" style={{ marginTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button className="btn-sm btn-accent" onClick={handleSaveCustom}>
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
                Guardar tema
              </button>
              <button className="btn-sm btn-outline" onClick={() => handleExport(editingTheme)}>
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                Exportar CSS
              </button>
              <button className="btn-sm btn-outline" onClick={() => { setEditorOpen(false); setEditingTheme(null); }}>
                Cancelar
              </button>
            </div>
          </div>
        </>
      )}

      {/* ── Hover Tooltip ── */}
      {tooltip && <ThemePreviewTooltip theme={tooltip.theme} position={tooltip.position} />}
    </div>
  );
};

export default ThemeCustomizer;
