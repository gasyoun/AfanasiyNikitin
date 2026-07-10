import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import styles from './index.module.css';

const DOORS = [
  {
    to: '/put/',
    title: <Translate id="landing.put.title">Нарратив</Translate>,
    description: (
      <Translate id="landing.put.description">
        Хожение за три моря — путешествие, рассказанное через публичный текст и датасет
      </Translate>
    ),
  },
  {
    to: '/atlas/',
    title: <Translate id="landing.atlas.title">Атлас</Translate>,
    description: (
      <Translate id="landing.atlas.description">
        33 интерактивные визуализации: карты, хронология, текст, историография
      </Translate>
    ),
  },
  {
    to: '/data/',
    title: <Translate id="landing.data.title">Данные</Translate>,
    description: (
      <Translate id="landing.data.description">
        FAIR-датасет: маршрут, события, места — CC-BY-4.0, с DOI
      </Translate>
    ),
  },
];

export default function Home() {
  return (
    <Layout
      title="Афанасий Никитин — Атлас"
      description="Интерактивный атлас путешествия купца Афанасия Никитина, 1467–1475">
      <header className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>
            <Translate id="landing.hero.title">Афанасий Никитин</Translate>
          </h1>
          <p className={styles.heroSubtitle}>
            <Translate id="landing.hero.subtitle">
              Хожение за три моря, 1467–1475 — маршрут, датировка, источники
            </Translate>
          </p>
        </div>
      </header>
      <main>
        <section className={styles.doors}>
          <div className={`container ${styles.doorsGrid}`}>
            {DOORS.map((door) => (
              <Link key={door.to} to={door.to} className={styles.doorCard}>
                <h2>{door.title}</h2>
                <p>{door.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
