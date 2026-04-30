import { readFileSync, writeFileSync } from 'fs';
import { marked } from 'marked';

const mdPath = String.raw`C:\Users\jaivi\.gemini\antigravity\brain\f78f191d-3052-48df-be61-f3ad1bd72767\artifacts\univenture_viva_guide.md`;
const outPath = String.raw`c:\Users\jaivi\OneDrive\Desktop\UniVentures\UniVenture_Viva_Guide.html`;

const md = readFileSync(mdPath, 'utf-8');

// Remove mermaid blocks (not renderable in PDF)
const cleanMd = md.replace(/```mermaid[\s\S]*?```/g, '_[Diagram — see the .md file for the interactive Mermaid chart]_');

const html = marked.parse(cleanMd);

const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>UniVenture — Complete Viva Preparation Guide</title>
  <style>
    @page {
      size: A4;
      margin: 20mm 18mm;
    }
    * { box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
      font-size: 13px;
      line-height: 1.7;
      color: #1a1a2e;
      max-width: 100%;
      padding: 0;
      margin: 0;
    }
    h1 {
      color: #6C63FF;
      border-bottom: 3px solid #6C63FF;
      padding-bottom: 10px;
      font-size: 28px;
      margin-top: 40px;
      page-break-after: avoid;
    }
    h2 {
      color: #1a1a2e;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 6px;
      margin-top: 35px;
      font-size: 20px;
      page-break-after: avoid;
    }
    h3 {
      color: #6C63FF;
      font-size: 16px;
      margin-top: 25px;
      page-break-after: avoid;
    }
    h4 {
      color: #00B4D8;
      font-size: 14px;
      page-break-after: avoid;
    }
    p { margin: 8px 0; }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 14px 0;
      font-size: 12px;
      page-break-inside: avoid;
    }
    th {
      background: #6C63FF;
      color: white;
      padding: 8px 12px;
      text-align: left;
      font-weight: 600;
    }
    td {
      border: 1px solid #e2e8f0;
      padding: 8px 12px;
      vertical-align: top;
    }
    tr:nth-child(even) { background: #f8faff; }
    code {
      background: #f0f4ff;
      color: #6C63FF;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'Consolas', 'Courier New', monospace;
      font-size: 12px;
    }
    pre {
      background: #1e1e2e;
      color: #cdd6f4;
      padding: 16px 20px;
      border-radius: 10px;
      font-size: 12px;
      overflow-x: auto;
      line-height: 1.5;
      page-break-inside: avoid;
      border: 1px solid #313244;
    }
    pre code {
      background: transparent;
      color: inherit;
      padding: 0;
      font-size: 12px;
    }
    blockquote {
      border-left: 4px solid #6C63FF;
      background: #f0f4ff;
      padding: 14px 18px;
      margin: 14px 0;
      border-radius: 0 10px 10px 0;
      font-size: 13px;
    }
    blockquote p { margin: 4px 0; }
    strong { color: #1a1a2e; }
    a { color: #6C63FF; text-decoration: none; }
    hr {
      border: none;
      border-top: 2px solid #e2e8f0;
      margin: 30px 0;
    }
    ul, ol {
      padding-left: 24px;
      margin: 8px 0;
    }
    li { margin: 4px 0; }
    .header-banner {
      background: linear-gradient(135deg, #6C63FF 0%, #00B4D8 100%);
      color: white;
      padding: 40px 30px;
      border-radius: 16px;
      margin-bottom: 30px;
      text-align: center;
    }
    .header-banner h1 {
      color: white;
      border-bottom: none;
      margin: 0 0 10px 0;
      font-size: 32px;
    }
    .header-banner p {
      color: rgba(255,255,255,0.85);
      font-size: 15px;
      margin: 0;
    }
    img { max-width: 100%; }
    @media print {
      body { font-size: 11px; }
      pre { font-size: 10px; }
      h1 { font-size: 22px; }
      h2 { font-size: 17px; }
      h3 { font-size: 14px; }
    }
  </style>
</head>
<body>
  <div class="header-banner">
    <h1>UniVenture — Complete Viva Preparation Guide</h1>
    <p>React 19 + Vite 7 + TailwindCSS v4 + React Router v7 | Every file explained line-by-line</p>
  </div>
  ${html}
  <hr>
  <p style="text-align: center; color: #9CA3AF; font-size: 11px; margin-top: 40px;">
    UniVenture Viva Guide — Generated for exam preparation
  </p>
</body>
</html>`;

writeFileSync(outPath, fullHtml, 'utf-8');
console.log('HTML saved to:', outPath);
console.log('Open this file in Chrome and press Ctrl+P → Save as PDF');
