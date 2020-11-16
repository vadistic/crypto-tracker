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

### on build

- Wanted to try out vite & esbuild for dev :)
- For some reason vite does not load .env - so token is in plaintext :(

### on specification

- Basic/ bare-metal styled-components for practice - some ui lib would be way nicer
- Fetching all widget data together - it's more efficient
- Loading spinner only after adding new widget - I do not see point of wall of spinners
- Refresh every 10 seconds (that's the cache-control on cryptocompare API)

### on further improvements

- Not sure about redux-saga conventions - so I did it a bit thunk-style
- Error handling could use some more love
- Select with `react-select` - it's a lot of work to build custom select
- Need to learn how to test sagas
