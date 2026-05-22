#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const http = require('http');

const BASE_URL = 'http://localhost:8080';
const BASE_DIR = process.cwd();

async function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', reject);
  });
}

async function testPWA() {
  console.log('🧪 Проверка PWA & Offline поддержки\n');
  console.log('=' .repeat(60));

  // Test 1: manifest.json
  console.log('\n✓ Проверка 1: manifest.json');
  try {
    const { status, data } = await fetchUrl(`${BASE_URL}/manifest.json`);
    if (status !== 200) {
      console.log(`  ❌ manifest.json: HTTP ${status}`);
    } else {
      const manifest = JSON.parse(data);
      console.log(`  ✅ manifest.json загружен (${data.length} bytes)`);
      console.log(`     - name: ${manifest.name}`);
      console.log(`     - display: ${manifest.display}`);
      console.log(`     - icons: ${manifest.icons?.length || 0} иконок`);
    }
  } catch (e) {
    console.log(`  ❌ Ошибка: ${e.message}`);
  }

  // Test 2: sw.js
  console.log('\n✓ Проверка 2: Service Worker (sw.js)');
  try {
    const { status, data } = await fetchUrl(`${BASE_URL}/sw.js`);
    if (status !== 200) {
      console.log(`  ❌ sw.js: HTTP ${status}`);
    } else {
      const hasInstall = data.includes('addEventListener(\'install\'');
      const hasActivate = data.includes('addEventListener(\'activate\'');
      const hasFetch = data.includes('addEventListener(\'fetch\'');
      const hasCache = data.includes('CACHE_NAME');

      console.log(`  ✅ sw.js загружен (${data.length} bytes)`);
      console.log(`     - install handler: ${hasInstall ? '✅' : '❌'}`);
      console.log(`     - activate handler: ${hasActivate ? '✅' : '❌'}`);
      console.log(`     - fetch handler: ${hasFetch ? '✅' : '❌'}`);
      console.log(`     - cache config: ${hasCache ? '✅' : '❌'}`);
    }
  } catch (e) {
    console.log(`  ❌ Ошибка: ${e.message}`);
  }

  // Test 3: index.html PWA meta tags
  console.log('\n✓ Проверка 3: PWA мета-теги в index.html');
  try {
    const { status, data } = await fetchUrl(`${BASE_URL}/index.html`);
    const hasManifest = data.includes('rel="manifest"');
    const hasThemeColor = data.includes('name="theme-color"');
    const hasAppleMobile = data.includes('name="apple-mobile-web-app-capable"');
    const hasSWScript = data.includes('navigator.serviceWorker.register(\'sw.js\')');

    console.log(`  ✅ index.html загружен (${data.length} bytes)`);
    console.log(`     - <link rel="manifest">: ${hasManifest ? '✅' : '❌'}`);
    console.log(`     - theme-color мета: ${hasThemeColor ? '✅' : '❌'}`);
    console.log(`     - apple-mobile-web-app: ${hasAppleMobile ? '✅' : '❌'}`);
    console.log(`     - SW регистрация скрипт: ${hasSWScript ? '✅' : '❌'}`);
  } catch (e) {
    console.log(`  ❌ Ошибка: ${e.message}`);
  }

  // Test 4: Check all cached assets exist
  console.log('\n✓ Проверка 4: Ассеты для кэширования');
  let assetsToCache = [];
  try {
    const swContent = fs.readFileSync(path.join(BASE_DIR, 'sw.js'), 'utf8');
    const match = swContent.match(/const ASSETS_TO_CACHE = \[\s*([\s\S]*?)\s*\];/);
    if (match) {
      assetsToCache = match[1]
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.startsWith("'") || line.startsWith('"'))
        .map(line => line.replace(/['",\s]/g, ''))
        .map(line => line.startsWith('./') ? line.substring(2) : line);
    }
  } catch (e) {
    console.log(`  ❌ Не удалось прочитать sw.js: ${e.message}`);
  }
  if (assetsToCache.length === 0) {
    assetsToCache = [
      'index.html', 'manifest.json', 'css/atlas.css',
      'js/atlas-data.js', 'js/atlas-theme.js', 'js/atlas-export.js',
      'lib/d3.min.js', 'lib/topojson.min.js', 'lib/countries-110m.json',
      'afanasy_v8_text_map.html', 'afanasy_gantt.html',
      'afanasy_calendar_pascha_islam.html', 'afanasy_economics_prices.html',
      'afanasy_concordance_index.html'
    ];
  }

  let accessible = 0;
  for (const asset of assetsToCache) {
    try {
      const { status } = await fetchUrl(`${BASE_URL}/${asset}`);
      if (status === 200) accessible++;
      else console.log(`  ⚠️  ${asset}: HTTP ${status}`);
    } catch (e) {
      console.log(`  ❌ ${asset}: ${e.message}`);
    }
  }
  console.log(`  ✅ ${accessible}/${assetsToCache.length} ассетов доступны`);

  // Test 5: Check local vs CDN
  console.log('\n✓ Проверка 5: Локальные библиотеки (не CDN)');
  try {
    const indexRes = await fetchUrl(`${BASE_URL}/index.html`);
    const hasCDN = indexRes.data.includes('cdnjs.cloudflare.com') ||
                   indexRes.data.includes('cdn.jsdelivr.net') ||
                   indexRes.data.includes('cdnjs') ||
                   indexRes.data.includes('jsdelivr');

    if (hasCDN) {
      console.log(`  ❌ Найдены CDN ссылки в index.html`);
    } else {
      console.log(`  ✅ Нет CDN ссылок (используются локальные файлы)`);
    }
  } catch (e) {
    console.log(`  ❌ Ошибка: ${e.message}`);
  }

  console.log('\n' + '='.repeat(60));
  console.log('\n📱 Инструкция для локального тестирования:\n');
  console.log('1. Откройте Chrome DevTools (F12) на странице http://localhost:8080');
  console.log('2. Перейдите на вкладку "Application"');
  console.log('3. В левой панели выберите:');
  console.log('   - Service Workers → должен показать "activated and running"');
  console.log('   - Manifest → должна загрузиться манифест');
  console.log('   - Cache Storage → "afanasy-atlas-v8" с ~20 файлами');
  console.log('4. Включите оффлайн режим:');
  console.log('   - Network tab → галочка "Offline"');
  console.log('   - Перезагрузите страницу → должна работать оффлайн');
  console.log('\n');
}

testPWA().catch(console.error);
