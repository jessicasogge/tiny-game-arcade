# Tiny Game Arcade

A shelf full of silly browser games. One page that links to every game: pick a cartridge off the shelf, it loads into the arcade cabinet's screen, and Press Start opens the game.

On the shelf now:

- **[PetriPals](https://jessicasogge.github.io/petripals/):** pick a bacterium, grow your colony, dodge antibiotics and race rival microbes.
- **[Build a Rainbow](https://jessicasogge.github.io/build-a-rainbow/):** eight rainbow color games for young kids.

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

## Adding a game

1. Add an entry to [`public/games.js`](public/games.js). The comment at the top says what each field is for.
2. Add its cartridge picture as `public/art/<id>.svg`, 120 × 76.
3. Add a link to it in the `<noscript>` list in `public/index.html`.

The tests check each entry: every field is filled in, the link is a full `https://` address, the screen color is dark enough for white text, the picture exists, and the game is in the `<noscript>` list.

Blank "next game goes here" cartridges fill out the last row of the shelf on their own.

## How the code is organized

- `public/index.html`: the page: marquee sign, arcade cabinet, shelf.
- `public/games.js`: the list of games, in shelf order.
- `public/arcade.js`: fills the shelf from the list and loads the picked game into the screen.
- `public/art/`: one cartridge picture per game, plus `blank.svg`.
- `public/styles.css`: one stylesheet, in sections: marquee, cabinet, shelf, footer.
- `public/share.png`: the 1200 × 630 picture that shows when the link is shared in a text or a chat. If the shelf changes a lot, it's worth remaking.
- `public/sitemap.xml`: every page, for search engines.

Pushing to `main` publishes `public/` to GitHub Pages (`.github/workflows/pages.yml`).

## Fonts

Bungee and Fredoka, both under the SIL Open Font License. The license files are in [`public/fonts/`](public/fonts/).

## Credits

Made by Jessica Sogge.
