import { spawn } from 'node:child_process';
import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const projectRoot = process.cwd();
const clientDir = path.join(projectRoot, 'dist', 'client');
const outputDir = path.join(projectRoot, 'pages-dist');
const basePath = '/mcg';
const port = 4173;
const vinextCli = path.join(projectRoot, 'node_modules', 'vinext', 'dist', 'cli.js');

const server = spawn(
  process.execPath,
  [vinextCli, 'start', '--port', String(port)],
  {
    cwd: projectRoot,
    env: process.env,
    stdio: ['ignore', 'pipe', 'pipe'],
  },
);

let serverOutput = '';
server.stdout.on('data', (chunk) => {
  serverOutput += chunk.toString();
});
server.stderr.on('data', (chunk) => {
  serverOutput += chunk.toString();
});

async function waitForPage() {
  const url = `http://127.0.0.1:${port}/`;

  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (server.exitCode !== null) {
      throw new Error(`Production server stopped early.\n${serverOutput}`);
    }

    try {
      const response = await fetch(url);
      if (response.ok) return response.text();
    } catch {
      // The server is still starting.
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error(`Production server did not become ready.\n${serverOutput}`);
}

function addBasePath(source) {
  return source
    .replaceAll('/_next/', `${basePath}/_next/`)
    .replaceAll('/media/', `${basePath}/media/`);
}

async function rewriteTextAssets(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await rewriteTextAssets(entryPath);
      continue;
    }

    if (!/\.(?:css|html|js|json|mjs)$/.test(entry.name)) continue;

    const source = await readFile(entryPath, 'utf8');
    const rewritten = addBasePath(source);
    if (rewritten !== source) await writeFile(entryPath, rewritten);
  }
}

try {
  const html = await waitForPage();

  await rm(outputDir, { recursive: true, force: true });
  await mkdir(outputDir, { recursive: true });
  await cp(clientDir, outputDir, { recursive: true });
  await rewriteTextAssets(outputDir);

  const staticHtml = addBasePath(html);
  await writeFile(path.join(outputDir, 'index.html'), staticHtml);
  await writeFile(path.join(outputDir, '404.html'), staticHtml);
  await writeFile(path.join(outputDir, '.nojekyll'), '');
} finally {
  server.kill();
}
