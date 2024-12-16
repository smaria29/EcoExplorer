import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styles from '../../styles/components/AuthModal.module.css';

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { signup, login, resetPassword } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      if (mode === 'signup') {
        await signup(email, password);
        onClose();
      } else if (mode === 'login') {
        await login(email, password);
        onClose();
      } else if (mode === 'reset') {
        await resetPassword(email);
        setMessage('Check your email for password reset instructions');
        setEmail('');
      }
    } catch (error) {
      setError(
        mode === 'reset'
          ? 'Failed to reset password: ' + error.message
          : 'Failed to ' + (mode === 'signup' ? 'create an account' : 'log in') + ': ' + error.message
      );
    }
  }

  const renderForm = () => {
    if (mode === 'reset') {
      return (
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Reset Password
          </button>
        </form>
      );
    }

    return (
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          {mode === 'signup' ? 'Sign Up' : 'Log In'}
        </button>
      </form>
    );
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        <h2>
          {mode === 'signup' 
            ? 'Sign Up' 
            : mode === 'reset' 
              ? 'Reset Password'
              : 'Log In'}
        </h2>
        
        {error && <div className={styles.error}>{error}</div>}
        {message && <div className={styles.success}>{message}</div>}
        
        {renderForm()}

        <div className={styles.switchMode}>
          {mode === 'reset' ? (
            <button 
              className={styles.switchButton}
              onClick={() => setMode('login')}
            >
              Back to Login
            </button>
          ) : (
            <>
              {mode === 'signup' ? (
                <p>
                  Already have an account?{' '}
                  <button 
                    className={styles.switchButton}
                    onClick={() => setMode('login')}
                  >
                    Log In
                  </button>
                </p>
              ) : (
                <>
                  <p>
                    Need an account?{' '}
                    <button 
                      className={styles.switchButton}
                      onClick={() => setMode('signup')}
                    >
                      Sign Up
                    </button>
                  </p>
                  <p>
                    Forgot your password?{' '}
                    <button 
                      className={styles.switchButton}
                      onClick={() => setMode('reset')}
                    >
                      Reset Password
                    </button>
                  </p>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}