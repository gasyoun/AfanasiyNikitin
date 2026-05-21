// Shared dark/light theme support and global interactions for atlas pages.
(function(){
  const html = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');

  function updateTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (icon) {
      icon.className = theme === 'dark' ? 'ti ti-sun' : 'ti ti-moon';
    }
  }

  // OS prefers-color-scheme auto-detection
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

  // Listen to OS theme changes if user has no manual override saved
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

  // Sequential widget registry for navigation
  const WIDGETS = [
    { url: 'afanasy_v8_text_map.html', title: 'Тайм-лапс на карте' },
    { url: 'three_travelers_comparison.html', title: 'Три путешественника' },
    { url: 'afanasy_trade_marshruttnik.html', title: 'Торговый маршрутник' },
    { url: 'afanasy_borders_animation.html', title: 'Анимация границ' },
    { url: 'afanasy_gantt.html', title: 'Гантт-диаграмма' },
    { url: 'afanasy_speed_land_sea.html', title: 'Скорость: суша vs море' },
    { url: 'afanasy_calendar_pascha_islam.html', title: 'Календарь Пасх' },
    { url: 'afanasy_emotional_arc.html', title: 'Эмоциональная дуга' },
    { url: 'afanasy_language_map_v2.html', title: 'Карта языков текста' },
    { url: 'afanasy_manuscripts.html', title: 'Сравнение рукописей' },
    { url: 'afanasy_religious_crisis.html', title: 'Религиозный кризис' },
    { url: 'khozheniye_composition_tree.html', title: 'Дерево состава «Хожения»' },
    { url: 'afanasy_people_network.html', title: 'Сеть людей' },
    { url: 'afanasy_concordance_index.html', title: 'Указатель топонимов' },
    { url: 'afanasy_historiography.html', title: 'Историография' },
    { url: 'afanasy_editions_v3.html', title: '40 изданий' },
    { url: 'afanasy_world_before_after.html', title: 'До и после: Азия' },
    { url: 'afanasy_economics_prices.html', title: 'Экономика пути' },
    { url: 'afanasy_trade_guide_v4.html', title: 'Торговый справочник' },
    { url: 'afanasy_bestiary.html', title: 'Бестиарий Индии' },
    { url: 'afanasy_citations_v2.html', title: 'Цитирование' },
    { url: 'afanasy_video_export.html', title: 'Экспорт видео' }
  ];

  const currentPath = window.location.pathname;
  const currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1);
  const currentIdx = WIDGETS.findIndex(w => w.url === currentFile);

  // Help modal for keyboard shortcuts
  function showHelpModal() {
    let modal = document.getElementById('atlas-keyboard-help');
    if (modal) {
      modal.style.display = 'flex';
      modal.querySelector('.atlas-modal-content').focus();
      return;
    }
    modal = document.createElement('div');
    modal.id = 'atlas-keyboard-help';
    modal.className = 'atlas-modal';
    modal.innerHTML = `
      <div class="atlas-modal-backdrop" onclick="document.getElementById('atlas-keyboard-help').style.display='none'"></div>
      <div class="atlas-modal-content" role="dialog" aria-modal="true" aria-labelledby="atlas-modal-title" tabindex="-1">
        <h3 id="atlas-modal-title">⌨️ Быстрые клавиши</h3>
        <table class="atlas-modal-table">
          <tbody>
            <tr><td><kbd>Esc</kbd></td><td>Вернуться на главную (в Атлас)</td></tr>
            <tr><td><kbd>D</kbd></td><td>Переключить цветовую тему</td></tr>
            <tr><td><kbd>←</kbd> / <kbd>→</kbd></td><td>Предыдущий / следующий виджет</td></tr>
            <tr><td><kbd>?</kbd></td><td>Показать эту справку</td></tr>
          </tbody>
        </table>
        <button class="atlas-modal-close" onclick="document.getElementById('atlas-keyboard-help').style.display='none'" aria-label="Закрыть">Понятно</button>
      </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'flex';
    modal.querySelector('.atlas-modal-content').focus();
  }

  // Inject Related Navigation Footer if in a widget page
  if (currentIdx !== -1) {
    const prevIdx = (currentIdx - 1 + WIDGETS.length) % WIDGETS.length;
    const nextIdx = (currentIdx + 1) % WIDGETS.length;
    const prevWidget = WIDGETS[prevIdx];
    const nextWidget = WIDGETS[nextIdx];

    document.addEventListener('DOMContentLoaded', () => {
      const container = document.querySelector('.vis-container');
      if (container && !document.querySelector('.atlas-nav-footer')) {
        const footer = document.createElement('footer');
        footer.className = 'atlas-nav-footer';
        footer.innerHTML = `
          <a href="${prevWidget.url}" class="nav-btn nav-btn-prev" title="Предыдущая визуализация (Клавиша: ←)">
            <i class="ti ti-chevron-left"></i>
            <span class="nav-btn-text">${prevWidget.title}</span>
          </a>
          <a href="index.html" class="nav-btn nav-btn-home" title="Вернуться в оглавление атласа (Клавиша: Esc)">
            <i class="ti ti-layout-grid"></i>
            <span class="nav-btn-text">Все визуализации</span>
          </a>
          <a href="${nextWidget.url}" class="nav-btn nav-btn-next" title="Следующая визуализация (Клавиша: →)">
            <span class="nav-btn-text">${nextWidget.title}</span>
            <i class="ti ti-chevron-right"></i>
          </a>
        `;
        container.appendChild(footer);
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
      } else if (e.key === '?' || (e.key === '/' && e.shiftKey)) {
        e.preventDefault();
        showHelpModal();
      }
    });
  }

  window.ATLAS_THEME = { updateTheme };
})();
