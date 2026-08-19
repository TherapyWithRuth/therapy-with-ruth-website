import { readdir, rename } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const imageDirectory = path.resolve('public/images');
const fullWidthImages = new Set([
  'cliffside-lima.jpeg',
  'inside-nyc-subway-car.jpg',
  'new-york-across-the-hudson.jpeg',
  'orange-flowers-in-tree.jpg',
  'storybook.jpg',
  'sunset-beach-lima-1.jpeg',
]);

const files = (await readdir(imageDirectory))
  .filter((file) => /\.(?:jpe?g)$/i.test(file))
  .sort();

for (const file of files) {
  const sourcePath = path.join(imageDirectory, file);
  const temporaryPath = `${sourcePath}.optimizing`;
  const webpPath = sourcePath.replace(/\.(?:jpe?g)$/i, '.webp');
  const maximumDimension = fullWidthImages.has(file) ? 2400 : 1600;
  const source = sharp(sourcePath).rotate();
  const metadata = await source.metadata();
  const resize =
    Math.max(metadata.width ?? 0, metadata.height ?? 0) > maximumDimension
      ? { width: maximumDimension, height: maximumDimension, fit: 'inside', withoutEnlargement: true }
      : undefined;

  await source
    .clone()
    .resize(resize)
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(temporaryPath);
  await rename(temporaryPath, sourcePath);

  await sharp(sourcePath)
    .webp({ quality: 80, effort: 5 })
    .toFile(webpPath);

  const optimized = await sharp(sourcePath).metadata();
  console.log(`${file}: ${optimized.width}x${optimized.height}`);
}
