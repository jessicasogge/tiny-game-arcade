// Uses the arcade page in a pretend browser: the shelf fills in, and picking
// a cartridge loads it into the screen.
// @vitest-environment jsdom
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { beforeEach, describe, expect, it } from 'vitest';
import { blankCount, start } from '../public/arcade.js';
import { GAMES } from '../public/games.js';

const html = readFileSync(join(process.cwd(), 'public/index.html'), 'utf8');
const $ = (sel) => document.querySelector(sel);
const carts = () => [...document.querySelectorAll('button.cart')];
const pressed = () => carts().filter((b) => b.getAttribute('aria-pressed') === 'true');

const TEST_GAMES = [
  { id: 'one', title: 'Game One', sub: 'First', blurb: 'The first game.', tags: ['A', 'B'], url: 'https://example.com/one/', shell: '#111111', screen: '#222222' },
  { id: 'two', title: 'Game Two', sub: 'Second', blurb: 'The second game.', tags: ['C'], url: 'https://example.com/two/', shell: '#333333', screen: '#444444' },
  { id: 'three', title: 'Game Three', sub: 'Third', blurb: 'The third game.', tags: ['D'], url: 'https://example.com/three/', shell: '#555555', screen: '#000000' },
];

function loadPage(games) {
  document.documentElement.innerHTML = new DOMParser().parseFromString(html, 'text/html').documentElement.innerHTML;
  return start(document, games);
}

describe('arcade page', () => {
  beforeEach(() => loadPage(TEST_GAMES));

  it('puts one cartridge on the shelf per game, in order', () => {
    expect(carts().map((b) => b.dataset.game)).toEqual(['one', 'two', 'three']);
    expect(carts().map((b) => b.querySelector('.cart-title').textContent)).toEqual(['Game One', 'Game Two', 'Game Three']);
  });

  it('gives each cartridge its picture, hidden from screen readers', () => {
    for (const b of carts()) {
      const img = b.querySelector('img.cart-art');
      expect(img.getAttribute('src')).toBe(`./art/${b.dataset.game}.svg`);
      expect(img.getAttribute('alt')).toBe('');
    }
  });

  it('ends the shelf with a blank cartridge you cannot press', () => {
    const blanks = document.querySelectorAll('.cart-blank');
    expect(blanks).toHaveLength(1);
    expect(blanks[0].tagName).toBe('DIV');
  });

  it('counts the games', () => {
    expect($('.shelf-count').textContent).toBe('3 games on the shelf');
  });

  it('starts with the first game loaded', () => {
    expect(pressed().map((b) => b.dataset.game)).toEqual(['one']);
    expect($('.screen-title').textContent).toBe('Game One');
    expect($('.screen-blurb').textContent).toBe('The first game.');
    expect([...document.querySelectorAll('.screen-tags li')].map((li) => li.textContent)).toEqual(['A', 'B']);
    expect($('.press-start').getAttribute('href')).toBe('https://example.com/one/');
  });

  it('loads a game into the screen when its cartridge is picked', () => {
    carts()[1].click();
    expect(pressed().map((b) => b.dataset.game)).toEqual(['two']);
    expect($('.screen-title').textContent).toBe('Game Two');
    expect([...document.querySelectorAll('.screen-tags li')].map((li) => li.textContent)).toEqual(['C']);
    expect($('.press-start').getAttribute('href')).toBe('https://example.com/two/');
    expect($('.press-start').getAttribute('aria-label')).toBe('Press start: play Game Two (opens in a new tab)');
    expect($('.screen').style.getPropertyValue('--screen')).toBe('#444444');
  });

  it('opens the game in a new tab, so the arcade stays open', () => {
    expect($('.press-start').getAttribute('target')).toBe('_blank');
    expect($('.press-start').getAttribute('rel')).toBe('noopener');
  });

  it('loads a game when you tap the picture or label on its cartridge', () => {
    carts()[2].querySelector('.cart-title').click();
    expect($('.screen-title').textContent).toBe('Game Three');
  });

  it('announces the newly loaded game to screen readers', () => {
    expect($('.screen').getAttribute('aria-live')).toBe('polite');
  });
});

describe('edge cases', () => {
  it('says "1 game", not "1 games", when the shelf has just one', () => {
    loadPage(TEST_GAMES.slice(0, 1));
    expect($('.shelf-count').textContent).toBe('1 game on the shelf');
  });

  it('does nothing when you tap a blank cartridge or the empty shelf', () => {
    loadPage(TEST_GAMES);
    carts()[1].click();
    $('.cart-blank').click();
    $('.shelf-grid').click();
    expect($('.screen-title').textContent).toBe('Game Two');
    expect(pressed().map((b) => b.dataset.game)).toEqual(['two']);
  });

  it('falls back to the first game when asked for one that isn\'t on the shelf', () => {
    const arcade = loadPage(TEST_GAMES);
    carts()[2].click();
    expect(arcade.load('no-such-game').id).toBe('one');
    expect($('.screen-title').textContent).toBe('Game One');
    expect(pressed().map((b) => b.dataset.game)).toEqual(['one']);
  });
});

describe('the real game list', () => {
  it('fills the shelf with every game', () => {
    loadPage(GAMES);
    expect(carts().map((b) => b.dataset.game)).toEqual(GAMES.map((g) => g.id));
    expect($('.press-start').getAttribute('href')).toBe(GAMES[0].url);
  });
});

describe('blank cartridges', () => {
  it('fill out the last row of four, always at least one', () => {
    expect([1, 2, 3, 4, 5, 8].map(blankCount)).toEqual([3, 2, 1, 1, 3, 1]);
  });
});
