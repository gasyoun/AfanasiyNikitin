const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "article_figures");
fs.mkdirSync(OUT, { recursive: true });

const COLORS = {
  ink: "#1f2933",
  muted: "#667085",
  grid: "#d7dde5",
  sea: "#dfeff7",
  seaStroke: "#8eb7cc",
  rus: "#8c6d31",
  persia: "#2f7d66",
  india: "#b24b39",
  ret: "#5b6fae",
  calendar: "#9c4f4f",
  ramadan: "#2f7d66",
  paper: "#ffffff",
  note: "#59616f",
};

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function text(x, y, value, opts = {}) {
  const {
    size = 22,
    weight = 400,
    fill = COLORS.ink,
    anchor = "start",
    rotate,
    family = "Arial, Helvetica, sans-serif",
  } = opts;
  const tr = rotate ? ` transform="rotate(${rotate} ${x} ${y})"` : "";
  return `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}"${tr}>${esc(value)}</text>`;
}

function titleBlock(title, subtitle = "") {
  return [
    `<rect x="0" y="0" width="1400" height="100%" fill="${COLORS.paper}"/>`,
    text(70, 58, title, { size: 34, weight: 700 }),
    subtitle ? text(70, 88, subtitle, { size: 18, fill: COLORS.muted }) : "",
  ].join("\n");
}

function save(name, svg) {
  fs.writeFileSync(path.join(OUT, name), svg, "utf8");
}

