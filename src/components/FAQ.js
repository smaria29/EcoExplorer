import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import styles from '../styles/components/FAQ.module.css';

const FAQItem = ({ title, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles['faq-accordion-item']}>
      <div className={styles['faq-accordion-item-content-wrap']}>
        <h5 className={styles['faq-accordion-item__title']}>{title}</h5>
        {isOpen && <p className={styles['faq-accordion-item__desc']}>{description}</p>}
      </div>
      <div
        className={styles['faq-accordion-item-icons']}
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: 'pointer' }}
      >
        {isOpen ? <Minus className={styles['inline']} /> : <Plus className={styles['inline']} />}
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqItems = [
    {
      title: 'Ce este EcoExplorer?',
      description: 'EcoExplorer este o platformă interactivă care îți permite să descoperi zonele protejate ecologic din România, să înveți despre ele și să participi la quiz-uri pentru a-ți testa cunoștințele.'
    },
    {
      title: 'Cum pot accesa informațiile despre zonele protejate?',
      description: 'Pe harta interactivă, apasă pe orice zonă protejată pentru a vedea detalii despre flora, fauna și caracteristicile unice ale acesteia.'
    },
    {
      title: 'Trebuie să am un cont pentru a folosi platforma?',
      description: ' Nu este necesar să ai un cont pentru a explora harta și a accesa informații, dar pentru a salva progresul în quiz-uri, este recomandat să te înregistrezi.'
    },
    {
      title: 'Quiz-urile sunt disponibile în mai multe limbi?',
      description: 'Momentan, quiz-urile sunt disponibile în limba română, dar lucrăm la integrarea altor limbi în viitor.'
    },
    {
      title: 'Cum pot contribui la conservarea mediului prin EcoExplorer?',
      description: 'Poți folosi platforma pentru a învăța despre conservarea ecologică și pentru a împărtăși informațiile descoperite cu prietenii și familia. De asemenea, vei găsi resurse și sfaturi despre cum să protejezi mediul în mod activ.'
    }
  ];

  return (
    <section className={styles['faq']}>
      <div className={styles['container']}>
        <div className={styles['faq-section-wrap']}>
          <h2 className={styles['faq-section__title']}>Intrebari Frecvente</h2>
          <div className={styles['faq-accordion']}>
            {faqItems.map((item, index) => (
              <FAQItem key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
