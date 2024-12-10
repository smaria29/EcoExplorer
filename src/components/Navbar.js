import React from 'react';
import styles from '../styles/components/Navbar.module.css';

const Navbar = () => {
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="container">
      <nav className={styles.nav}>
        <div className={styles['nav-logo-wrapper']}>
          <img alt="Logo" className={styles['nav__logo']} src="'../images/logo.png'" />
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
          <a href="#">Log in</a>
          <a className="btn btn-white btn-smaller" href="#">Get Started</a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;