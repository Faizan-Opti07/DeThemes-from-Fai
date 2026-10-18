// package_vsix.js: packages De_themes From FAi 🔥 into standard .vsix archive

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const EXT_DIR = '/home/sudo-fai/Desktop/LABZZZzzz/FSWD/LAB5/DeThemes-from-Fai';
const BUILD_TMP = '/home/sudo-fai/Desktop/LABZZZzzz/FSWD/LAB5/DeThemes-from-Fai/.build_vsix';
const VSIX_OUTPUT = '/home/sudo-fai/Desktop/LABZZZzzz/FSWD/LAB5/DeThemes-from-Fai/de-themes-from-fai-1.0.0.vsix';

// clean build dir
if (fs.existsSync(BUILD_TMP)) {
  fs.rmSync(BUILD_TMP, { recursive: true, force: true });
}
fs.mkdirSync(BUILD_TMP, { recursive: true });
fs.mkdirSync(path.join(BUILD_TMP, 'extension'), { recursive: true });

// content types XML
const contentTypesXml = `<?xml version="1.0" encoding="utf-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="json" ContentType="application/json"/>
  <Default Extension="js" ContentType="application/javascript"/>
  <Default Extension="png" ContentType="image/png"/>
  <Default Extension="txt" ContentType="text/plain"/>
  <Default Extension="md" ContentType="text/markdown"/>
  <Default Extension="vsixmanifest" ContentType="text/xml"/>
  <Override PartName="/extension.vsixmanifest" ContentType="text/xml"/>
</Types>`;

// vsixmanifest XML
const vsixManifestXml = `<?xml version="1.0" encoding="utf-8"?>
<PackageManifest Version="2.0.0" xmlns="http://schemas.microsoft.com/developer/vsx-schema/2011" xmlns:d="http://schemas.microsoft.com/developer/vsx-schema-design/2011">
  <Metadata>
    <Identity Language="en-US" Id="de-themes-from-fai" Version="1.0.0" Publisher="sudo-fai" />
    <DisplayName>De_themes From FAi 🔥</DisplayName>
    <Description xml:space="preserve">36 signature UI themes redesigned with distinct, vibrant syntax color groupings and explorer gradient depth.</Description>
    <Tags>theme,color-theme,fai,de-themes,syntax,gradient,light,dark</Tags>
    <Categories>Themes</Categories>
    <GalleryFlags>Public</GalleryFlags>
    <Properties>
      <Property Id="Microsoft.VisualStudio.Code.Engine" Value="^1.60.0" />
      <Property Id="Microsoft.VisualStudio.Code.ExtensionKind" Value="workspace" />
      <Property Id="Microsoft.VisualStudio.Services.GitHubFlavoredMarkdown" Value="true" />
      <Property Id="Microsoft.VisualStudio.Services.Content.Pricing" Value="Free"/>
    </Properties>
    <License>extension/LICENSE.txt</License>
    <Icon>extension/icon.png</Icon>
  </Metadata>
  <Installation>
    <InstallationTarget Id="Microsoft.VisualStudio.Code"/>
  </Installation>
  <Dependencies/>
  <Assets>
    <Asset Type="Microsoft.VisualStudio.Code.Manifest" Path="extension/package.json" Addressable="true" />
    <Asset Type="Microsoft.VisualStudio.Services.Content.Details" Path="extension/readme.md" Addressable="true" />
    <Asset Type="Microsoft.VisualStudio.Services.Content.License" Path="extension/LICENSE.txt" Addressable="true" />
    <Asset Type="Microsoft.VisualStudio.Services.Icons.Default" Path="extension/icon.png" Addressable="true" />
  </Assets>
</PackageManifest>`;

fs.writeFileSync(path.join(BUILD_TMP, '[Content_Types].xml'), contentTypesXml);
fs.writeFileSync(path.join(BUILD_TMP, 'extension.vsixmanifest'), vsixManifestXml);

// copy files into extension/ directory
const filesToCopy = ['package.json', 'extension.js', 'readme.md', 'LICENSE.txt', 'icon.png'];
for (const f of filesToCopy) {
  if (fs.existsSync(path.join(EXT_DIR, f))) {
    fs.copyFileSync(path.join(EXT_DIR, f), path.join(BUILD_TMP, 'extension', f));
  }
}

// copy themes/
execSync(`cp -r "${path.join(EXT_DIR, 'themes')}" "${path.join(BUILD_TMP, 'extension/')}"`);

// create zip archive renamed to .vsix
if (fs.existsSync(VSIX_OUTPUT)) {
  fs.unlinkSync(VSIX_OUTPUT);
}

execSync(`cd "${BUILD_TMP}" && zip -r "${VSIX_OUTPUT}" *`);

// cleanup build tmp
fs.rmSync(BUILD_TMP, { recursive: true, force: true });

console.log(`VSIX package built successfully at: ${VSIX_OUTPUT}`);
