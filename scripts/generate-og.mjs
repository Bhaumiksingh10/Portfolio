// Generates the social preview image and icons into public/. Run with: npm run og
// Outputs (commit them): public/og/default.png, public/favicon.svg,
// public/favicon.ico, public/apple-touch-icon.png
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';

const root = new URL('../', import.meta.url);
const fromRoot = (path) => new URL(path, root);
const fontFile = (pkg, file) => readFile(fromRoot(`node_modules/@fontsource/${pkg}/files/${file}`));

const fonts = [
  { name: 'Archivo', weight: 500, style: 'normal', data: await fontFile('archivo', 'archivo-latin-500-normal.woff') },
  { name: 'Archivo', weight: 700, style: 'normal', data: await fontFile('archivo', 'archivo-latin-700-normal.woff') },
  { name: 'Archivo', weight: 900, style: 'normal', data: await fontFile('archivo', 'archivo-latin-900-normal.woff') },
  { name: 'Kalam', weight: 700, style: 'normal', data: await fontFile('kalam', 'kalam-latin-700-normal.woff') },
];

/** Tiny element helper for satori (it takes React-like objects). */
const h = (type, props = {}, ...children) => ({
  type,
  props: { ...props, children: children.length === 0 ? undefined : children.length === 1 ? children[0] : children },
});

// Same palette as src/styles/tokens.css
const C = { paper: '#fdfdf8', rule: '#d6e3f3', margin: '#ee8a8a', ink: '#1b1c2b', ink2: '#4b4c5d', pen: '#1d43c6', marker: '#ffe24a', tape: '#ffe9a0' };

async function portraitDataUri(width) {
  const out = await sharp(await readFile(fromRoot('src/assets/portrait.png')))
    .extract({ left: 120, top: 40, width: 1200, height: 1500 })
    .resize(width)
    .jpeg({ quality: 84 })
    .toBuffer();
  return `data:image/jpeg;base64,${out.toString('base64')}`;
}

async function render(element, width, height) {
  return satori(element, { width, height, fonts });
}

function toPng(svg, width) {
  return new Resvg(svg, { fitTo: { mode: 'width', value: width } }).render().asPng();
}

/** Wrap a single PNG in an .ico container (modern browsers accept PNG-encoded icons). */
function pngToIco(png, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size, 0);
  entry.writeUInt8(size, 1);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(header.length + entry.length, 12);
  return Buffer.concat([header, entry, png]);
}

const text = (content, style) => h('div', { style: { display: 'flex', ...style } }, content);

// ---------- Open Graph image (1200×630): a ruled notebook page ----------
const og = h(
  'div',
  {
    style: {
      width: 1200,
      height: 630,
      boxSizing: 'border-box',
      position: 'relative',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 80px 0 112px',
      backgroundColor: C.paper,
      backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 31px, ${C.rule} 31px)`,
      backgroundSize: '100% 32px',
      color: C.ink,
    },
  },
  // red margin line
  h('div', { style: { position: 'absolute', top: 0, bottom: 0, left: 84, width: 3, backgroundColor: C.margin } }),
  h(
    'div',
    { style: { display: 'flex', flexDirection: 'column', width: 690, gap: 22 } },
    text('Bhaumik.', { fontFamily: 'Kalam', fontWeight: 700, fontSize: 44, color: C.pen, lineHeight: 1 }),
    h(
      'div',
      { style: { display: 'flex', flexDirection: 'column', fontFamily: 'Archivo', fontWeight: 900, fontSize: 64, lineHeight: 1.05, letterSpacing: -1.5 } },
      h(
        'div',
        { style: { display: 'flex' } },
        'I build ',
        h('span', { style: { backgroundColor: C.marker, padding: '0 6px' } }, 'backends,'),
      ),
      text('integrations &', {}),
      text('web apps.', {}),
    ),
    text('the parts of an app nobody sees, but everyone relies on', { fontFamily: 'Kalam', fontWeight: 700, fontSize: 24, color: C.pen, transform: 'rotate(-1.5deg)' }),
    h(
      'div',
      { style: { display: 'flex', flexDirection: 'column', gap: 2, marginTop: 8, fontFamily: 'Archivo', fontWeight: 500, fontSize: 20, color: C.ink2 } },
      text('Freelance backend & web developer · India', {}),
      text('Java · Spring Boot · Node.js', { color: C.pen, fontWeight: 700 }),
    ),
  ),
  // taped polaroid
  h(
    'div',
    {
      style: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: '12px 12px 54px',
        transform: 'rotate(3deg)',
        boxShadow: '0 22px 40px rgba(27,28,43,0.28)',
      },
    },
    h('img', { src: await portraitDataUri(560), width: 280, height: 350, style: { objectFit: 'cover' } }),
    text("that's me!", { position: 'absolute', bottom: 12, left: 0, right: 0, justifyContent: 'center', fontFamily: 'Kalam', fontWeight: 700, fontSize: 26, color: C.pen }),
    h('div', { style: { position: 'absolute', top: -16, left: 100, width: 104, height: 30, backgroundColor: C.tape, opacity: 0.9, transform: 'rotate(-4deg)' } }),
  ),
);

// ---------- Icons: a yellow sticky note with "B" in blue pen ----------
const mark = (size, radius, fontSize) =>
  h(
    'div',
    {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        borderRadius: radius,
        backgroundColor: C.marker,
        color: C.pen,
        fontFamily: 'Kalam',
        fontWeight: 700,
        fontSize,
        paddingTop: Math.round(size * 0.08),
      },
    },
    'B',
  );

const faviconSvg = await render(h('div', { style: { display: 'flex', width: '100%', height: '100%' } }, mark(64, 12, 50)), 64, 64);
const appleSvg = await render(h('div', { style: { display: 'flex', width: '100%', height: '100%' } }, mark(180, 0, 136)), 180, 180);

await mkdir(fromRoot('public/og/'), { recursive: true });
await writeFile(fromRoot('public/og/default.png'), toPng(await render(og, 1200, 630), 1200));
await writeFile(fromRoot('public/favicon.svg'), faviconSvg);
await writeFile(fromRoot('public/favicon.ico'), pngToIco(toPng(faviconSvg, 32), 32));
await writeFile(fromRoot('public/apple-touch-icon.png'), toPng(appleSvg, 180));

console.log('Generated public/og/default.png, favicon.svg, favicon.ico and apple-touch-icon.png');
