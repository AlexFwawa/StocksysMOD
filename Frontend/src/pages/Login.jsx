import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../assets/imagenes/logo5.png';

import { loginRequest } from '../services/authService';

const Login = ({ onLogin }) => {

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {

    const { name, value } = e.target;

    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));

    if (error) setError('');
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      // 🔥 REQUEST REAL AL BACKEND
      const data = await loginRequest(
        credentials.email,
        credentials.password
      );

      // 🔥 GUARDAR JWT
      localStorage.setItem('token', data.token);

      localStorage.setItem('isAuthenticated', 'true');

      localStorage.setItem('user', credentials.email);

      // callback app
      onLogin();

      // dashboard
      navigate('/dashboard');

    } catch (err) {

      console.error(err);

      setError('Email o contraseña incorrectos');

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="login-screen">

      <div className="logo-lateral">
        <img src={logo} alt="BFP Systems Logo" />
      </div>

      <div className="login-container">

        <div className="login-header">
          <h2>Bienvenido</h2>
          <p>Sistemas de stocks BFP</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">

          {/* EMAIL */}
          <div className="input-group">

            <label htmlFor="login-email">
              Email
            </label>

            <input
              id="login-email"
              type="email"
              name="email"
              placeholder="Ingrese su email"
              value={credentials.email}
              onChange={handleChange}
              required
              autoFocus
            />
          </div>

          {/* PASSWORD */}
          <div className="input-group">

            <label htmlFor="login-password">
              Contraseña
            </label>

            <input
              id="login-password"
              type="password"
              name="password"
              placeholder="••••"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* ERROR */}
          {error && (
            <p
              style={{
                color: 'var(--danger)',
                fontSize: '0.85rem',
                textAlign: 'center'
              }}
            >
              {error}
            </p>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            className="btn-login"
            id="btn-login-submit"
            disabled={loading}
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;