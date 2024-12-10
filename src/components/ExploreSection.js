import React from 'react';
import { ArrowRight } from 'lucide-react';
import styles from '../styles/components/ExploreSection.module.css';

// Importăm imaginile
import Forest from '../images/ExploreForests.png';
import Environment from '../images/ProtectEnvironment.png';
import Water from '../images/ProtectWaterWays.png';

const ExploreCard = ({ title, image }) => (
  <div className={styles['explore-card']}>
    <div className={styles['explore-card-img-wrap']}>
      <img alt={title} className={styles['explore-card__img']} src={image} />
    </div>
    <a className={styles['explore-card__link']} href="#">
      <p className={styles['explore-card__title']}>{title}</p>
      <ArrowRight className={styles.inline} />
    </a>
  </div>
);

const ExploreSection = () => {
  const cards = [
    { title: 'Paduri', image: Forest },
    { title: 'Mediu Inconjurator', image: Environment },
    { title: 'Ape', image: Water },
  ];

  return (
    <section className={styles.explore}>
      <div className={styles.container}>
        <div className={styles['explore-section-title-wrapper']}>
          <h3 className={styles['explore-section__title']}>Protejeaza tot ce poti!</h3>
          <a className="btn btn-black" href="#">
            Exploreaza mai multe! <ArrowRight className={styles.inline} />
          </a>
        </div>
        <div className={styles['explore-cards']}>
          {cards.map((card, index) => (
            <ExploreCard key={index} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;