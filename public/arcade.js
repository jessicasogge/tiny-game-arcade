// Draws the shelf of cartridges and loads the picked one into the arcade
// screen. The game list itself lives in games.js.
import { GAMES } from './games.js';

function cartridge(doc, game) {
  const button = doc.createElement('button');
  button.type = 'button';
  button.className = 'cart';
  button.dataset.game = game.id;
  button.setAttribute('aria-pressed', 'false');
  button.style.setProperty('--shell', game.shell);

  const label = doc.createElement('span');
  label.className = 'cart-label';

  const art = doc.createElement('img');
  art.className = 'cart-art';
  art.src = `./art/${game.id}.svg`;
  art.alt = '';
  art.width = 120;
  art.height = 76;

  const title = doc.createElement('span');
  title.className = 'cart-title';
  title.textContent = game.title;

  const sub = doc.createElement('span');
  sub.className = 'cart-sub';
  sub.textContent = game.sub;

  label.append(art, title, sub);
  button.append(label);
  return button;
}

export function start(doc, games = GAMES) {
  const shelf = doc.querySelector('.shelf-grid');
  const screen = doc.querySelector('.screen');
  const title = doc.querySelector('.screen-title');
  const blurb = doc.querySelector('.screen-blurb');
  const tags = doc.querySelector('.screen-tags');
  const play = doc.querySelector('.press-start');
  const count = doc.querySelector('.shelf-count');

  const buttons = games.map((game) => cartridge(doc, game));
  shelf.replaceChildren(...buttons);
  count.textContent = games.length === 1 ? '1 game on the shelf' : `${games.length} games on the shelf`;

  function load(id) {
    const game = games.find((g) => g.id === id) || games[0];
    for (const b of buttons) b.setAttribute('aria-pressed', String(b.dataset.game === game.id));
    screen.style.setProperty('--screen', game.screen);
    title.textContent = game.title;
    blurb.textContent = game.blurb;
    tags.replaceChildren(
      ...game.tags.map((t) => {
        const li = doc.createElement('li');
        li.textContent = t;
        return li;
      }),
    );
    play.href = game.url;
    play.setAttribute('aria-label', `Press start: play ${game.title} (opens in a new tab)`);
    return game;
  }

  shelf.addEventListener('click', (event) => {
    const button = event.target.closest('button.cart');
    if (button) load(button.dataset.game);
  });

  load(games[0].id);
  return { load };
}
