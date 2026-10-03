// Every game on the shelf, in shelf order. To add a game, add one entry here
// and put its cartridge picture in public/art/. The tests check each entry.
//
//   id       short name, lowercase with dashes; also the picture's file name
//   title    the game's name, as it shows on the cartridge and the screen
//   sub      a few words for the cartridge label
//   blurb    a sentence or two for the arcade screen
//   tags     two or three short labels
//   url      where the game lives (its full web address)
//   shell    the cartridge's plastic color
//   screen   the arcade screen's color while the game is loaded
//            (white text goes on it, so keep it dark enough to read)

export const GAMES = [
  {
    id: 'petripals',
    title: 'PetriPals',
    sub: 'Grow a colony of microbes',
    blurb: 'Pick a bacterium, grow your colony, dodge antibiotics and race rival microbes.',
    tags: ['Microbiology', 'Science', 'Bacteria'],
    url: 'https://jessicasogge.github.io/petripals/',
    shell: '#2EC4B6',
    screen: '#16706A',
  },
  {
    id: 'build-a-rainbow',
    title: 'Build a Rainbow',
    sub: 'Eight rainbow color games',
    blurb: 'Mix colors, build and paint rainbows, drive a rainbow road and more. Eight levels for young kids, all open from the start.',
    tags: ['Young kids', '8 levels', 'Colors'],
    url: 'https://jessicasogge.github.io/build-a-rainbow/',
    shell: '#FFC93C',
    screen: '#2F5FB8',
  },
];