function fig1Route() {
  const W = 1400, H = 900;
  const map = { x: 70, y: 115, w: 1020, h: 630 };
  const lonMin = 28, lonMax = 80, latMin = 10, latMax = 58;
  function x(lon) { return map.x + (lon - lonMin) / (lonMax - lonMin) * map.w; }
  function y(lat) { return map.y + (latMax - lat) / (latMax - latMin) * map.h; }

  const points = [
    ["Тверь", 56.9, 35.9, "rus"], ["Нижний Новгород", 56.3, 44.0, "rus"],
    ["Астрахань", 46.3, 48.0, "rus"], ["Дербент", 42.1, 48.3, "persia"],
    ["Баку", 40.4, 49.9, "persia"], ["Мазендеран", 36.6, 52.0, "persia"],
    ["Кашан / Йезд", 33.0, 51.4, "persia"], ["Лар", 27.66, 54.32, "persia"],
    ["Ормуз", 27.1, 56.5, "persia"], ["Маскат", 23.6, 58.6, "persia"],
    ["Чаул", 18.5, 73.0, "india"], ["Джуннар", 19.2, 73.9, "india"],
    ["Бидар", 17.9, 77.5, "india"], ["Гулбарга", 17.33, 76.83, "india"],
    ["Дабхол", 17.52, 73.18, "india"], ["Сомалийский берег", 11.7, 51.1, "ret"],
    ["Ормуз", 27.1, 56.5, "ret"], ["Лар", 27.66, 54.32, "ret"],
    ["Эрзинджан", 39.75, 39.49, "ret"], ["Трабзон", 41.0, 39.7, "ret"],
    ["Кафа", 45.0, 35.4, "ret"], ["Смоленск", 54.8, 32.0, "ret"],
  ];
  const keyLabels = new Set(["Тверь", "Нижний Новгород", "Астрахань", "Дербент", "Баку", "Ормуз", "Маскат", "Чаул", "Бидар", "Гулбарга", "Дабхол", "Сомалийский берег", "Трабзон", "Кафа", "Смоленск"]);
  const labelOffset = {
    "Тверь": [8, -10], "Нижний Новгород": [8, -10], "Астрахань": [8, -8],
    "Ормуз": [9, 18], "Маскат": [9, 18], "Чаул": [-10, 24],
    "Бидар": [10, -10], "Гулбарга": [10, 20], "Дабхол": [-8, 24],
    "Сомалийский берег": [10, -10], "Трабзон": [10, -10], "Кафа": [10, -10],
    "Смоленск": [10, -10],
  };
  const phaseColor = { rus: COLORS.rus, persia: COLORS.persia, india: COLORS.india, ret: COLORS.ret };

  const grid = [];
  for (let lon = 30; lon <= 80; lon += 10) {
    grid.push(`<line x1="${x(lon)}" y1="${map.y}" x2="${x(lon)}" y2="${map.y + map.h}" stroke="${COLORS.grid}" stroke-width="1"/>`);
    grid.push(text(x(lon), map.y + map.h + 28, `${lon}°`, { size: 15, fill: COLORS.muted, anchor: "middle" }));
  }
  for (let lat = 10; lat <= 55; lat += 5) {
    grid.push(`<line x1="${map.x}" y1="${y(lat)}" x2="${map.x + map.w}" y2="${y(lat)}" stroke="${COLORS.grid}" stroke-width="1"/>`);
    grid.push(text(map.x - 12, y(lat) + 5, `${lat}°`, { size: 15, fill: COLORS.muted, anchor: "end" }));
  }

  const seas = [
    `<ellipse cx="${x(50)}" cy="${y(41)}" rx="55" ry="105" fill="${COLORS.sea}" stroke="${COLORS.seaStroke}" stroke-width="2"/>`,
    text(x(50), y(41), "Каспий", { size: 16, fill: COLORS.seaStroke, anchor: "middle", rotate: -80 }),
    `<ellipse cx="${x(35.5)}" cy="${y(44)}" rx="96" ry="36" fill="${COLORS.sea}" stroke="${COLORS.seaStroke}" stroke-width="2"/>`,
    text(x(35.5), y(44) + 5, "Чёрное море", { size: 16, fill: COLORS.seaStroke, anchor: "middle" }),
    `<path d="M ${x(50)} ${y(13)} C ${x(56)} ${y(20)} ${x(65)} ${y(20)} ${x(73)} ${y(18)} L ${x(78)} ${y(10)} L ${x(50)} ${y(10)} Z" fill="${COLORS.sea}" stroke="${COLORS.seaStroke}" stroke-width="2" opacity="0.95"/>`,
    text(x(62), y(14.5), "Индийский океан", { size: 16, fill: COLORS.seaStroke, anchor: "middle" }),
  ];

  const lines = [];
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i], b = points[i + 1];
    const c = phaseColor[b[3]];
    lines.push(`<line x1="${x(a[2])}" y1="${y(a[1])}" x2="${x(b[2])}" y2="${y(b[1])}" stroke="${c}" stroke-width="5" stroke-linecap="round" opacity="0.78"/>`);
  }
  const dots = points.map((p, i) => {
    const [name, lat, lon, phase] = p;
    const r = keyLabels.has(name) ? 7 : 4.5;
    const parts = [`<circle cx="${x(lon)}" cy="${y(lat)}" r="${r}" fill="${phaseColor[phase]}" stroke="#fff" stroke-width="2"/>`];
    if (keyLabels.has(name)) {
      const [dx, dy] = labelOffset[name] || [8, -8];
      parts.push(text(x(lon) + dx, y(lat) + dy, name, { size: 15, weight: 600, fill: COLORS.ink, anchor: dx < 0 ? "end" : "start" }));
    }
    if (i === 0 || i === points.length - 1) {
      parts.push(`<circle cx="${x(lon)}" cy="${y(lat)}" r="${r + 5}" fill="none" stroke="${phaseColor[phase]}" stroke-width="2"/>`);
    }
    return parts.join("\n");
  });

  const legend = [
    text(1140, 142, "Фазы маршрута", { size: 24, weight: 700 }),
    legendRow(1140, 185, COLORS.rus, "Русь и Волга"),
    legendRow(1140, 225, COLORS.persia, "Персия и Ормуз"),
    legendRow(1140, 265, COLORS.india, "Индия"),
    legendRow(1140, 305, COLORS.ret, "Возвращение"),
    `<rect x="1138" y="360" width="205" height="118" rx="8" fill="#f7f8fa" stroke="${COLORS.grid}"/>`,
    text(1160, 392, "Статус схемы", { size: 18, weight: 700 }),
    text(1160, 424, "Координаты и линии", { size: 15, fill: COLORS.note }),
    text(1160, 446, "показывают модель", { size: 15, fill: COLORS.note }),
    text(1160, 468, "сопоставления,", { size: 15, fill: COLORS.note }),
    text(1160, 490, "а не точный трек.", { size: 15, fill: COLORS.note }),
  ].join("\n");

  function legendRow(x0, y0, c, label) {
    return `<line x1="${x0}" y1="${y0 - 5}" x2="${x0 + 35}" y2="${y0 - 5}" stroke="${c}" stroke-width="7" stroke-linecap="round"/>${text(x0 + 48, y0, label, { size: 17 })}`;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
${titleBlock("Рис. 1. Маршрут Афанасия Никитина, 1467-1475 гг.", "Упрощённая картографическая схема по реконструкции Д. Г. Хрусталёва")}
<rect x="${map.x}" y="${map.y}" width="${map.w}" height="${map.h}" rx="6" fill="#fbfcfd" stroke="${COLORS.grid}" stroke-width="2"/>
${grid.join("\n")}
${seas.join("\n")}
${lines.join("\n")}
${dots.join("\n")}
${legend}
${text(70, 820, "Примечание. Пункты с бесспорной локализацией показаны как опорные; расстояния между ними являются аналитическим приближением.", { size: 17, fill: COLORS.note })}
</svg>`;
  save("fig1_route_map.svg", svg);
}

function fig2Pascha() {
  const W = 1400, H = 880;
  const plot = { x: 110, y: 130, w: 980, h: 560 };
  const years = [1467, 1468, 1469, 1470, 1471, 1472, 1473, 1474];
  const obs = [
    { n: 1, y: 1467, t: 88, o: 88, loc: "«Каин»", drift: 0, td: "29.03", od: "29.03" },
    { n: 2, y: 1468, t: 108, o: 108, loc: "Мазендеран", drift: 0, td: "17.04", od: "17.04" },
    { n: 3, y: 1469, t: 92, o: 92, loc: "Ормуз", drift: 0, td: "02.04", od: "02.04" },
    { n: 4, y: 1470, t: 112, o: 93, loc: "Бидар", drift: -19, td: "22.04", od: "03.04" },
    { n: 5, y: 1471, t: 104, o: 72, loc: "Бидар", drift: -32, td: "14.04", od: "13.03" },
    { n: 6, y: 1472, t: 89, o: 122, loc: "Бидар", drift: 33, td: "29.03", od: "01.05" },
    { n: 7, y: 1473, t: 108, o: 63, loc: "Гулбарга", drift: -45, td: "18.04", od: "нач.03" },
    { n: 8, y: 1474, t: 100, o: 100, loc: "Маскат", drift: 0, td: "10.04", od: "10.04" },
  ];
  const minDay = 45, maxDay = 130;
  function xYear(yr) { return plot.x + years.indexOf(yr) / (years.length - 1) * plot.w; }
  function yDay(d) { return plot.y + (d - minDay) / (maxDay - minDay) * plot.h; }
  const months = [
    ["февраль", 45, 59], ["март", 60, 90], ["апрель", 91, 120], ["май", 121, 130],
  ];
  const bg = months.map((m, i) => {
    const y1 = yDay(m[1]), y2 = yDay(m[2]);
    return `<rect x="${plot.x}" y="${y1}" width="${plot.w}" height="${y2 - y1}" fill="${i % 2 ? "#f8fafc" : "#ffffff"}"/>
${text(plot.x - 18, (y1 + y2) / 2 + 6, m[0], { size: 15, fill: COLORS.muted, anchor: "end" })}`;
  });
  const grid = years.map(yr => `<line x1="${xYear(yr)}" y1="${plot.y}" x2="${xYear(yr)}" y2="${plot.y + plot.h}" stroke="${COLORS.grid}" stroke-width="1"/>
${text(xYear(yr), plot.y - 18, String(yr), { size: 17, weight: 700, fill: COLORS.muted, anchor: "middle" })}`);

  const marks = obs.map(o => {
    const x = xYear(o.y);
    const yt = yDay(o.t), yo = yDay(o.o);
    const driftColor = o.drift === 0 ? COLORS.persia : COLORS.calendar;
    return `<line x1="${x}" y1="${yt}" x2="${x}" y2="${yo}" stroke="${driftColor}" stroke-width="3" opacity="${o.drift === 0 ? 0.25 : 0.75}"/>
<circle cx="${x}" cy="${yt}" r="11" fill="#fff" stroke="${COLORS.calendar}" stroke-width="3"/>
<circle cx="${x}" cy="${yo}" r="11" fill="${driftColor}" stroke="#fff" stroke-width="2"/>
${text(x, yo + 5, String(o.n), { size: 13, weight: 700, fill: "#fff", anchor: "middle" })}
${text(x + 16, yt - 8, o.td, { size: 13, fill: COLORS.muted })}
${text(x + 16, yo + 18, o.od, { size: 13, fill: driftColor, weight: 700 })}
${text(x, plot.y + plot.h + 34, o.loc, { size: 14, fill: COLORS.ink, anchor: "middle" })}
${text(x, Math.min(yo, yt) - 16, o.drift === 0 ? "0" : `${o.drift > 0 ? "+" : ""}${o.drift}`, { size: 14, fill: driftColor, weight: 700, anchor: "middle" })}`;
  });
  const x1470 = xYear(1470);
  const ramadan = `<rect x="${x1470 - 30}" y="${yDay(63)}" width="60" height="${yDay(93) - yDay(63)}" fill="${COLORS.ramadan}" opacity="0.16" rx="5"/>
${text(x1470 - 40, yDay(63) - 10, "Рамадан 1470", { size: 14, fill: COLORS.ramadan, weight: 700, anchor: "end" })}
${text(x1470 - 40, yDay(93) + 6, "Ураза-байрам", { size: 13, fill: COLORS.ramadan, anchor: "end" })}`;
  const legend = [
    text(1140, 150, "Обозначения", { size: 24, weight: 700 }),
    `<circle cx="1154" cy="190" r="10" fill="#fff" stroke="${COLORS.calendar}" stroke-width="3"/>`,
    text(1178, 196, "расчётная Пасха", { size: 17 }),
    `<circle cx="1154" cy="232" r="10" fill="${COLORS.calendar}" stroke="#fff" stroke-width="2"/>`,
    text(1178, 238, "счёт Никитина", { size: 17 }),
    `<rect x="1143" y="260" width="22" height="34" rx="4" fill="${COLORS.ramadan}" opacity="0.22"/>`,
    text(1178, 282, "Рамадан", { size: 17 }),
    `<line x1="1143" y1="326" x2="1170" y2="326" stroke="${COLORS.calendar}" stroke-width="3"/>`,
    text(1178, 332, "сдвиг даты", { size: 17 }),
    `<rect x="1138" y="380" width="215" height="170" rx="8" fill="#f7f8fa" stroke="${COLORS.grid}"/>`,
    text(1160, 414, "Смысл схемы", { size: 18, weight: 700 }),
    text(1160, 446, "Не новая датировка,", { size: 15, fill: COLORS.note }),
    text(1160, 468, "а проверка", { size: 15, fill: COLORS.note }),
    text(1160, 490, "согласованности", { size: 15, fill: COLORS.note }),
    text(1160, 512, "астрономической", { size: 15, fill: COLORS.note }),
    text(1160, 534, "сетки.", { size: 15, fill: COLORS.note }),
  ].join("\n");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
${titleBlock("Рис. 2. Пасхальный хронограф", "Календарно-астрономическое сопоставление Пасхи, счёта Никитина и мусульманских ориентиров")}
<rect x="${plot.x}" y="${plot.y}" width="${plot.w}" height="${plot.h}" fill="#fff" stroke="${COLORS.grid}" stroke-width="2"/>
${bg.join("\n")}
${grid.join("\n")}
${ramadan}
${marks.join("\n")}
${legend}
${text(110, 760, "Числа над линиями показывают сдвиг календарного счёта Никитина относительно расчётной православной Пасхи, в днях.", { size: 17, fill: COLORS.note })}
</svg>`;
  save("fig2_pascha_chronograph.svg", svg);
}

