import React, { useEffect, useRef, useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

/**
 * Embeds one of the 33 static atlas visualizations (H486 §5 — "the iframe
 * contract"). The pages themselves are unchanged; theme/lang propagate via
 * the shared `localStorage['theme'|'lang']` keys the same-origin iframe reads
 * on load and — since the `storage`-event listener added in atlas-theme.js —
 * also on a live toggle in the parent (H486 §2 defect 4).
 *
 * Props:
 *   src        - filename under static/atlas/, e.g. "afanasy_map_spine.html"
 *   title      - accessible iframe title (defaults to caption)
 *   height     - iframe height in px (default 640)
 *   minWidth   - min content width in px before horizontal scroll kicks in (default 720)
 *   caption    - short figure caption, rendered under the frame
 *   source     - trust-block: source artifact (e.g. "data/itinerary.csv + Хрусталёв 2026")
 *   children   - optional longer description above the figure
 */
export default function AtlasFigure({
  src,
  title,
  height = 640,
  minWidth = 720,
  caption,
  source,
  children,
}) {
  const frameSrc = useBaseUrl(`/atlas/${src}`);
  const { siteConfig } = useDocusaurusContext();
  const embedUrl = `${siteConfig.url}${frameSrc}`;
  const containerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [embedCopied, setEmbedCopied] = useState(false);
  const [citeOpen, setCiteOpen] = useState(false);
  const [citation, setCitation] = useState({ bibtex: '', gost: '' });
  const [citeCopied, setCiteCopied] = useState('');

  useEffect(() => {
    function onFsChange() {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    }
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  function toggleFullscreen() {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen?.();
    }
  }

  async function copyEmbedCode() {
    const snippet = `<iframe src="${embedUrl}" title="${(title || caption || src).replace(/"/g, '&quot;')}" width="100%" height="${height}" loading="lazy" style="border:none;min-width:${minWidth}px"></iframe>`;
    try {
      await navigator.clipboard.writeText(snippet);
      setEmbedCopied(true);
      setTimeout(() => setEmbedCopied(false), 2000);
    } catch {
      window.prompt('Скопируйте код для встраивания:', snippet);
    }
  }

  function openCite() {
    // Widget's own name, canonical published URL, access date (computed now,
    // not at build time). Rights-clear: project's own CC-BY-4.0 metadata only.
    const workTitle = title || caption || src.replace(/\.html$/, '');
    const d = new Date();
    const p = (n) => String(n).padStart(2, '0');
    const accessed = `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()}`;
    const key = 'gasuns_' + src.replace(/\.html$/, '').replace(/[^a-z0-9]+/gi, '_').replace(/^_|_$/g, '') + '_2026';
    const site = 'Афанасий Никитин — интерактивный атлас';
    const bibtex = [
      `@misc{${key},`,
      `  author       = {Gasūns, Mārcis},`,
      `  title        = {${workTitle}},`,
      `  year         = {2026},`,
      `  howpublished = {\\url{${embedUrl}}},`,
      `  note         = {${site}. CC-BY-4.0. Дата обращения: ${accessed}}`,
      `}`,
    ].join('\n');
    const gost = `Гасунс М. ${workTitle} // ${site}. 2026. URL: ${embedUrl} (дата обращения: ${accessed}).`;
    setCitation({ bibtex, gost });
    setCiteCopied('');
    setCiteOpen(true);
  }

  async function copyCite(kind) {
    const text = kind === 'bibtex' ? citation.bibtex : citation.gost;
    try {
      await navigator.clipboard.writeText(text);
      setCiteCopied(kind);
      setTimeout(() => setCiteCopied(''), 2000);
    } catch {
      window.prompt('Скопируйте ссылку:', text);
    }
  }

  return (
    <figure className={styles.figure}>
      {children && <div className={styles.description}>{children}</div>}
      <div
        ref={containerRef}
        className={`${styles.frameWrap} ${isFullscreen ? styles.fullscreen : ''}`}
      >
        <div className={styles.toolbar}>
          <button
            type="button"
            className={styles.fullscreenBtn}
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'Выйти из полноэкранного режима' : 'Открыть на весь экран'}
          >
            {isFullscreen ? '⤡ Свернуть' : '⤢ На весь экран'}
          </button>
          <button
            type="button"
            className={styles.embedBtn}
            onClick={copyEmbedCode}
            aria-label="Скопировать код для встраивания на другой сайт"
          >
            {embedCopied ? '✓ Скопировано' : '⧉ Embed'}
          </button>
          <button
            type="button"
            className={styles.embedBtn}
            onClick={openCite}
            aria-label="Получить библиографическую ссылку (BibTeX, ГОСТ)"
          >
            ❞ Цитировать
          </button>
          <a
            className={styles.openLink}
            href={frameSrc}
            target="_blank"
            rel="noopener noreferrer">
            Открыть отдельно ↗
          </a>
        </div>
        <div className={styles.scrollArea}>
          <iframe
            src={frameSrc}
            title={title || caption || src}
            className={styles.frame}
            style={{ height: isFullscreen ? '100%' : height, minWidth }}
            loading="lazy"
          />
        </div>
        <noscript>
          <p className={styles.noscript}>
            Эта визуализация требует JavaScript.{' '}
            <a href={frameSrc}>Открыть страницу напрямую</a>.
          </p>
        </noscript>
      </div>
      {(caption || source) && (
        <figcaption className={styles.caption}>
          {caption && <span className={styles.captionText}>{caption}</span>}
          {source && (
            <span className={styles.trustBlock}>
              Источник: {source}
            </span>
          )}
        </figcaption>
      )}
      {citeOpen && (
        <div
          className={styles.citeOverlay}
          onClick={(e) => { if (e.target === e.currentTarget) setCiteOpen(false); }}
        >
          <div className={styles.citeCard} role="dialog" aria-label="Цитировать">
            <div className={styles.citeHeader}>
              <strong>Цитировать</strong>
              <button
                type="button"
                className={styles.citeClose}
                onClick={() => setCiteOpen(false)}
                aria-label="Закрыть"
              >
                ✕
              </button>
            </div>
            <div className={styles.citeSection}>
              <div className={styles.citeLabel}>
                BibTeX
                <button type="button" className={styles.citeCopyBtn} onClick={() => copyCite('bibtex')}>
                  {citeCopied === 'bibtex' ? '✓ Скопировано' : 'Копировать'}
                </button>
              </div>
              <textarea className={styles.citeTextarea} readOnly value={citation.bibtex} rows={8} />
            </div>
            <div className={styles.citeSection}>
              <div className={styles.citeLabel}>
                ГОСТ (Р 7.0.100)
                <button type="button" className={styles.citeCopyBtn} onClick={() => copyCite('gost')}>
                  {citeCopied === 'gost' ? '✓ Скопировано' : 'Копировать'}
                </button>
              </div>
              <textarea className={styles.citeTextarea} readOnly value={citation.gost} rows={3} />
            </div>
          </div>
        </div>
      )}
    </figure>
  );
}
