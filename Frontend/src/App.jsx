import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { SettingsProvider } from './context/SettingsContext';
import ToastContainer from './components/ui/ToastContainer';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import InformesPage from "./pages/InformesPage";
import AuditoriaPage from "./pages/AuditoriaPage";

function App() {
  const [auth, setAuth] = useState(localStorage.getItem('isAuthenticated') === 'true');

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    setAuth(false);
  };

  return (
    <SettingsProvider>
      <ThemeProvider>
        <ToastProvider>
          <ToastContainer />
          <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login onLogin={() => setAuth(true)} />} />
            <Route
              path="/dashboard"
              element={
                auth
                  ? <Dashboard onLogout={logout} />
                  : <Navigate to="/login" />
              }
            />

            <Route
              path="/informes"
              element={
                auth
                  ? <InformesPage onLogout={logout} />
                  : <Navigate to="/login" />
              }
            />

            <Route
              path="/auditoria"
              element={
                auth
                  ? <AuditoriaPage onLogout={logout} />
                  : <Navigate to="/login" />
              }
            />

            <Route
              path="*"
              element={
                <Navigate
                  to={auth ? "/dashboard" : "/login"}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
    </SettingsProvider>
  );
}

export default App;