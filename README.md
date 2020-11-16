# Crypto Currency tracker / saga-exercise

## Overview

Track crytocurrencies in real time. Exercise with redux sagas.

API: <https://min-api.cryptocompare.com/>
SPECIFICATION: [./SPECIFICATION.md](./SPECIFICATION.md)
DEMO: <https://crypto-tracker-delta.vercel.app>

## Stack

- vite
- react
- redux
- redux-tolkit
- redux-sagas
- styled-components
- axios

## Usage

```bash
  yarn install

  yarn dev

  yarn build

```

## Comments

### vite

- Wanted to use vite & esbuild for dev :)
- Plaintext api token - for some reason vite does not load .env?

### ad specification

- Bare-metal styled-components for training purposes - some ui lib would be nicer
- Refreshing all widgets together, because it's more efficient
- Loading state only after adding new widget, I do not see point of wall of spinners
- Refresh every 10 seconds (because that's best api can do)

### not perfect

- Not sure about redux-saga conventions (it's kind of custom here)
- Error handling could probably use some more love
- Searchable select with `react-select` because it's a lot of work to build custom select
