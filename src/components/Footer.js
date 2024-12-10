import styles from '../styles/components/Footer.module.css';

const Footer = () => {
  return (
    <div className={styles['footer-wrap']}>
      <div className={styles['footer__copyright']}>
        <p>© 2023 My Website</p>
      </div>
      <ul className={styles['footer-nav-list']}>
        <li className={styles['footer-nav__item']}>About</li>
        <li className={styles['footer-nav__item']}>Contact</li>
        <li className={styles['footer-nav__item']}>Privacy Policy</li>
      </ul>
    </div>
  );
};

export default Footer;
