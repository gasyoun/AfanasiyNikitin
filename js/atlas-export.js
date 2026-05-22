// Academic Export & Share Toolkit for Afanasiy Nikitin Interactive Atlas
(function() {
  // 1. Inject Styles for Export Elements
  const styles = `
    .atlas-export-container {
      display: flex;
      gap: 6px;
      align-items: center;
      margin-left: 10px;
    }
    .atlas-export-btn {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 5px 10px;
      font-size: 10.5px;
      font-weight: 500;
      font-family: var(--font-sans);
      color: var(--color-text-secondary);
      background: var(--color-background-secondary);
      border: 0.5px solid var(--color-border-secondary);
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.15s ease;
      user-select: none;
    }
    .atlas-export-btn:hover {
      color: var(--color-text-primary);
      background: var(--color-background-tertiary);
      border-color: var(--color-accent);
      transform: translateY(-1px);
    }
    .atlas-export-btn:active {
      transform: translateY(0) scale(0.97);
    }
    .atlas-export-btn i {
      font-size: 12px;
    }

    /* Modal styles */
    .atlas-export-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      z-index: 100000;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s ease;
    }
    .atlas-export-modal-overlay.active {
      opacity: 1;
      pointer-events: auto;
    }
    .atlas-export-modal-card {
      width: 90%;
      max-width: 500px;
      background: var(--color-background-primary);
      border: 1px solid var(--color-border-primary);
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-detail-panel);
      padding: 20px;
      transform: scale(0.9) translateY(20px);
      transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .atlas-export-modal-overlay.active .atlas-export-modal-card {
      transform: scale(1) translateY(0);
    }
    .atlas-export-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .atlas-export-modal-header h3 {
      font-family: var(--font-display);
      font-size: 1.2rem;
      color: var(--color-text-primary);
      margin: 0;
    }
    .atlas-export-modal-close {
      background: none;
      border: none;
      color: var(--color-text-secondary);
      font-size: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      transition: all 0.15s;
    }
    .atlas-export-modal-close:hover {
      background: var(--color-background-secondary);
      color: var(--color-text-primary);
    }
    .atlas-export-modal-body {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .atlas-export-modal-body p {
      font-size: 11.5px;
      color: var(--color-text-secondary);
      line-height: 1.5;
      margin: 0;
    }
    .atlas-export-modal-textarea {
      width: 100%;
      height: 90px;
      padding: 10px;
      font-family: monospace;
      font-size: 11px;
      background: var(--color-background-secondary);
      border: 0.5px solid var(--color-border-secondary);
      border-radius: var(--border-radius-md);
      color: var(--color-text-primary);
      resize: none;
      outline: none;
    }
    .atlas-export-modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 5px;
    }
    .atlas-export-modal-btn-copy {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      font-size: 11.5px;
      font-weight: 600;
      color: var(--color-background-primary);
      background: var(--color-text-primary);
      border: none;
      border-radius: var(--border-radius-md);
      cursor: pointer;
      transition: all 0.15s;
    }
    .atlas-export-modal-btn-copy:hover {
      opacity: 0.9;
    }
    .atlas-export-modal-btn-copy.copied {
      background: var(--viz-network-help, #1e8250);
    }
    
    @media (max-width: 600px) {
      .atlas-export-container {
        margin-left: 0;
        margin-top: 5px;
        width: 100%;
        justify-content: flex-start;
      }
    }
  `;
  const styleEl = document.createElement('style');
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);

  // 2. Helper to resolve computed styles and copy to SVG clone
  function serializeSvgWithComputedStyles(svgElement) {
    const clone = svgElement.cloneNode(true);
    const origElements = svgElement.querySelectorAll('*');
    const cloneElements = clone.querySelectorAll('*');
    
    const styleProps = [
      'fill', 'stroke', 'stroke-width', 'font-family', 'font-size', 
      'font-weight', 'text-anchor', 'opacity', 'stroke-dasharray', 
      'stroke-linecap', 'stroke-linejoin'
    ];
    
    const rootStyle = window.getComputedStyle(document.documentElement);
    
    function resolveValue(val) {
      if (val && typeof val === 'string' && val.trim().startsWith('var(')) {
        const match = val.match(/var\(\s*(--[^,\s)]+)/);
        if (match) {
          const varName = match[1].trim();
          const resolved = rootStyle.getPropertyValue(varName).trim();
          if (resolved) return resolved;
        }
      }
      return val;
    }
    
    // Copy computed styles for root
    const computedRoot = window.getComputedStyle(svgElement);
    styleProps.forEach(prop => {
      let val = computedRoot.getPropertyValue(prop);
      val = resolveValue(val);
      if (val) clone.style[prop] = val;
    });
    
    // Copy computed styles for children
    for (let i = 0; i < origElements.length; i++) {
      const orig = origElements[i];
      const cloned = cloneElements[i];
      const computed = window.getComputedStyle(orig);
      
      styleProps.forEach(prop => {
        let val = computed.getPropertyValue(prop);
        val = resolveValue(val);
        if (val) cloned.style[prop] = val;
      });
    }
    
    return new XMLSerializer().serializeToString(clone);
  }

  // 3. Helper to trigger file download
  function triggerDownload(url, filename) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // 4. Export Functions
  function exportSVG(svgElement, filename) {
    const serialized = serializeSvgWithComputedStyles(svgElement);
    const blob = new Blob([serialized], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    triggerDownload(url, `${filename}.svg`);
    URL.revokeObjectURL(url);
  }

  function exportPNG(element, filename, isSvg) {
    if (isSvg) {
      const serialized = serializeSvgWithComputedStyles(element);
      const blob = new Blob([serialized], { type: 'image/svg+xml;charset=utf-8' });
      const blobURL = URL.createObjectURL(blob);
      
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const scale = 2; // High-res export
        const rect = element.getBoundingClientRect();
        
        let width = element.clientWidth || rect.width || 960;
        let height = element.clientHeight || rect.height || 540;
        
        canvas.width = width * scale;
        canvas.height = height * scale;
        const ctx = canvas.getContext('2d');
        ctx.scale(scale, scale);
        
        // Draw white background for offline/image viewers
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-background-primary').trim() || '#ffffff';
        ctx.fillRect(0, 0, width, height);
        
        ctx.drawImage(image, 0, 0, width, height);
        
        canvas.toBlob(pngBlob => {
          const pngURL = URL.createObjectURL(pngBlob);
          triggerDownload(pngURL, `${filename}.png`);
          URL.revokeObjectURL(pngURL);
        }, 'image/png');
        
        URL.revokeObjectURL(blobURL);
      };
      image.src = blobURL;
    } else {
      // Canvas element
      element.toBlob(pngBlob => {
        const pngURL = URL.createObjectURL(pngBlob);
        triggerDownload(pngURL, `${filename}.png`);
        URL.revokeObjectURL(pngURL);
      }, 'image/png');
    }
  }

  // 5. Build Embed Code Modal
  let modalOverlay = null;
  function showEmbedModal(pageFilename) {
    if (!modalOverlay) {
      modalOverlay = document.createElement('div');
      modalOverlay.className = 'atlas-export-modal-overlay';
      
      const card = document.createElement('div');
      card.className = 'atlas-export-modal-card';
      
      const header = document.createElement('div');
      header.className = 'atlas-export-modal-header';
      header.innerHTML = `
        <h3>Код встраивания</h3>
        <button class="atlas-export-modal-close" aria-label="Закрыть"><i class="ti ti-x"></i></button>
      `;
      
      const body = document.createElement('div');
      body.className = 'atlas-export-modal-body';
      body.innerHTML = `
        <p>Скопируйте этот HTML-код, чтобы встроить данную визуализацию на ваш сайт или в академическую статью:</p>
        <textarea class="atlas-export-modal-textarea" readonly></textarea>
      `;
      
      const actions = document.createElement('div');
      actions.className = 'atlas-export-modal-actions';
      actions.innerHTML = `
        <button class="atlas-export-modal-btn-copy"><i class="ti ti-copy"></i> Копировать</button>
      `;
      
      card.appendChild(header);
      card.appendChild(body);
      card.appendChild(actions);
      modalOverlay.appendChild(card);
      document.body.appendChild(modalOverlay);
      
      // Close events
      header.querySelector('.atlas-export-modal-close').onclick = () => modalOverlay.classList.remove('active');
      modalOverlay.onclick = (e) => {
        if (e.target === modalOverlay) modalOverlay.classList.remove('active');
      };
      
      // Copy action
      actions.querySelector('.atlas-export-modal-btn-copy').onclick = function() {
        const textarea = body.querySelector('.atlas-export-modal-textarea');
        textarea.select();
        navigator.clipboard.writeText(textarea.value).then(() => {
          this.innerHTML = '<i class="ti ti-check"></i> Скопировано!';
          this.classList.add('copied');
          setTimeout(() => {
            this.innerHTML = '<i class="ti ti-copy"></i> Копировать';
            this.classList.remove('copied');
          }, 2000);
        });
      };
    }
    
    // Generate code
    const pageUrl = window.location.href;
    const iframeCode = `<iframe src="${pageUrl}" width="100%" height="600" style="border:none; border-radius:12px; box-shadow:0 8px 24px rgba(0,0,0,0.05);" title="Атлас Афанасия Никитина"></iframe>`;
    modalOverlay.querySelector('.atlas-export-modal-textarea').value = iframeCode;
    
    // Show modal
    setTimeout(() => modalOverlay.classList.add('active'), 50);
  }

  // 6. Initialization
  function init() {
    const container = document.querySelector('.vis-container');
    if (!container) return;
    
    const header = container.querySelector('.vis-header');
    if (!header) return;

    const svgEl = container.querySelector('svg');
    const canvasEl = container.querySelector('canvas');
    
    // Get filename from location
    const urlPath = window.location.pathname;
    const pageFilename = urlPath.substring(urlPath.lastIndexOf('/') + 1) || 'index.html';
    const cleanName = pageFilename.replace('.html', '');

    const exportContainer = document.createElement('div');
    exportContainer.className = 'atlas-export-container';

    // SVG Download Button
    if (svgEl) {
      const btnSvg = document.createElement('button');
      btnSvg.className = 'atlas-export-btn';
      btnSvg.title = 'Скачать векторную графику (SVG)';
      btnSvg.innerHTML = '<i class="ti ti-file-type-svg"></i> SVG';
      btnSvg.onclick = () => exportSVG(svgEl, cleanName);
      exportContainer.appendChild(btnSvg);
    }

    // PNG Download Button
    if (svgEl || canvasEl) {
      const btnPng = document.createElement('button');
      btnPng.className = 'atlas-export-btn';
      btnPng.title = 'Скачать растровое изображение (PNG)';
      btnPng.innerHTML = '<i class="ti ti-photo"></i> PNG';
      btnPng.onclick = () => exportPNG(svgEl || canvasEl, cleanName, !!svgEl);
      exportContainer.appendChild(btnPng);
    }

    // Embed Button
    const btnEmbed = document.createElement('button');
    btnEmbed.className = 'atlas-export-btn';
    btnEmbed.title = 'Получить код встраивания';
    btnEmbed.innerHTML = '<i class="ti ti-code"></i> Встроить';
    btnEmbed.onclick = () => showEmbedModal(pageFilename);
    exportContainer.appendChild(btnEmbed);

    // Inject into header cleanly
    const breadcrumb = header.querySelector('.atlas-breadcrumb');
    if (breadcrumb) {
      const rightWrapper = document.createElement('div');
      rightWrapper.style.display = 'flex';
      rightWrapper.style.alignItems = 'center';
      rightWrapper.style.flexWrap = 'wrap';
      rightWrapper.style.gap = '8px';
      rightWrapper.style.justifyContent = 'flex-end';
      
      breadcrumb.parentNode.insertBefore(rightWrapper, breadcrumb);
      rightWrapper.appendChild(breadcrumb);
      rightWrapper.appendChild(exportContainer);
    } else {
      header.appendChild(exportContainer);
    }
  }

  // Run on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
