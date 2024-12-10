import React from 'react';
import { ArrowRight } from 'lucide-react';
import styles from '../styles/components/ExploreSection.module.css';

const ExploreCard = ({ title, image }) => (
  <div className={styles['explore-card']}>
    <div className={styles['explore-card-img-wrap']}>
      <img alt={title} className={styles['explore-card__img']} src={image} />
    </div>
    <a className={styles['explore-card__link']} href="#">
      <p className={styles['explore-card__title']}>{title}</p>
      <ArrowRight className={styles['inline']} />
    </a>
  </div>
);

const ExploreSection = () => {
  const cards = [
    { title: 'Clothings', image: '/images/square.png' },
    { title: 'Furnitures', image: '/images/table.png' },
    { title: 'Books', image: '/images/books.png' },
    { title: 'Books', image: '/images/square.png' },
    { title: 'Books', image: '/images/square.png' }
  ];

  return (
    <section className={styles['explore']}>
      <div className={styles['container']}>
        <div className={styles['explore-section-title-wrapper']}>
          <h3 className={styles['explore-section__title']}>Explore top listing</h3>
          <a className="btn btn-black" href="#">
            Explore Listings <ArrowRight className={styles['inline']} />
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
