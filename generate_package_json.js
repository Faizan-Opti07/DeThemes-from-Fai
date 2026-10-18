// generate_package_json.js: creates package.json for De_themes From FAi 🔥 extension

import fs from 'node:fs';
import path from 'node:path';

const THEMES_DIR = '/home/sudo-fai/Desktop/LABZZZzzz/FSWD/LAB5/DeThemes-from-Fai/themes';
const themeFiles = fs.readdirSync(THEMES_DIR).filter(f => f.endsWith('.json'));

const themes = themeFiles.map(file => {
  const content = JSON.parse(fs.readFileSync(path.join(THEMES_DIR, file), 'utf8'));
  const isDark = content.type === 'dark' || file.includes('-dark-');
  return {
    label: content.name,
    uiTheme: isDark ? 'vs-dark' : 'vs',
    path: `./themes/${file}`
  };
});

// sort themes alphabetically
themes.sort((a, b) => a.label.localeCompare(b.label));

const pkg = {
  name: "de-themes-from-fai",
  displayName: "De_themes From FAi 🔥",
  description: "36 distinct theme variants featuring explorer gradient depth and unique, ultra-readable syntax color groupings tailored for each theme personality.",
  version: "1.0.0",
  publisher: "sudo-fai",
  icon: "icon.png",
  engines: {
    vscode: "^1.60.0"
  },
  categories: [
    "Themes"
  ],
  keywords: [
    "theme",
    "color-theme",
    "fai",
    "de-themes",
    "syntax",
    "gradient",
    "light",
    "dark",
    "high-contrast"
  ],
  main: "./extension.js",
  activationEvents: [
    "onStartupFinished"
  ],
  contributes: {
    themes,
    configuration: {
      title: "De_themes From FAi 🔥",
      properties: {
        "deThemesFromFai.autoSwitchFont": {
          "type": "boolean",
          "default": true,
          "description": "Automatically match editor.fontFamily to active theme design."
        }
      }
    }
  },
  license: "MIT",
  author: {
    name: "sudo-fai"
  }
};

fs.writeFileSync(
  '/home/sudo-fai/Desktop/LABZZZzzz/FSWD/LAB5/DeThemes-from-Fai/package.json',
  JSON.stringify(pkg, null, 2)
);

console.log('package.json successfully created for De_themes From FAi 🔥 with 36 themes!');