function fig3Timeline() {
  const W = 1400, H = 830;
  const x0 = 210, y0 = 145, w = 1015;
  const start = 1467, end = 1475.35;
  function t(year, month = 1) { return year + (month - 1) / 12; }
  function x(v) { return x0 + (v - start) / (end - start) * w; }
  const rows = [
    { y: 190, label: "Маршрут", bars: [
      [t(1467, 4), t(1467, 11), "Русь и Волга", COLORS.rus],
      [t(1467, 11), t(1468, 5), "Каспий / Кавказ", "#6b8f71"],
      [t(1468, 5), t(1469, 4), "Персия и Ормуз", COLORS.persia],
      [t(1469, 4), t(1469, 8), "Переход в Индию", "#4d8aa8"],
      [t(1469, 8), t(1473, 11), "Индийский период", COLORS.india],
      [t(1473, 11), t(1474, 5), "Океан / Ормуз", "#4d8aa8"],
      [t(1474, 5), t(1474, 11), "Персия - Чёрное море", COLORS.ret],
      [t(1474, 11), t(1475, 4), "Кафа - Смоленск", COLORS.rus],
    ]},
    { y: 315, label: "Долгие стоянки", bars: [
      [t(1468, 5), t(1468, 11), "Мазендеран", COLORS.persia],
      [t(1469, 9), t(1471, 2), "Бидар I", COLORS.india],
      [t(1471, 3), t(1472, 11), "Бидар II", COLORS.india],
      [t(1473, 2), t(1473, 8), "Гулбарга / Каллур", "#c06b4d"],
      [t(1473, 11), t(1474, 1.8), "Дабхол", "#4d8aa8"],
      [t(1474, 11), t(1475, 1), "Кафа", COLORS.rus],
    ]},
    { y: 440, label: "Календарные узлы", points: [
      [t(1469, 4), "Пасха: Ормуз", COLORS.calendar],
      [t(1470, 3), "Рамадан + пост", COLORS.ramadan],
      [t(1471, 2), "Махашиваратри", "#7a5fb0"],
      [t(1473, 3), "«пятая» Пасха", COLORS.calendar],
      [t(1474, 4), "Пасха: Маскат", COLORS.calendar],
    ]},
  ];
  const axes = [];
  for (let yr = 1467; yr <= 1475; yr++) {
    axes.push(`<line x1="${x(yr)}" y1="125" x2="${x(yr)}" y2="575" stroke="${COLORS.grid}" stroke-width="1"/>`);
    axes.push(text(x(yr), 112, String(yr), { size: 17, weight: 700, fill: COLORS.muted, anchor: "middle" }));
  }
  const rowSvg = rows.map(row => {
    const parts = [
      text(190, row.y + 8, row.label, { size: 18, weight: 700, fill: COLORS.muted, anchor: "end" }),
      `<line x1="${x0}" y1="${row.y}" x2="${x0 + w}" y2="${row.y}" stroke="${COLORS.grid}" stroke-width="1"/>`,
    ];
    if (row.bars) {
      row.bars.forEach(([a, b, label, color]) => {
        parts.push(`<rect x="${x(a)}" y="${row.y - 21}" width="${Math.max(6, x(b) - x(a))}" height="42" rx="6" fill="${color}" opacity="0.86"/>`);
        if (x(b) - x(a) > 75) parts.push(text((x(a) + x(b)) / 2, row.y + 7, label, { size: 15, weight: 700, fill: "#fff", anchor: "middle" }));
      });
    }
    if (row.points) {
      row.points.forEach(([v, label, color], i) => {
        const px = x(v);
        parts.push(`<line x1="${px}" y1="${row.y - 35}" x2="${px}" y2="${row.y + 35}" stroke="${color}" stroke-width="3"/>`);
        parts.push(`<circle cx="${px}" cy="${row.y}" r="8" fill="${color}" stroke="#fff" stroke-width="2"/>`);
        const dy = i % 2 ? 55 : -46;
        parts.push(text(px, row.y + dy, label, { size: 14, weight: 700, fill: color, anchor: "middle" }));
      });
    }
    return parts.join("\n");
  });
  const bidarA = x(t(1469, 9)), bidarB = x(t(1472, 11));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
${titleBlock("Рис. 3. Сжатая временная шкала путешествия", "Печатная замена интерактивной Гантт-диаграммы")}
${axes.join("\n")}
<rect x="${bidarA}" y="150" width="${bidarB - bidarA}" height="330" rx="8" fill="${COLORS.india}" opacity="0.08"/>
${text((bidarA + bidarB) / 2, 585, "Бидар как временная доминанта индийского периода", { size: 18, weight: 700, fill: COLORS.india, anchor: "middle" })}
${rowSvg.join("\n")}
<rect x="${x0}" y="640" width="${w}" height="82" rx="8" fill="#f7f8fa" stroke="${COLORS.grid}"/>
${text(x0 + 25, 675, "Примечание: схема показывает соотношение фаз маршрута и календарных узлов; длительности округлены до месяцев.", { size: 17, fill: COLORS.note })}
${text(x0 + 25, 705, "Полная интерактивная шкала остаётся рабочим инструментом атласа, но для печати заменена сжатой моделью.", { size: 17, fill: COLORS.note })}
</svg>`;
  save("fig3_timeline_regions.svg", svg);
}

function fig4Trade() {
  const W = 1400, H = 900;
  const plot = { x: 120, y: 130, w: 910, h: 600 };
  // Heuristic print model: only the horse and Bidar-expense figures are directly tied to
  // Nikitin's text; the remaining coefficients need the provenance table before publication.
  const goods = [
    ["Арабский конь", "Лошади", true, "Ормуз", 65, "Бидар", 180, "высокий"],
    ["Иранский конь", "Лошади", false, "Персия", 48, "Бидар", 130, "высокий"],
    ["Русский конь", "Лошади", true, "Тверь", 100, "Бидар", 68, "очень высокий"],
    ["Чёрный перец", "Пряности", true, "Каликут", 3, "Аден", 28, "средний"],
    ["Имбирь", "Пряности", true, "Каликут", 2, "Аден", 18, "средний"],
    ["Корица", "Пряности", false, "Каликут", 4, "Аден", 40, "средний"],
    ["Гвоздика", "Пряности", false, "Каликут", 5, "Аден", 55, "высокий"],
    ["Перец (в Персию)", "Пряности", false, "Каликут", 3, "Персия", 22, "средний"],
    ["Пряности на Русь", "Пряности", true, "Каликут", 3, "Тверь", 38, "очень высокий"],
    ["Индиго", "Ткани", true, "Гуджарат", 5, "Персия", 30, "низкий"],
    ["Хлопковые ткани", "Ткани", true, "Гуджарат", 6, "Аден", 28, "низкий"],
    ["Хлопок (в Персию)", "Ткани", false, "Гуджарат", 6, "Персия", 22, "низкий"],
    ["Шёлк китайский", "Ткани", false, "Каликут", 20, "Персия", 75, "средний"],
    ["Жемчуг", "Роскошь", false, "Ормуз", 30, "Персия", 80, "высокий"],
    ["Рубины цейлонские", "Роскошь", false, "Каликут", 40, "Персия", 130, "очень высокий"],
    ["Слоновая кость", "Роскошь", true, "Бидар", 15, "Аден", 55, "средний"],
    ["Слоновая кость (Персия)", "Роскошь", false, "Бидар", 15, "Персия", 42, "средний"],
    ["Финики", "Прочее", true, "Ормуз", 2, "Гуджарат", 8, "низкий"],
    ["Медь", "Прочее", false, "Персия", 10, "Каликут", 35, "низкий"],
  ];
  const catColor = {
    "Лошади": "#8c6d31", "Пряности": "#b24b39", "Ткани": "#2f7d66", "Роскошь": "#5b6fae", "Прочее": "#68707d",
  };
  const riskX = { "низкий": 1, "средний": 2, "высокий": 3, "очень высокий": 4 };
  function xRisk(r, i) {
    const base = plot.x + (riskX[r] - 1) / 3 * plot.w;
    const jitter = ((i * 37) % 41) - 20;
    return base + jitter;
  }
  function yCoef(c) {
    const min = 0, max = 13;
    return plot.y + plot.h - (c - min) / (max - min) * plot.h;
  }
  const yTicks = [0, 1, 3, 6, 10, 13];
  const grid = yTicks.map(v => `<line x1="${plot.x}" y1="${yCoef(v)}" x2="${plot.x + plot.w}" y2="${yCoef(v)}" stroke="${COLORS.grid}" stroke-width="1"/>
${text(plot.x - 15, yCoef(v) + 5, v === 13 ? "13×" : `${v}×`, { size: 15, fill: COLORS.muted, anchor: "end" })}`);
  const categories = ["низкий", "средний", "высокий", "очень высокий"];
  categories.forEach((r, i) => {
    const xx = plot.x + i / 3 * plot.w;
    grid.push(`<line x1="${xx}" y1="${plot.y}" x2="${xx}" y2="${plot.y + plot.h}" stroke="${COLORS.grid}" stroke-width="1"/>`);
    grid.push(text(xx, plot.y + plot.h + 35, r, { size: 16, weight: 700, fill: COLORS.muted, anchor: "middle" }));
  });
  const labelNames = new Set(["Пряности на Русь", "Корица", "Индиго", "Хлопковые ткани", "Арабский конь", "Русский конь", "Рубины цейлонские", "Слоновая кость"]);
  const labelOffsets = {
    "Пряности на Русь": [-18, -18],
    "Корица": [16, -14],
    "Арабский конь": [16, 26],
    "Русский конь": [-18, -2],
  };
  const dots = goods.map((g, i) => {
    const [name, cat, af, buy, bp, sell, sp, risk] = g;
    const coef = sp / bp;
    const px = xRisk(risk, i), py = yCoef(coef);
    const fill = catColor[cat];
    const ring = af ? `<circle cx="${px}" cy="${py}" r="11" fill="none" stroke="${COLORS.ink}" stroke-width="2"/>` : "";
    const leftLabel = px > plot.x + plot.w - 120;
    const [dx, dy] = labelOffsets[name] || [leftLabel ? -14 : 13, -9];
    const lx = px + dx;
    const ly = py + dy;
    const anchor = dx < 0 ? "end" : "start";
    const label = labelNames.has(name) ? text(lx, ly, name, { size: 13, weight: 700, fill, anchor }) : "";
    const route = labelNames.has(name) ? text(lx, ly + 18, `${buy} → ${sell}; ${coef.toFixed(1)}×`, { size: 12, fill: COLORS.muted, anchor }) : "";
    return `<circle cx="${px}" cy="${py}" r="${af ? 8 : 6}" fill="${fill}" opacity="0.9" stroke="#fff" stroke-width="2"/>
${ring}
${label}
${route}`;
  });
  const legend = [
    text(1080, 150, "Категории", { size: 24, weight: 700 }),
    ...Object.entries(catColor).map(([cat, col], i) =>
      `<circle cx="1094" cy="${190 + i * 38}" r="8" fill="${col}"/>${text(1115, 196 + i * 38, cat, { size: 17 })}`
    ),
    `<circle cx="1094" cy="405" r="8" fill="#fff" stroke="${COLORS.ink}" stroke-width="2"/>`,
    text(1115, 411, "связано с Никитиным", { size: 17 }),
    `<rect x="1075" y="470" width="260" height="156" rx="8" fill="#f7f8fa" stroke="${COLORS.grid}"/>`,
    text(1098, 505, "Как читать", { size: 18, weight: 700 }),
    text(1098, 537, "Вертикаль: отношение", { size: 15, fill: COLORS.note }),
    text(1098, 559, "цены продажи к цене", { size: 15, fill: COLORS.note }),
    text(1098, 581, "покупки. Это не", { size: 15, fill: COLORS.note }),
    text(1098, 603, "расчёт прибыли", { size: 15, fill: COLORS.note }),
    text(1098, 625, "конкретного купца.", { size: 15, fill: COLORS.note }),
  ].join("\n");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
${titleBlock("Рис. 4. Условная торговая схема: коэффициент перепродажи и риск", "Эвристическая модель относительных цен, а не реконструкция реальной прибыли")}
<rect x="${plot.x}" y="${plot.y}" width="${plot.w}" height="${plot.h}" fill="#fff" stroke="${COLORS.grid}" stroke-width="2"/>
${grid.join("\n")}
<line x1="${plot.x}" y1="${yCoef(1)}" x2="${plot.x + plot.w}" y2="${yCoef(1)}" stroke="#111827" stroke-width="2" stroke-dasharray="8 6"/>
${text(plot.x + plot.w + 12, yCoef(1) + 5, "без разрыва цен", { size: 14, fill: COLORS.ink })}
${dots.join("\n")}
${text(plot.x + plot.w / 2, 790, "Условная степень риска маршрута", { size: 18, weight: 700, anchor: "middle" })}
${text(42, plot.y + plot.h / 2, "Условный коэффициент перепродажи", { size: 18, weight: 700, anchor: "middle", rotate: -90 })}
${legend}
${text(120, 845, "Примечание. Коэффициенты показывают относительный разрыв цен в модели; не учтены капитал, пошлины, сезонность, потери, посредники и время ожидания.", { size: 17, fill: COLORS.note })}
</svg>`;
  save("fig4_trade_risk.svg", svg);
}

fig1Route();
fig2Pascha();
fig3Timeline();
fig4Trade();

console.log("Generated article figures in " + OUT);
