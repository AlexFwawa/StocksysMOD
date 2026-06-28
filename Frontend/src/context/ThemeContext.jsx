import { createContext, useState, useEffect, useCallback, useContext } from 'react';

/* ──────────────────────────────────────────────
   PREDEFINED COLOR THEMES
   Each theme overrides the CSS custom properties.
   ────────────────────────────────────────────── */
export const PREDEFINED_THEMES = [
  {
    id: 'default-light',
    name: 'Clásico Claro',
    emoji: '☀️',
    base: 'light',
    colors: {}, // uses default variables.css values
  },
  {
    id: 'default-dark',
    name: 'Clásico Oscuro',
    emoji: '🌙',
    base: 'dark',
    colors: {},
  },
  {
    id: 'pastel',
    name: 'Pastel',
    emoji: '🌸',
    base: 'light',
    colors: {
      '--bg-primary': '#fff0f5',
      '--bg-secondary': '#ffffff',
      '--bg-tertiary': '#fff5f8',
      '--bg-hover': '#ffe4ed',
      '--sidebar-bg': '#f8c8d8',
      '--sidebar-text': '#8b5e6b',
      '--sidebar-text-active': '#4a2030',
      '--sidebar-item-hover': 'rgba(255, 255, 255, 0.5)',
      '--sidebar-item-active': 'rgba(219, 112, 147, 0.25)',
      '--sidebar-accent': '#db7093',
      '--sidebar-divider': 'rgba(139, 94, 107, 0.15)',
      '--text-primary': '#4a2030',
      '--text-secondary': '#8b5e6b',
      '--text-muted': '#c4949f',
      '--accent': '#db7093',
      '--accent-hover': '#c4607f',
      '--accent-light': 'rgba(219, 112, 147, 0.12)',
      '--accent-border': 'rgba(219, 112, 147, 0.3)',
      '--border-color': '#f5d0dc',
      '--border-light': '#ffe4ed',
      '--table-header-bg': '#ffe4ed',
      '--table-row-hover': '#fff0f5',
      '--input-bg': '#ffffff',
      '--input-border': '#f5d0dc',
      '--input-focus-border': '#db7093',
      '--input-focus-ring': 'rgba(219, 112, 147, 0.2)',
    },
  },
  {
    id: 'mint',
    name: 'Mint',
    emoji: '🍃',
    base: 'light',
    colors: {
      '--bg-primary': '#f0faf5',
      '--bg-secondary': '#ffffff',
      '--bg-tertiary': '#f5fcf8',
      '--bg-hover': '#e0f5eb',
      '--sidebar-bg': '#a8e6cf',
      '--sidebar-text': '#2d6a4f',
      '--sidebar-text-active': '#1b4332',
      '--sidebar-item-hover': 'rgba(255, 255, 255, 0.45)',
      '--sidebar-item-active': 'rgba(45, 106, 79, 0.18)',
      '--sidebar-accent': '#40916c',
      '--sidebar-divider': 'rgba(45, 106, 79, 0.12)',
      '--text-primary': '#1b4332',
      '--text-secondary': '#52796f',
      '--text-muted': '#95b8a8',
      '--accent': '#40916c',
      '--accent-hover': '#2d6a4f',
      '--accent-light': 'rgba(64, 145, 108, 0.1)',
      '--accent-border': 'rgba(64, 145, 108, 0.3)',
      '--border-color': '#c8e6d7',
      '--border-light': '#e0f5eb',
      '--table-header-bg': '#e0f5eb',
      '--table-row-hover': '#f0faf5',
      '--input-bg': '#ffffff',
      '--input-border': '#c8e6d7',
      '--input-focus-border': '#40916c',
      '--input-focus-ring': 'rgba(64, 145, 108, 0.2)',
    },
  },
  {
    id: 'vice',
    name: 'Vice',
    emoji: '🌆',
    base: 'dark',
    colors: {
      '--bg-primary': '#0d0221',
      '--bg-secondary': '#1a0a3e',
      '--bg-tertiary': '#150830',
      '--bg-hover': '#2a1254',
      '--sidebar-bg': '#0d0221',
      '--sidebar-text': '#a78bfa',
      '--sidebar-text-active': '#e0aaff',
      '--sidebar-item-hover': 'rgba(167, 139, 250, 0.1)',
      '--sidebar-item-active': 'rgba(0, 220, 255, 0.15)',
      '--sidebar-accent': '#00dcff',
      '--sidebar-divider': 'rgba(167, 139, 250, 0.12)',
      '--text-primary': '#e0e0ff',
      '--text-secondary': '#a78bfa',
      '--text-muted': '#6c5ce7',
      '--accent': '#00dcff',
      '--accent-hover': '#ff6eb4',
      '--accent-light': 'rgba(0, 220, 255, 0.12)',
      '--accent-border': 'rgba(0, 220, 255, 0.3)',
      '--border-color': '#2a1254',
      '--border-light': '#1a0a3e',
      '--table-header-bg': '#1a0a3e',
      '--table-row-hover': '#2a1254',
      '--input-bg': '#1a0a3e',
      '--input-border': '#2a1254',
      '--input-focus-border': '#00dcff',
      '--input-focus-ring': 'rgba(0, 220, 255, 0.25)',
      '--success': '#00e5a0',
      '--danger': '#ff6eb4',
      '--warning': '#ffd166',
    },
  },
  {
    id: 'sunset',
    name: 'Atardecer',
    emoji: '🌅',
    base: 'light',
    colors: {
      '--bg-primary': '#fff8f0',
      '--bg-secondary': '#ffffff',
      '--bg-tertiary': '#fffaf5',
      '--bg-hover': '#ffedd5',
      '--sidebar-bg': '#f97316',
      '--sidebar-text': 'rgba(255,255,255,0.85)',
      '--sidebar-text-active': '#ffffff',
      '--sidebar-item-hover': 'rgba(255, 255, 255, 0.15)',
      '--sidebar-item-active': 'rgba(255, 255, 255, 0.2)',
      '--sidebar-accent': '#fbbf24',
      '--sidebar-divider': 'rgba(255, 255, 255, 0.15)',
      '--text-primary': '#431407',
      '--text-secondary': '#9a3412',
      '--text-muted': '#c2783a',
      '--accent': '#ea580c',
      '--accent-hover': '#c2410c',
      '--accent-light': 'rgba(234, 88, 12, 0.1)',
      '--accent-border': 'rgba(234, 88, 12, 0.3)',
      '--border-color': '#fed7aa',
      '--border-light': '#ffedd5',
      '--table-header-bg': '#ffedd5',
      '--table-row-hover': '#fff8f0',
      '--input-bg': '#ffffff',
      '--input-border': '#fed7aa',
      '--input-focus-border': '#ea580c',
      '--input-focus-ring': 'rgba(234, 88, 12, 0.2)',
    },
  },
  {
    id: 'ocean',
    name: 'Océano',
    emoji: '🌊',
    base: 'dark',
    colors: {
      '--bg-primary': '#0a192f',
      '--bg-secondary': '#112240',
      '--bg-tertiary': '#0e1d35',
      '--bg-hover': '#1d3461',
      '--sidebar-bg': '#0a192f',
      '--sidebar-text': '#8892b0',
      '--sidebar-text-active': '#ccd6f6',
      '--sidebar-item-hover': 'rgba(100, 255, 218, 0.06)',
      '--sidebar-item-active': 'rgba(100, 255, 218, 0.12)',
      '--sidebar-accent': '#64ffda',
      '--sidebar-divider': 'rgba(136, 146, 176, 0.12)',
      '--text-primary': '#ccd6f6',
      '--text-secondary': '#8892b0',
      '--text-muted': '#495670',
      '--accent': '#64ffda',
      '--accent-hover': '#4ad8b7',
      '--accent-light': 'rgba(100, 255, 218, 0.1)',
      '--accent-border': 'rgba(100, 255, 218, 0.3)',
      '--border-color': '#1d3461',
      '--border-light': '#112240',
      '--table-header-bg': '#112240',
      '--table-row-hover': '#1d3461',
      '--input-bg': '#112240',
      '--input-border': '#1d3461',
      '--input-focus-border': '#64ffda',
      '--input-focus-ring': 'rgba(100, 255, 218, 0.2)',
    },
  },
  {
    id: 'lavender',
    name: 'Lavanda',
    emoji: '💜',
    base: 'light',
    colors: {
      '--bg-primary': '#f5f0ff',
      '--bg-secondary': '#ffffff',
      '--bg-tertiary': '#f8f5ff',
      '--bg-hover': '#ede5ff',
      '--sidebar-bg': '#c4b5fd',
      '--sidebar-text': '#4c1d95',
      '--sidebar-text-active': '#2e1065',
      '--sidebar-item-hover': 'rgba(255, 255, 255, 0.45)',
      '--sidebar-item-active': 'rgba(76, 29, 149, 0.15)',
      '--sidebar-accent': '#7c3aed',
      '--sidebar-divider': 'rgba(76, 29, 149, 0.1)',
      '--text-primary': '#2e1065',
      '--text-secondary': '#6d28d9',
      '--text-muted': '#a78bfa',
      '--accent': '#7c3aed',
      '--accent-hover': '#6d28d9',
      '--accent-light': 'rgba(124, 58, 237, 0.1)',
      '--accent-border': 'rgba(124, 58, 237, 0.3)',
      '--border-color': '#ddd6fe',
      '--border-light': '#ede5ff',
      '--table-header-bg': '#ede5ff',
      '--table-row-hover': '#f5f0ff',
      '--input-bg': '#ffffff',
      '--input-border': '#ddd6fe',
      '--input-focus-border': '#7c3aed',
      '--input-focus-ring': 'rgba(124, 58, 237, 0.2)',
    },
  },
  {
    id: 'monokai',
    name: 'Monokai',
    emoji: '🖥️',
    base: 'dark',
    colors: {
      '--bg-primary': '#272822',
      '--bg-secondary': '#2d2e27',
      '--bg-tertiary': '#2a2b25',
      '--bg-hover': '#3e3d32',
      '--sidebar-bg': '#1e1f1c',
      '--sidebar-text': '#a6a68a',
      '--sidebar-text-active': '#f8f8f2',
      '--sidebar-item-hover': 'rgba(248, 248, 242, 0.06)',
      '--sidebar-item-active': 'rgba(166, 226, 46, 0.12)',
      '--sidebar-accent': '#a6e22e',
      '--sidebar-divider': 'rgba(248, 248, 242, 0.06)',
      '--text-primary': '#f8f8f2',
      '--text-secondary': '#a6a68a',
      '--text-muted': '#75715e',
      '--accent': '#a6e22e',
      '--accent-hover': '#b8f340',
      '--accent-light': 'rgba(166, 226, 46, 0.1)',
      '--accent-border': 'rgba(166, 226, 46, 0.3)',
      '--border-color': '#3e3d32',
      '--border-light': '#2d2e27',
      '--table-header-bg': '#2d2e27',
      '--table-row-hover': '#3e3d32',
      '--input-bg': '#2d2e27',
      '--input-border': '#3e3d32',
      '--input-focus-border': '#a6e22e',
      '--input-focus-ring': 'rgba(166, 226, 46, 0.2)',
      '--success': '#a6e22e',
      '--danger': '#f92672',
      '--warning': '#e6db74',
    },
  },
];

