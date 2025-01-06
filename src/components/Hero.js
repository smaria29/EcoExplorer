import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link
import styles from '../styles/components/Hero.module.css';

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles['hero-wrap']}>
        <h1 className={styles['hero__title']}>Descoperă Natura cu EcoExplorer</h1>
        <p className={styles['hero__desc']}>
          Explorează zonele protejate din România, învață despre ele și testează-ți
          cunoștințele prin quiz-uri interactive. Educația ecologică începe aici!
        </p>
        <div className={styles['hero__buttons']}>
          <Link className="btn btn-border" to="/quiz">
            Afla mai multe 
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
