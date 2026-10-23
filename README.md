# Tiny Game Arcade

A shelf full of silly browser games. One page that links to every game: pick a cartridge off the shelf, it loads into the arcade cabinet's screen, and Press Start opens the game.

On the shelf now:

- **[PetriPals](https://jessicasogge.github.io/petripals/):** pick a bacterium, grow your colony, dodge antibiotics and race rival microbes.
- **[FunGals](https://jessicasogge.github.io/fungals/):** the sister game to PetriPals: pick a fungal pal, bud your yeast colony and steer clear of the antifungal disks.
- **[Build a Rainbow](https://jessicasogge.github.io/build-a-rainbow/):** eight rainbow color games for young kids.
- **[The Legend of Mr. Froggles](https://jessicasogge.github.io/legend-of-froggles/):** a magical flying frog, based on an original drawing by Caitlin Sogge.
- **[Snackerpillar](https://jessicasogge.github.io/snackerpillar/):** steer a hungry caterpillar made of circles, eat colored dots to grow, and don't bump into rocks, mushrooms or her own tail.

## Running it locally

The site is plain HTML, CSS and JavaScript in [`public/`](public/), with no build step. To run it with the included dev server:

```sh
npm install
npm run dev
```

Then open http://localhost:3002.

To run the tests:

```sh
npm test
```

To see how much of the code the tests run:

```sh
npm run coverage
```

It prints a table, and writes a page you can click through at `coverage/index.html`.

## Adding a game

1. Add an entry to [`public/games.js`](public/games.js). The comment at the top says what each field is for.
2. Add its cartridge picture as `public/art/<id>.svg`, 120 × 76.
3. Add a link to it in the `<noscript>` list in `public/index.html`.

The tests check each entry: every field is filled in, the link is a full `https://` address, the screen color is dark enough for white text, the picture exists, and the game is in the `<noscript>` list.

## How the code is organized

- `public/index.html`: the page: marquee sign, arcade cabinet, shelf.
- `public/games.js`: the list of games, in shelf order.
- `public/arcade.js`: fills the shelf from the list and loads the picked game into the screen.
- `public/art/`: one cartridge picture per game.
- `public/styles.css`: one stylesheet, in sections: marquee, cabinet, shelf, footer.
- `public/share.png`: the 1200 × 630 picture that shows when the link is shared in a text or a chat. If the shelf changes a lot, it's worth remaking.
- `public/apple-touch-icon.png`: the 180 × 180 icon an iPhone or iPad uses when the arcade is added to the home screen. It's the tab icon (`favicon.svg`) scaled up on the page's night background, with no see-through parts.
- `public/sitemap.xml`: every page, for search engines.

Pushing to `main` runs the tests, then publishes `public/` to GitHub Pages if they pass (`.github/workflows/pages.yml`).

## Fonts

Bungee and Fredoka, both under the SIL Open Font License. The license files are in [`public/fonts/`](public/fonts/).

## Credits

Made by Jessica Sogge.
