/* Local preview for _site/ (or _staging/ with STAGING_BASE set).
 *
 *   node preview.js            then open http://localhost:8080
 *   PORT=8081 node preview.js
 *
 * The site is built with ROOT-ABSOLUTE urls, so opening _site/index.html straight
 * off the filesystem gives you an unstyled page and a pile of 404s. It has to be
 * served. That is what this is for.
 */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, process.env.STAGING_BASE ? '_staging' : '_site');
const PORT = Number(process.env.PORT || 8080);
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.ico': 'image/x-icon',
  '.mp4': 'video/mp4', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8',
};

if (!fs.existsSync(DIR)) {
  console.error('nothing to preview - run `node generate.js` first');
  process.exit(1);
}

/* the real CSP, read out of the generated _headers rather than retyped */
let CSP_HEADER = '';
const hp = path.join(DIR, '_headers');
if (fs.existsSync(hp)) {
  const m = /^\s*Content-Security-Policy:\s*(.+)$/m.exec(fs.readFileSync(hp, 'utf8'));
  if (m) CSP_HEADER = m[1].trim();
}

http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  /* a staging build is served from a subfolder; strip it so the same tree works */
  if (process.env.STAGING_BASE) {
    const prefix = '/' + process.env.STAGING_BASE.split(/[\\/]/).filter(Boolean).pop();
    if (p.startsWith(prefix)) p = p.slice(prefix.length) || '/';
  }
  let file = path.join(DIR, p);
  if (p.endsWith('/')) file = path.join(file, 'index.html');

  /* mp4 needs range support or Chrome will not scrub, and some builds will not
     even start playback from a 200 that ignores the Range header */
  const serve = (f) => {
    const ext = path.extname(f).toLowerCase();
    const type = TYPES[ext] || 'application/octet-stream';
    const stat = fs.statSync(f);
    const range = req.headers.range;
    if (range && ext === '.mp4') {
      const m = /bytes=(\d*)-(\d*)/.exec(range) || [];
      const start = m[1] ? parseInt(m[1], 10) : 0;
      const end = m[2] ? parseInt(m[2], 10) : stat.size - 1;
      res.writeHead(206, {
        'Content-Type': type,
        'Content-Range': `bytes ${start}-${end}/${stat.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': end - start + 1,
      });
      return fs.createReadStream(f, { start, end }).pipe(res);
    }
    const head = { 'Content-Type': type, 'Content-Length': stat.size, 'Accept-Ranges': 'bytes' };
    /* CSP=1 applies the REAL Content-Security-Policy from _site/_headers, so the
       policy can be proved against the built site before it is deployed. A CSP
       that kills the inline scripts still renders a page that looks fine - the
       only evidence is in the console. */
    if (process.env.CSP && ext === '.html' && CSP_HEADER) head['Content-Security-Policy'] = CSP_HEADER;
    res.writeHead(200, head);
    fs.createReadStream(f).pipe(res);
  };

  if (fs.existsSync(file) && fs.statSync(file).isFile()) return serve(file);
  if (fs.existsSync(file + '/index.html')) return serve(file + '/index.html');
  if (fs.existsSync(file + '.html')) return serve(file + '.html');

  const four = path.join(DIR, '404.html');
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(fs.existsSync(four) ? fs.readFileSync(four) : 'Not found');
}).listen(PORT, () => {
  console.log(`serving ${path.basename(DIR)} at http://localhost:${PORT}`);
});
