import React, { useState } from 'react';
import styles from '../styles/components/Navbar.module.css';
import logo from '../images/logo.png';
import AuthModal from './modals/AuthModal';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const { user, logout } = useAuth();

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <>
      <div className="container">
        <nav className={styles.nav}>
          <div className={styles['nav-logo-wrapper']}>
            <img alt="Logo" className={styles['nav__logo']} src={logo} />
          </div>
          <ul className={styles['nav__list']}>
            <li className={styles['nav__item']}><a className={styles['nav__link']} href="#">Home</a></li>
            <li className={styles['nav__item']}>
              <a 
                className={styles['nav__link']} 
                href="#faq-section"
                onClick={(e) => scrollToSection(e, 'faq-section')}
              >
                FAQ
              </a>
            </li>
            <li className={styles['nav__item']}>
              <a 
                className={styles['nav__link']} 
                href="#map-section"
                onClick={(e) => scrollToSection(e, 'map-section')}
              >
                Map
              </a>
            </li>
          </ul>
          <div className={styles['nav__right']}>
            {user ? (
              <>
                <span>Hello, {user.email}</span>
                <button onClick={handleLogout} className="btn btn-white btn-smaller">
                  Log Out
                </button>
              </>
            ) : (
              <>
                <a href="#" onClick={() => handleAuthClick('login')}>Log in</a>
                <a 
                  className="btn btn-white btn-smaller" 
                  href="#"
                  onClick={() => handleAuthClick('signup')}
                >
                  Get Started
                </a>
              </>
            )}
          </div>
        </nav>
      </div>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Navbar;