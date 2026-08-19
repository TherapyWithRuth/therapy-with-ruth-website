import { copyFile } from 'node:fs/promises';
import path from 'node:path';

const browserOutput = path.resolve('dist/therapy-with-ruth-website/browser');
const prerenderedPage = path.join(browserOutput, '404', 'index.html');
const cloudflarePage = path.join(browserOutput, '404.html');

await copyFile(prerenderedPage, cloudflarePage);
console.log('Created Cloudflare 404 page.');
