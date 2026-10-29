#!/usr/bin/env node
/** Eng zugeschnittene Wortmarke aus logo.png → public/logo-wordmark.png (+ Root für GitHub Pages). */
import fs from 'node:fs';
import sharp from 'sharp';

const trimmed = await sharp('logo.png').trim({ threshold: 10 }).png().toBuffer();
const meta = await sharp(trimmed).metadata();
await sharp(trimmed).toFile('public/logo-wordmark.png');
fs.copyFileSync('public/logo-wordmark.png', 'logo-wordmark.png');
console.log(`✓ logo-wordmark.png ${meta.width}×${meta.height}px`);
