import { writeFile } from 'node:fs/promises';
import { createClient } from '@sanity/client';

const SITE_URL = 'https://therapywithruth.com';
const OUTPUT_PATH = new URL('../public/sitemap.xml', import.meta.url);

const staticPaths = [
  '/',
  '/about/',
  '/services/',
  '/services/depression-anxiety/',
  '/services/body-image-eating-disorder/',
  '/services/life-transitions/',
  '/services/racism-immigrant-experience/',
  '/services/trauma-ptsd/',
  '/services/communication-self-esteem/',
  '/contact/',
  '/faq/',
  '/blog/',
];

const sanityClient = createClient({
  projectId: 'we0166yc',
  dataset: 'production',
  apiVersion: '2026-03-01',
  useCdn: false,
  perspective: 'published',
});

const publishedPostsQuery = `
  *[
    _type == "post" &&
    defined(slug.current) &&
    defined(publishedAt) &&
    defined(mainImage.asset._ref) &&
    publishedAt <= now()
  ] | order(publishedAt desc) {
    "slug": slug.current,
    _updatedAt
  }
`;

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function sitemapEntry(path, lastModified) {
  const location = escapeXml(new URL(path, SITE_URL).href);
  const lastModifiedElement = lastModified
    ? `\n    <lastmod>${escapeXml(new Date(lastModified).toISOString())}</lastmod>`
    : '';

  return `  <url>\n    <loc>${location}</loc>${lastModifiedElement}\n  </url>`;
}

async function generateSitemap() {
  const posts = await sanityClient.fetch(publishedPostsQuery);
  const staticEntries = staticPaths.map((path) => sitemapEntry(path));
  const blogEntries = posts.map(({ slug, _updatedAt }) =>
    sitemapEntry(`/blog/${encodeURIComponent(slug)}/`, _updatedAt),
  );

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...staticEntries,
    ...blogEntries,
    '</urlset>',
    '',
  ].join('\n');

  await writeFile(OUTPUT_PATH, sitemap, 'utf8');
  console.log(`Generated sitemap with ${staticEntries.length + blogEntries.length} URLs.`);
}

await generateSitemap();
