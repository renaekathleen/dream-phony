# Dream Phony

A phone app that replaces the electronic handset from the classic board game *Electronic Dream Phone* by Milton Bradley (1991). Run it on your Android phone and use it with the original game board and cards — or generate your own custom set.

## What is this?

*Electronic Dream Phone* is a deduction board game where players dial phone numbers to receive clues about a secret admirer. The physical handset plays recorded audio responses through an earpiece or speakerphone.

**Dream Phony** is a drop-in replacement for that handset. It generates text-to-speech clues, plays DTMF tones when you press buttons, and routes audio through the earpiece or speaker — just like the original. It also supports custom data sets so you can create your own themed versions of the game.

## Project structure

```
dream-phony/
├── src/                  React Native (Expo) phone app
│   ├── game/             Game engine, data sets, types
│   ├── components/       UI components (keypad, display, etc.)
│   ├── hooks/            Game state management
│   └── utils/            TTS, audio routing, DTMF tones
├── cardgen/              Vite + React web app (card/board generator)
│   └── src/
└── assets/               App icons and splash screens
```

## Phone app

The phone app is built with React Native + Expo + TypeScript. It runs on Android via Expo Go (for development) or as a standalone APK.

### Running in development

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go on your Android phone, or press `a` to open in the Android emulator.

### Building an APK

```bash
npx eas build -p android --profile preview
```

### Data sets

Two data sets are included:

- **`data.ts`** — A gender-inclusive set with 24 characters using they/them pronouns, original locations, and updated activities/foods/clothing.
- **`data.old.ts`** — The classic set matching the original 1991 game board exactly. Use this when your original Dream Phone handset has stopped working but you still have the board and cards.

To switch data sets, change the import path in `src/game/engine.ts` and `src/hooks/useGameEngine.ts`.

Each data set configures its own pronouns (he/him, she/her, they/them, etc.) which automatically flow through all spoken clue templates.

### Creating a custom data set

Copy `data.ts` as a template. A valid data set requires:

- Exactly 6 locations, 6 activities, 6 foods, and 6 clothing items
- Exactly 24 admirers (4 per location)
- The first 12 admirers have a food trait (activity = null)
- The last 12 admirers have an activity trait (food = null)
- Each admirer needs a unique 7-digit phone number and unique name
- A pronouns configuration for clue grammar

## Card generator

The `cardgen/` directory contains a separate web app for generating printable game materials from any data set. Use it to create boards, cards, and score sheets for custom data sets — or to replace worn-out components from the original game.

### Running the card generator

```bash
cd cardgen
npm install
npm run dev
```

### Building for deployment

```bash
cd cardgen
npm run build    # outputs static files to cardgen/dist/
```

The output can be deployed to any static hosting service (GitHub Pages, Netlify, Vercel, etc.).

### Features

- Load built-in presets or paste custom JSON data
- Full input validation and sanitization
- Printable game reference board organized by location
- Printable admirer cards (name + phone number) and special action cards
- Printable clue tracking score sheets

## Trademark notice

*Electronic Dream Phone* and *Dream Phone* are trademarks of Hasbro, Inc. This project is not affiliated with, endorsed by, or sponsored by Hasbro. "Dream Phony" is an independent open-source project.

The classic data set is provided so that owners of the original board game can continue to play when their original electronic handset is no longer functional.

## License

This project is open source. See [LICENSE](LICENSE) for details.