/* ──────────────────────────────────────────────
   CSS VARIABLE KEYS that can be customised
   ────────────────────────────────────────────── */
export const CUSTOMIZABLE_VARS = [
  { key: '--bg-primary', label: 'Fondo principal', group: 'Fondos' },
  { key: '--bg-secondary', label: 'Fondo secundario', group: 'Fondos' },
  { key: '--bg-tertiary', label: 'Fondo terciario', group: 'Fondos' },
  { key: '--bg-hover', label: 'Fondo hover', group: 'Fondos' },
  { key: '--sidebar-bg', label: 'Fondo sidebar', group: 'Sidebar' },
  { key: '--sidebar-text', label: 'Texto sidebar', group: 'Sidebar' },
  { key: '--sidebar-text-active', label: 'Texto activo sidebar', group: 'Sidebar' },
  { key: '--sidebar-accent', label: 'Acento sidebar', group: 'Sidebar' },
  { key: '--text-primary', label: 'Texto principal', group: 'Texto' },
  { key: '--text-secondary', label: 'Texto secundario', group: 'Texto' },
  { key: '--text-muted', label: 'Texto atenuado', group: 'Texto' },
  { key: '--accent', label: 'Color acento', group: 'Acentos' },
  { key: '--accent-hover', label: 'Acento hover', group: 'Acentos' },
  { key: '--success', label: 'Éxito', group: 'Estado' },
  { key: '--danger', label: 'Peligro', group: 'Estado' },
  { key: '--warning', label: 'Advertencia', group: 'Estado' },
  { key: '--border-color', label: 'Bordes', group: 'Bordes' },
  { key: '--border-light', label: 'Bordes claros', group: 'Bordes' },
  { key: '--table-header-bg', label: 'Cabecera tabla', group: 'Tabla' },
  { key: '--table-row-hover', label: 'Fila hover tabla', group: 'Tabla' },
  { key: '--input-bg', label: 'Fondo input', group: 'Inputs' },
  { key: '--input-border', label: 'Borde input', group: 'Inputs' },
  { key: '--input-focus-border', label: 'Borde input focus', group: 'Inputs' },
];

