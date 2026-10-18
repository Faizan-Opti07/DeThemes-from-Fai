// live_customizer.js: real-time theme switcher and web studio server

import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

const SETTINGS_PATH = '/home/sudo-fai/.config/Antigravity IDE/User/settings.json';
const EXT_DIR = '/home/sudo-fai/Desktop/LABZZZzzz/FSWD/LAB5/DeThemes-from-Fai';
const PORT = 4321;

// read settings.json safely
function readSettings() {
  try {
    if (fs.existsSync(SETTINGS_PATH)) {
      return JSON.parse(fs.readFileSync(SETTINGS_PATH, 'utf8'));
    }
  } catch (e) {
    console.error('Warning reading settings:', e.message);
  }
  return {};
}

// write settings.json safely
function writeSettings(settings) {
  fs.writeFileSync(SETTINGS_PATH, JSON.stringify(settings, null, 4));
}

// apply theme in real time
export function applyThemeRealtime(themeName, customColors = null) {
  const settings = readSettings();

  settings["workbench.colorTheme"] = themeName;

  if (customColors) {
    // live token color customizations
    settings["editor.tokenColorCustomizations"] = {
      ...settings["editor.tokenColorCustomizations"],
      [`[${themeName}]`]: {
        "comments": customColors.comment?.val ?? "#64748B",
        "functions": customColors.func?.val ?? "#0066CC",
        "keywords": customColors.keyword?.val ?? "#1D4ED8",
        "numbers": customColors.number?.val ?? "#C2410C",
        "strings": customColors.string?.val ?? "#15803D",
        "types": customColors.type?.val ?? "#7C3AED",
        "variables": customColors.variable?.val ?? "#0F766E",
        "textMateRules": [
          {
            "scope": ["variable.parameter", "meta.parameter"],
            "settings": { "foreground": customColors.param?.val ?? "#EA580C", "fontStyle": "bold" }
          },
          {
            "scope": [
              "storage.type.primitive",
              "storage.type.numeric",
              "storage.type.built-in",
              "storage.type.c",
              "storage.type.cpp",
              "keyword.type"
            ],
            "settings": { "foreground": customColors.primType?.val ?? "#BE185D", "fontStyle": "bold" }
          },
          {
            "scope": ["keyword.operator"],
            "settings": { "foreground": customColors.operator?.val ?? "#DC2626", "fontStyle": "bold" }
          },
          {
            "scope": ["storage.type", "storage.modifier"],
            "settings": { "foreground": customColors.storage?.val ?? "#9333EA" }
          }
        ]
      }
    };
  }

  writeSettings(settings);
  console.log(`Successfully activated theme "${themeName}" in Antigravity IDE!`);
}

// start local studio server
function startServer() {
  const server = http.createServer((req, res) => {
    if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
      const html = fs.readFileSync(path.join(EXT_DIR, 'customizer.html'), 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      return res.end(html);
    }

    if (req.method === 'POST' && req.url === '/api/apply') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const data = JSON.parse(body);
          applyThemeRealtime(data.themeName, data.colors);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: true }));
        } catch (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: false, message: err.message }));
        }
      });
      return;
    }

    res.writeHead(404);
    res.end('Not found');
  });

  server.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`  Live Theme Studio running at: http://localhost:${PORT}`);
    console.log(`  Open this URL in your browser to tune colors in real time!`);
    console.log(`======================================================\n`);
  });
}

// CLI argument parsing
const args = process.argv.slice(2);
if (args.includes('--server')) {
  startServer();
} else if (args.includes('--apply')) {
  const themeIndex = args.indexOf('--apply') + 1;
  const themeName = args[themeIndex] || "De_themes From FAi 🔥 Aurora Glass Light";
  applyThemeRealtime(themeName);
} else {
  // default action: apply Aurora Glass Light De_themes From FAi 🔥
  applyThemeRealtime("De_themes From FAi 🔥 Aurora Glass Light");
}
