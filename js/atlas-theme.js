// Shared dark/light theme support and global interactions for atlas pages.
(function(){
  const html = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');

  const TRANSLATIONS = {
    ru: {
      shortcutsTitle: "⌨️ Быстрые клавиши",
      escDesc: "Вернуться на главную (в Атлас)",
      themeDesc: "Переключить цветовую тему",
      navDesc: "Предыдущий / следующий виджет",
      helpDesc: "Показать эту справку",
      langDesc: "Переключить язык (RU/EN)",
      okBtn: "Понятно",
      prevBtn: "Предыдущая визуализация",
      nextBtn: "Следующая визуализация",
      homeBtn: "Все визуализации",
      prevTitle: "Предыдущая визуализация (Клавиша: ←)",
      nextTitle: "Следующая визуализация (Клавиша: →)",
      homeTitle: "Вернуться в оглавление атласа (Клавиша: Esc)"
    },
    en: {
      shortcutsTitle: "⌨️ Keyboard Shortcuts",
      escDesc: "Return to main dashboard",
      themeDesc: "Toggle color theme",
      navDesc: "Previous / next widget",
      helpDesc: "Show this help dialog",
      langDesc: "Toggle language (RU/EN)",
      okBtn: "Got it",
      prevBtn: "Previous visualization",
      nextBtn: "Next visualization",
      homeBtn: "All visualizations",
      prevTitle: "Previous visualization (Key: ←)",
      nextTitle: "Next visualization (Key: →)",
      homeTitle: "Return to atlas index (Key: Esc)"
    }
  };

  // Theme support
  function updateTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (icon) {
      icon.className = theme === 'dark' ? 'ti ti-sun' : 'ti ti-moon';
    }
  }

  function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) {
      updateTheme(saved);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      updateTheme(prefersDark ? 'dark' : 'light');
    }
  }

  initTheme();

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      updateTheme(e.matches ? 'dark' : 'light');
    }
  });

  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme') || 'light';
      updateTheme(current === 'dark' ? 'light' : 'dark');
    });
    toggle.addEventListener('mouseenter', () => { toggle.style.transform = 'scale(1.1)'; });
    toggle.addEventListener('mouseleave', () => { toggle.style.transform = 'scale(1.0)'; });
  }

  // Language support
  function updateLang(lang) {
    html.setAttribute('data-lang', lang);
    localStorage.setItem('lang', lang);
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
      langBtn.textContent = lang === 'en' ? 'RU' : 'EN';
      langBtn.title = lang === 'en' ? 'Switch to Russian' : 'Переключить на английский';
    }
    updateNavFooter();
    
    // Dispatch global event for widgets to react to language change if they need to
    window.dispatchEvent(new CustomEvent('languagechange', { detail: { language: lang } }));
  }

  function initLang() {
    const saved = localStorage.getItem('lang');
    if (saved) {
      updateLang(saved);
    } else {
      const htmlLang = html.getAttribute('lang') || 'ru';
      updateLang(htmlLang);
    }
  }

  // Inject floating language toggle button
  if (toggle) {
    let langBtn = document.getElementById('lang-toggle');
    if (!langBtn) {
      langBtn = document.createElement('button');
      langBtn.id = 'lang-toggle';
      langBtn.addEventListener('click', () => {
        const current = html.getAttribute('data-lang') || 'ru';
        updateLang(current === 'en' ? 'ru' : 'en');
      });
      document.body.appendChild(langBtn);
    }
  }

  initLang();

  // Sequential widget registry for navigation
  const WIDGETS = [
    { url: 'afanasy_v8_text_map.html', title_ru: 'Тайм-лапс на карте', title_en: 'Map Time-lapse' },
    { url: 'three_travelers_comparison.html', title_ru: 'Три путешественника', title_en: 'Three Travelers' },
    { url: 'afanasy_trade_marshruttnik.html', title_ru: 'Торговый маршрутник', title_en: 'Trade Router' },
    { url: 'afanasy_borders_animation.html', title_ru: 'Анимация границ', title_en: 'Border Animation' },
    { url: 'afanasy_climate_monsoon.html', title_ru: 'Климат и муссоны', title_en: 'Climate and Monsoons' },
    { url: 'afanasy_gantt.html', title_ru: 'Гантт-диаграмма', title_en: 'Gantt Chart' },
    { url: 'afanasy_speed_land_sea.html', title_ru: 'Скорость: суша vs море', title_en: 'Speed: Land vs Sea' },
    { url: 'afanasy_calendar_pascha_islam.html', title_ru: 'Календарь Пасх', title_en: 'Easter/Pascha Calendar' },
    { url: 'afanasy_emotional_arc.html', title_ru: 'Эмоциональная дуга', title_en: 'Emotional Arc' },
    { url: 'afanasy_pascha_chronograph.html', title_ru: 'Пасхальный хронограф', title_en: 'Paschal Chronograph' },
    { url: 'afanasy_language_map_v2.html', title_ru: 'Карта языков текста', title_en: 'Text Language Map' },
    { url: 'afanasy_manuscripts.html', title_ru: 'Сравнение рукописей', title_en: 'Manuscript Comparison' },
    { url: 'afanasy_manuscript_layers.html', title_ru: 'Слои рукописи', title_en: 'Manuscript Layers' },
    { url: 'afanasy_religious_crisis.html', title_ru: 'Религиозный кризис', title_en: 'Religious Crisis' },
    { url: 'khozheniye_composition_tree.html', title_ru: 'Дерево состава «Хожения»', title_en: 'Composition Tree' },
    { url: 'afanasy_people_network.html', title_ru: 'Сеть людей', title_en: 'People Network' },
    { url: 'afanasy_gavan_parallel.html', title_ru: 'Параллельная биография', title_en: 'Parallel Biography' },
    { url: 'afanasy_concordance_index.html', title_ru: 'Указатель топонимов', title_en: 'Concordance Index' },
    { url: 'afanasy_historiography.html', title_ru: 'Историография', title_en: 'Historiography' },
    { url: 'afanasy_editions_v3.html', title_ru: '40 изданий', title_en: '40 Editions' },
    { url: 'afanasy_world_before_after.html', title_ru: 'До и после: Азия', title_en: 'Before & After: Asia' },
    { url: 'afanasy_economics_prices.html', title_ru: 'Экономика пути', title_en: 'Route Economics' },
    { url: 'afanasy_trade_guide_v4.html', title_ru: 'Торговый справочник', title_en: 'Merchant Guide' },
    { url: 'afanasy_bestiary.html', title_ru: 'Бестиарий Индии', title_en: 'India Bestiary' },
    { url: 'afanasy_citations_v2.html', title_ru: 'Цитирование', title_en: 'Citations' },
    { url: 'afanasy_video_export.html', title_ru: 'Экспорт видео', title_en: 'Video Export' }
  ];

  const currentPath = window.location.pathname;
  const currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1);
  const currentIdx = WIDGETS.findIndex(w => w.url === currentFile);
  const prevIdx = currentIdx !== -1 ? (currentIdx - 1 + WIDGETS.length) % WIDGETS.length : -1;
  const nextIdx = currentIdx !== -1 ? (currentIdx + 1) % WIDGETS.length : -1;
  const prevWidget = currentIdx !== -1 ? WIDGETS[prevIdx] : null;
  const nextWidget = currentIdx !== -1 ? WIDGETS[nextIdx] : null;

  // Help modal for keyboard shortcuts
  function showHelpModal() {
    const lang = html.getAttribute('data-lang') || 'ru';
    const t = TRANSLATIONS[lang];
    let modal = document.getElementById('atlas-keyboard-help');
    if (modal) {
      modal.remove(); // Re-create to refresh strings in correct lang
    }
    modal = document.createElement('div');
    modal.id = 'atlas-keyboard-help';
    modal.className = 'atlas-modal';
    modal.innerHTML = `
      <div class="atlas-modal-backdrop" onclick="document.getElementById('atlas-keyboard-help').style.display='none'"></div>
      <div class="atlas-modal-content" role="dialog" aria-modal="true" aria-labelledby="atlas-modal-title" tabindex="-1">
        <h3 id="atlas-modal-title">${t.shortcutsTitle}</h3>
        <table class="atlas-modal-table">
          <tbody>
            <tr><td><kbd>Esc</kbd></td><td>${t.escDesc}</td></tr>
            <tr><td><kbd>D</kbd></td><td>${t.themeDesc}</td></tr>
            <tr><td><kbd>L</kbd></td><td>${t.langDesc}</td></tr>
            <tr><td><kbd>←</kbd> / <kbd>→</kbd></td><td>${t.navDesc}</td></tr>
            <tr><td><kbd>?</kbd></td><td>${t.helpDesc}</td></tr>
          </tbody>
        </table>
        <button class="atlas-modal-close" onclick="document.getElementById('atlas-keyboard-help').style.display='none'" aria-label="Close">${t.okBtn}</button>
      </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'flex';
    modal.querySelector('.atlas-modal-content').focus();
  }

  function updateNavFooter() {
    const lang = html.getAttribute('data-lang') || 'ru';
    const footer = document.querySelector('.atlas-nav-footer');
    if (!footer) return;

    const prevBtn = footer.querySelector('.nav-btn-prev');
    if (prevBtn && prevWidget) {
      prevBtn.title = TRANSLATIONS[lang].prevTitle;
      prevBtn.querySelector('.nav-btn-text').textContent = lang === 'en' ? prevWidget.title_en : prevWidget.title_ru;
    }

    const homeBtn = footer.querySelector('.nav-btn-home');
    if (homeBtn) {
      homeBtn.title = TRANSLATIONS[lang].homeTitle;
      homeBtn.querySelector('.nav-btn-text').textContent = TRANSLATIONS[lang].homeBtn;
    }

    const nextBtn = footer.querySelector('.nav-btn-next');
    if (nextBtn && nextWidget) {
      nextBtn.title = TRANSLATIONS[lang].nextTitle;
      nextBtn.querySelector('.nav-btn-text').textContent = lang === 'en' ? nextWidget.title_en : nextWidget.title_ru;
    }
  }

  // Inject Related Navigation Footer if in a widget page
  if (currentIdx !== -1) {
    document.addEventListener('DOMContentLoaded', () => {
      const container = document.querySelector('.vis-container');
      if (container && !document.querySelector('.atlas-nav-footer')) {
        const footer = document.createElement('footer');
        footer.className = 'atlas-nav-footer';
        footer.innerHTML = `
          <a href="${prevWidget.url}" class="nav-btn nav-btn-prev">
            <i class="ti ti-chevron-left"></i>
            <span class="nav-btn-text"></span>
          </a>
          <a href="index.html" class="nav-btn nav-btn-home">
            <i class="ti ti-layout-grid"></i>
            <span class="nav-btn-text"></span>
          </a>
          <a href="${nextWidget.url}" class="nav-btn nav-btn-next">
            <span class="nav-btn-text"></span>
            <i class="ti ti-chevron-right"></i>
          </a>
        `;
        container.appendChild(footer);
        updateNavFooter();
      }
    });

    // Keyboard navigation and shortcuts
    document.addEventListener('keydown', function(e) {
      const active = document.activeElement;
      if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable)) {
        return;
      }
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        window.location.href = prevWidget.url;
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        window.location.href = nextWidget.url;
      } else if (e.key === '?' || (e.key === '/' && e.shiftKey)) {
        e.preventDefault();
        showHelpModal();
      } else if (e.key === 'd' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        const toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) toggleBtn.click();
      } else if (e.key === 'l' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        const langBtn = document.getElementById('lang-toggle');
        if (langBtn) langBtn.click();
      } else if (e.key === 'Escape') {
        const helpModal = document.getElementById('atlas-keyboard-help');
        if (helpModal && helpModal.style.display !== 'none') {
          e.preventDefault();
          helpModal.style.display = 'none';
        } else {
          e.preventDefault();
          window.location.href = 'index.html';
        }
      }
    });
  } else {
    // Keyboard navigation helper on index.html
    document.addEventListener('keydown', function(e) {
      const active = document.activeElement;
      if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable)) {
        return;
      }
      if (e.key === 'd' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        const toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) toggleBtn.click();
      } else if (e.key === 'l' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        const langBtn = document.getElementById('lang-toggle');
        if (langBtn) langBtn.click();
      } else if (e.key === '?' || (e.key === '/' && e.shiftKey)) {
        e.preventDefault();
        showHelpModal();
      }
    });
  }

  window.ATLAS_THEME = { updateTheme, updateLang, WIDGETS };
})();
