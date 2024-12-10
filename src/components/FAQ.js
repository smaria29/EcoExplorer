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
      title: 'How does EcoSwap work?',
      description: 'Lorem ipsum dolor sit amet...'
    },
    {
      title: 'Is EcoSwap only for individuals, or can businesses participate?',
      description: 'Lorem ipsum dolor sit amet...'
    },
    {
      title: 'How do I ensure the quality of items being swapped?',
      description: 'Lorem ipsum dolor sit amet...'
    },
    {
      title: 'How do I communicate with other users on EcoSwap?',
      description: 'Lorem ipsum dolor sit amet...'
    },
    {
      title: 'Is there a fee for using EcoSwap?',
      description: 'Lorem ipsum dolor sit amet...'
    }
  ];

  return (
    <section className={styles['faq']}>
      <div className={styles['container']}>
        <div className={styles['faq-section-wrap']}>
          <h2 className={styles['faq-section__title']}>Frequently Asked Questions</h2>
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
