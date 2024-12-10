import React from 'react';
import { ArrowRight } from 'lucide-react';
import styles from '../styles/components/Hero.module.css';

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles['hero-wrap']}>
        <h1 className={styles['hero__title']}>Join the Green Revolution with EcoSwap</h1>
        <p className={styles['hero__desc']}>
          Swap items, reduce waste, and embrace a greener lifestyle. Together,
          We make a difference
        </p>
        <div className={styles['hero__buttons']}>
          <a className="btn btn-white" href="#">Get Started</a>
          <a className="btn btn-border" href="#">
            Learn More <ArrowRight className={styles.inline} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