/* ──────────────────────────────────────────────
   SECURITY: sanitise imported CSS
   Only allow safe CSS custom property declarations.
   ────────────────────────────────────────────── */
const ALLOWED_PROP_PATTERN = /^--[\w-]+$/;
const ALLOWED_VALUE_PATTERN = /^[#\w\s(),.\-/%]+$/;

function sanitizeColorValue(value) {
  const trimmed = (value || '').trim();
  // Block anything that looks like url(), expression(), @import, javascript:, etc.
  if (/url\s*\(|expression\s*\(|@import|javascript:|<|>/i.test(trimmed)) return null;
  if (!ALLOWED_VALUE_PATTERN.test(trimmed)) return null;
  return trimmed;
}

function sanitizeThemeColors(colors) {
  const safe = {};
  for (const [key, value] of Object.entries(colors)) {
    if (!ALLOWED_PROP_PATTERN.test(key)) continue;
    const safeVal = sanitizeColorValue(value);
    if (safeVal) safe[key] = safeVal;
  }
  return safe;
}

/* ──────────────────────────────────────────────
   EXPORT / IMPORT helpers
   ────────────────────────────────────────────── */
export function exportThemeAsCSS(theme) {
  const lines = [
    `/* StockSys Theme: ${theme.name} */`,
    `/* base: ${theme.base} */`,
    `/* id: ${theme.id} */`,
  ];
  if (theme.bgImage) lines.push(`/* bgImage: ${theme.bgImage} */`);
  if (theme.bgBlur !== undefined) lines.push(`/* bgBlur: ${theme.bgBlur} */`);
  if (theme.bgGradient) lines.push(`/* bgGradient: ${JSON.stringify(theme.bgGradient)} */`);
  
  lines.push(':root {');
  for (const [prop, val] of Object.entries(theme.colors)) {
    lines.push(`  ${prop}: ${val};`);
  }
  lines.push('}');
  return lines.join('\n');
}

export function importThemeFromCSS(cssText) {
  // Only extract CSS custom properties inside :root { ... }
  // Strip any comments first
  const stripped = cssText.replace(/\/\*[\s\S]*?\*\//g, '');

  // Extract metadata from comments in original text
  const nameMatch = cssText.match(/Theme:\s*(.+?)\s*\*\//);
  const baseMatch = cssText.match(/base:\s*(.+?)\s*\*\//);
  const idMatch = cssText.match(/id:\s*(.+?)\s*\*\//);
  const bgImageMatch = cssText.match(/bgImage:\s*(.+?)\s*\*\//);
  const bgBlurMatch = cssText.match(/bgBlur:\s*(.+?)\s*\*\//);
  const bgGradientMatch = cssText.match(/bgGradient:\s*(.+?)\s*\*\//);

  let bgGradient = { enabled: false, color1: '#6366f1', color2: '#a855f7', angle: 135 };
  if (bgGradientMatch) {
    try {
      bgGradient = JSON.parse(bgGradientMatch[1].trim());
    } catch (e) { /* ignore */ }
  }

  // Extract properties
  const rootMatch = stripped.match(/:root\s*\{([^}]*)\}/);
  if (!rootMatch) throw new Error('No se encontró un bloque :root válido en el archivo CSS.');

  const body = rootMatch[1];
  const colors = {};
  const propRegex = /(--[\w-]+)\s*:\s*([^;]+);/g;
  let match;
  while ((match = propRegex.exec(body)) !== null) {
    const key = match[1].trim();
    const val = match[2].trim();
    if (ALLOWED_PROP_PATTERN.test(key)) {
      const safeVal = sanitizeColorValue(val);
      if (safeVal) colors[key] = safeVal;
    }
  }

  if (Object.keys(colors).length === 0) {
    throw new Error('No se encontraron variables CSS válidas en el archivo.');
  }

  return {
    id: idMatch ? idMatch[1].trim() : `custom-${Date.now()}`,
    name: nameMatch ? nameMatch[1].trim() : 'Tema Importado',
    emoji: '📥',
    base: baseMatch && baseMatch[1].trim() === 'dark' ? 'dark' : 'light',
    colors: sanitizeThemeColors(colors),
    bgImage: bgImageMatch ? bgImageMatch[1].trim() : '',
    bgBlur: bgBlurMatch ? Number(bgBlurMatch[1].trim()) : 0,
    bgGradient,
    isCustom: true,
  };
}

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Base mode (light/dark) — kept for backward compat
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('pfs-theme') || 'light';
  });

  // Active color theme id
  const [activeThemeId, setActiveThemeId] = useState(() => {
    return localStorage.getItem('pfs-color-theme') || 'default-light';
  });

  // Custom (user-created) themes stored in localStorage
  const [customThemes, setCustomThemes] = useState(() => {
    try {
      const stored = localStorage.getItem('pfs-custom-themes');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Sanitise on load
        return parsed.map(t => ({ ...t, colors: sanitizeThemeColors(t.colors) }));
      }
    } catch { /* ignore */ }
    return [];
  });

  // We will derive bgImage, bgBlur, bgGradient directly from the activeTheme.

  // Resolve the full theme object
  const allThemes = [...PREDEFINED_THEMES, ...customThemes];
  const activeTheme = allThemes.find(t => t.id === activeThemeId) || PREDEFINED_THEMES[0];

  // ── Apply background image / gradient to the DOM ──
  useEffect(() => {
    const bgImage = activeTheme.bgImage || '';
    const bgBlur = activeTheme.bgBlur || 0;
    const bgGradient = activeTheme.bgGradient || { enabled: false };

    // Remove any existing backdrop element
    let backdrop = document.getElementById('pfs-bg-backdrop');

    const needsBackdrop = bgImage || bgGradient.enabled;

    if (!needsBackdrop) {
      if (backdrop) backdrop.remove();
      document.body.style.backgroundColor = '';
      return;
    }

    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'pfs-bg-backdrop';
      document.body.prepend(backdrop);
    }

    // Build background style
    let bgStyle = '';
    if (bgImage) {
      bgStyle = `url(${bgImage})`;
    } else if (bgGradient.enabled) {
      bgStyle = `linear-gradient(${bgGradient.angle}deg, ${bgGradient.color1}, ${bgGradient.color2})`;
    }

    backdrop.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: -1;
      background: ${bgStyle};
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      filter: blur(${bgBlur}px);
      transform: scale(${1 + bgBlur / 200});
      pointer-events: none;
    `;

    document.body.style.backgroundColor = 'transparent';

    return () => {
      // Cleanup on unmount
    };
  }, [activeTheme.bgImage, activeTheme.bgBlur, activeTheme.bgGradient]);

  // Apply theme colours as CSS vars on <html>
  const applyThemeColors = useCallback((themeObj) => {
    const root = document.documentElement;

    // First set the base data-theme for dark/light defaults
    root.setAttribute('data-theme', themeObj.base);

    // Then override with theme-specific colors
    for (const [prop, val] of Object.entries(themeObj.colors)) {
      root.style.setProperty(prop, val);
    }
  }, []);

  // Clear all inline custom properties (to reset to default)
  const clearCustomProperties = useCallback(() => {
    const root = document.documentElement;
    // Remove all known customisable vars
    CUSTOMIZABLE_VARS.forEach(v => root.style.removeProperty(v.key));
    // Also clear extras that a theme might set
    const extras = ['--success', '--danger', '--warning', '--success-bg', '--danger-bg',
      '--warning-bg', '--sidebar-item-hover', '--sidebar-item-active', '--sidebar-divider',
      '--accent-light', '--accent-border', '--input-focus-ring', '--input-placeholder',
      '--shadow-sm', '--shadow-md', '--shadow-lg', '--shadow-xl', '--overlay-bg',
      '--table-stripe', '--text-inverse'];
    extras.forEach(p => root.style.removeProperty(p));
  }, []);

  // Apply whenever activeThemeId or customThemes change
  useEffect(() => {
    clearCustomProperties();
    const t = [...PREDEFINED_THEMES, ...customThemes].find(x => x.id === activeThemeId) || PREDEFINED_THEMES[0];
    setTheme(t.base);
    applyThemeColors(t);
    localStorage.setItem('pfs-theme', t.base);
    localStorage.setItem('pfs-color-theme', activeThemeId);
  }, [activeThemeId, customThemes, applyThemeColors, clearCustomProperties]);

  // Persist custom themes
  useEffect(() => {
    localStorage.setItem('pfs-custom-themes', JSON.stringify(customThemes));
  }, [customThemes]);

  const toggleTheme = () => {
    // Simple toggle between default light/dark
    const newBase = theme === 'light' ? 'dark' : 'light';
    const defaultId = newBase === 'light' ? 'default-light' : 'default-dark';
    setActiveThemeId(defaultId);
  };

  const selectTheme = (themeId) => {
    setActiveThemeId(themeId);
  };

  const saveCustomTheme = (themeObj) => {
    const sanitized = { ...themeObj, colors: sanitizeThemeColors(themeObj.colors), isCustom: true };
    setCustomThemes(prev => {
      const idx = prev.findIndex(t => t.id === sanitized.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = sanitized;
        return copy;
      }
      return [...prev, sanitized];
    });
    setActiveThemeId(sanitized.id);
  };

  const deleteCustomTheme = (themeId) => {
    setCustomThemes(prev => prev.filter(t => t.id !== themeId));
    if (activeThemeId === themeId) {
      setActiveThemeId('default-light');
    }
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      toggleTheme,
      activeThemeId,
      activeTheme,
      allThemes,
      customThemes,
      selectTheme,
      saveCustomTheme,
      deleteCustomTheme,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

