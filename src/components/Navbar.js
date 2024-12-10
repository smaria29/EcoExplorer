import React from 'react';
import styles from '../styles/components/Navbar.module.css';

const Navbar = () => {
  return (
    <div className="container">
      <nav className={styles.nav}>
        <div className={styles['nav-logo-wrapper']}>
          <img alt="Logo" className={styles['nav__logo']} src="'../../images/logo.png'" />
        </div>
        <ul className={styles['nav__list']}>
          <li className={styles['nav__item']}><a className={styles['nav__link']} href="#">Home</a></li>
          <li className={styles['nav__item']}><a className={styles['nav__link']} href="#">Listings</a></li>
          <li className={styles['nav__item']}><a className={styles['nav__link']} href="#">About</a></li>
          <li className={styles['nav__item']}><a className={styles['nav__link']} href="#">Support</a></li>
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
