import os
import re

HTML_DIR = r"c:\Users\user\Documents\GitHub\AfanasiyNikitin"
FILES = [
    "afanasy_borders_animation.html",
    "afanasy_calendar_pascha_islam.html",
    "afanasy_economics_prices.html",
    "afanasy_emotional_arc.html",
    "afanasy_gantt.html",
    "afanasy_language_map_v2.html",
    "afanasy_manuscripts.html",
    "afanasy_speed_land_sea.html",
    "afanasy_trade_marshruttnik.html",
    "afanasy_v8_text_map.html",
    "afanasy_video_export.html",
    "index.html",
    "khozheniye_composition_tree.html",
    "three_travelers_comparison.html"
]

DARK_MODE_VARIABLES = """
    [data-theme="dark"] {
      --color-background-primary: #121212;
      --color-background-secondary: #1a1a1a;
      --color-background-tertiary: #222222;
      --color-border-primary: #c09060;
      --color-border-secondary: #3a2e26;
      --color-border-tertiary: #2d241d;
      --color-text-primary: #ebdcd5;
      --color-text-secondary: #b8aba3;
      --color-accent: #e08830;
    }
    html[data-theme="dark"] body {
      background: linear-gradient(135deg, #161210 0%, #0c0908 100%) !important;
      color: var(--color-text-primary) !important;
    }
    html[data-theme="dark"] canvas, html[data-theme="dark"] img {
      filter: invert(0.88) hue-rotate(180deg) contrast(1.1) brightness(0.95);
    }
"""

TOGGLE_BUTTON_HTML = """
  <!-- Floating Theme Toggle -->
  <button id="theme-toggle" style="position: fixed; bottom: 20px; right: 20px; z-index: 10000; width: 44px; height: 44px; border-radius: 50%; border: 1.5px solid var(--color-border-primary); background: var(--color-background-primary); color: var(--color-text-primary); cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 16px rgba(0,0,0,0.15); transition: transform 0.2s, background-color 0.2s;" title="Переключить тему">
    <i class="ti ti-moon" id="theme-icon" style="font-size: 20px;"></i>
  </button>
  <script>
  (function(){
    const html = document.documentElement;
    const toggle = document.getElementById('theme-toggle');
    const icon = document.getElementById('theme-icon');
    
    // Ensure Tabler Icons CSS is loaded if not already loaded in the document
    if (!document.querySelector('link[href*="tabler-icons"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css';
      document.head.appendChild(link);
    }

    function updateTheme(theme) {
      html.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      if (icon) {
        icon.className = theme === 'dark' ? 'ti ti-sun' : 'ti ti-moon';
      }
    }
    const saved = localStorage.getItem('theme') || 'light';
    updateTheme(saved);
    if (toggle) {
      toggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme') || 'light';
        updateTheme(current === 'dark' ? 'light' : 'dark');
      });
      toggle.addEventListener('mouseenter', () => { toggle.style.transform = 'scale(1.1)'; });
      toggle.addEventListener('mouseleave', () => { toggle.style.transform = 'scale(1.0)'; });
    }
  })();
  </script>
"""

for fn in FILES:
    fp = os.path.join(HTML_DIR, fn)
    if not os.path.exists(fp):
        print(f"Skipping {fn} (not found)")
        continue
    
    with open(fp, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Inject CSS Variables
    # If the file is index.html, we already replaced the style block manually, but let's prevent duplicate toggle buttons
    if "id=\"theme-toggle\"" not in content:
        # In case we have :root in style block, insert dark mode styles right after :root closing brace
        if ":root {" in content or ":root{" in content:
            # Let's find :root block and its closing brace
            pattern = re.compile(r'(:root\s*\{[^}]*\})', re.DOTALL)
            m = pattern.search(content)
            if m:
                root_block = m.group(1)
                new_root_block = root_block + DARK_MODE_VARIABLES
                content = content.replace(root_block, new_root_block, 1)
        
        # 2. Inject Button and script before </body>
        if "</body>" in content:
            content = content.replace("</body>", TOGGLE_BUTTON_HTML + "\n</body>", 1)
        
        with open(fp, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Successfully processed {fn}")
    else:
        print(f"{fn} already has theme toggle, skipping stylesheet/body injection")
