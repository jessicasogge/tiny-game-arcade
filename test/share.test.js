// Checks the link preview: the picture, title and line that show when the
// arcade's link is shared in a text or a chat.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const html = readFileSync(join(process.cwd(), 'public/index.html'), 'utf8');
const meta = (attr, name) => html.match(new RegExp(`<meta ${attr}="${name}" content="([^"]*)"`))?.[1];

describe('link preview', () => {
  it('has a title and a line about the arcade', () => {
    expect(meta('property', 'og:title')).toBe('Tiny Game Arcade');
    expect(meta('property', 'og:description')).toBe('A shelf full of silly browser games.');
  });

  it('points at the share picture by its full web address', () => {
    expect(meta('property', 'og:image')).toBe('https://jessicasogge.github.io/tiny-game-arcade/share.png');
    expect(existsSync(join(process.cwd(), 'public/share.png'))).toBe(true);
  });

  it('gives the picture its real size, 1200 × 630', () => {
    expect(meta('property', 'og:image:width')).toBe('1200');
    expect(meta('property', 'og:image:height')).toBe('630');
    const png = readFileSync(join(process.cwd(), 'public/share.png'));
    expect(png.readUInt32BE(16)).toBe(1200);
    expect(png.readUInt32BE(20)).toBe(630);
  });

  it('describes the picture for people who can\'t see it', () => {
    expect(meta('property', 'og:image:alt')).toBeTruthy();
  });

  it('asks for the big picture card', () => {
    expect(meta('name', 'twitter:card')).toBe('summary_large_image');
  });
});
