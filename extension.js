// extension.js: activates De_themes From FAi 🔥 and manages theme font pairing

const vscode = require('vscode');

const FONT_MAP = {
  "De_themes From FAi 🔥 Aurora Glass Light": "Spline Sans Mono",
  "De_themes From FAi 🔥 Aurora Glass Dark": "Spline Sans Mono",
  "De_themes From FAi 🔥 Autumn Terminal Light": "Anonymous Pro",
  "De_themes From FAi 🔥 Autumn Terminal Dark": "Anonymous Pro",
  "De_themes From FAi 🔥 Chalk & Clay Light": "Martian Mono",
  "De_themes From FAi 🔥 Chalk & Clay Dark": "Martian Mono",
  "De_themes From FAi 🔥 Dust Bloom Light": "Overpass Mono",
  "De_themes From FAi 🔥 Dust Bloom Dark": "Overpass Mono",
  "De_themes From FAi 🔥 Foggy Pine Light": "Fragment Mono",
  "De_themes From FAi 🔥 Foggy Pine Dark": "Fragment Mono",
  "De_themes From FAi 🔥 Golden Hour Studio Light": "DM Mono",
  "De_themes From FAi 🔥 Golden Hour Studio Dark": "DM Mono",
  "De_themes From FAi 🔥 Graph Paper Studio Light": "Roboto Mono",
  "De_themes From FAi 🔥 Graph Paper Studio Dark": "Roboto Mono",
  "De_themes From FAi 🔥 Ink Spill Light": "JetBrains Mono",
  "De_themes From FAi 🔥 Ink Spill Dark": "JetBrains Mono",
  "De_themes From FAi 🔥 Liquid Glass Light": "Chivo Mono",
  "De_themes From FAi 🔥 Liquid Glass Dark": "Chivo Mono",
  "De_themes From FAi 🔥 Marker Pack Light": "Kode Mono",
  "De_themes From FAi 🔥 Marker Pack Dark": "Kode Mono",
  "De_themes From FAi 🔥 National Parks Field Guide Light": "Space Mono",
  "De_themes From FAi 🔥 National Parks Field Guide Dark": "Space Mono",
  "De_themes From FAi 🔥 Night Ferry Light": "Azeret Mono",
  "De_themes From FAi 🔥 Night Ferry Dark": "Azeret Mono",
  "De_themes From FAi 🔥 Pastel Field Notes Light": "Cutive Mono",
  "De_themes From FAi 🔥 Pastel Field Notes Dark": "Cutive Mono",
  "De_themes From FAi 🔥 Sea Glass Light": "Sometype Mono",
  "De_themes From FAi 🔥 Sea Glass Dark": "Sometype Mono",
  "De_themes From FAi 🔥 Slate Orchard Light": "Red Hat Mono",
  "De_themes From FAi 🔥 Slate Orchard Dark": "Red Hat Mono",
  "De_themes From FAi 🔥 Studio Monochrome Light": "Ubuntu Mono",
  "De_themes From FAi 🔥 Studio Monochrome Dark": "Ubuntu Mono",
  "De_themes From FAi 🔥 Swiss International Style Light": "IBM Plex Mono",
  "De_themes From FAi 🔥 Swiss International Style Dark": "IBM Plex Mono",
  "De_themes From FAi 🔥 Watercolor Wash Light": "Victor Mono",
  "De_themes From FAi 🔥 Watercolor Wash Dark": "Victor Mono"
};

function applyFontForActiveTheme() {
  const config = vscode.workspace.getConfiguration();
  const enabled = config.get("deThemesFromFai.autoSwitchFont", true);
  if (!enabled) return;

  const themeName = config.get("workbench.colorTheme");
  const fontFamily = FONT_MAP[themeName];
  if (!fontFamily) return;

  const current = config.get("editor.fontFamily");
  if (current === fontFamily) return;

  config.update("editor.fontFamily", fontFamily, vscode.ConfigurationTarget.Global);
}

function activate(context) {
  applyFontForActiveTheme();

  context.subscriptions.push(
    vscode.window.onDidChangeActiveColorTheme(() => applyFontForActiveTheme())
  );
}

function deactivate() {}

module.exports = { activate, deactivate };
