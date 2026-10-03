// Checks every entry in the game list, so a new game can't go on the shelf
// half-filled-in.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { GAMES } from '../public/games.js';

const html = readFileSync(join(process.cwd(), 'public/index.html'), 'utf8');

// How readable white text is on a color (WCAG contrast ratio).
function contrastWithWhite(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return 1.05 / (lum + 0.05);
}

describe('game list', () => {
  it('has at least one game', () => {
    expect(GAMES.length).toBeGreaterThan(0);
  });

  it('gives every game a different id', () => {
    expect(new Set(GAMES.map((g) => g.id)).size).toBe(GAMES.length);
  });

  for (const game of GAMES) {
    describe(game.id, () => {
      it('has every field filled in', () => {
        for (const key of ['id', 'title', 'sub', 'blurb', 'url', 'shell', 'screen']) {
          expect(typeof game[key], key).toBe('string');
          expect(game[key].trim(), key).not.toBe('');
        }
        expect(game.tags.length).toBeGreaterThan(0);
        expect(game.tags.length).toBeLessThanOrEqual(3);
      });

      it('has a lowercase-with-dashes id', () => {
        expect(game.id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      });

      it('links to a full https web address', () => {
        expect(new URL(game.url).protocol).toBe('https:');
      });

      it('uses six-digit hex colors', () => {
        expect(game.shell).toMatch(/^#[0-9A-Fa-f]{6}$/);
        expect(game.screen).toMatch(/^#[0-9A-Fa-f]{6}$/);
      });

      it('has a screen color dark enough for white text', () => {
        expect(contrastWithWhite(game.screen)).toBeGreaterThanOrEqual(4.5);
      });

      it('has a cartridge picture', () => {
        expect(existsSync(join(process.cwd(), 'public/art', `${game.id}.svg`))).toBe(true);
      });

      it('is in the no-JavaScript fallback list', () => {
        expect(html).toContain(`<a href="${game.url}">${game.title}</a>`);
      });
    });
  }
});
