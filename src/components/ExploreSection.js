import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import styles from '../styles/components/ExploreSection.module.css';

// Importăm imaginile pentru carduri
import Forest from '../images/ExploreForests.png';
import Environment from '../images/ProtectEnvironment.png';
import Water from '../images/ProtectWaterWays.png';

// Importăm imaginile pentru modale
import ForestModal from '../images/padurice.jpg';
import EnvironmentModal from '../images/mediufrumos.jpg';
import WaterModal from '../images/apita.jpg';

const ExploreCard = ({ title, image, onClick }) => (
  <div className={styles['explore-card']} onClick={onClick}>
    <div className={styles['explore-card-img-wrap']}>
      <img alt={title} className={styles['explore-card__img']} src={image} />
    </div>
    <a className={styles['explore-card__link']} href="#">
      <p className={styles['explore-card__title']}>{title}</p>
      <ArrowRight className={styles.inline} />
    </a>
  </div>
);

const ExploreModal = ({ title, image, description, onClose }) => (
  <div className={styles['modal-overlay']} onClick={onClose}>
    <div className={styles['modal-content']} onClick={(e) => e.stopPropagation()}>
      <button className={styles['modal-close-btn']} onClick={onClose}>
        X
      </button>
      <img className={styles['modal-img']} src={image} alt={title} />
      <h3 className={styles['modal-title']}>{title}</h3>
      <p className={styles['modal-description']}>{description}</p>
    </div>
  </div>
);

const ExploreSection = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  
  const cards = [
    {
      title: 'Paduri',
      image: Forest,
      modalImage: ForestModal,
      description: 'Pădurile sunt plămânii planetei noastre, producând oxigenul vital pentru viață. Ele adăpostesc o biodiversitate incredibilă și joacă un rol crucial în reglarea climei globale. Protejarea pădurilor înseamnă protejarea viitorului nostru și al generațiilor următoare.'
    },
    {
      title: 'Mediu Inconjurator',
      image: Environment,
      modalImage: EnvironmentModal,
      description: 'Mediul înconjurător este casa noastră comună și singura pe care o avem. Protejarea sa înseamnă conservarea resurselor naturale, reducerea poluării și adoptarea unui stil de viață sustenabil pentru a asigura un viitor sănătos pentru planeta noastră.'
    },
    {
      title: 'Ape',
      image: Water,
      modalImage: WaterModal,
      description: 'Apele sunt sursa vieții pe Pământ. De la oceane până la râuri și lacuri, ecosistemele acvatice sunt vitale pentru biodiversitate și pentru existența umană. Protejarea lor este esențială pentru menținerea echilibrului ecologic și asigurarea accesului la apă curată.'
    }
  ];

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

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
            <ExploreCard key={index} {...card} onClick={() => handleCardClick(card)} />
          ))}
        </div>
      </div>

      {selectedCard && (
        <ExploreModal
          title={selectedCard.title}
          image={selectedCard.modalImage}
          description={selectedCard.description}
          onClose={closeModal}
        />
      )}
    </section>
  );
};

export default ExploreSection;