declare module 'palx' {
  export type ColorTuple = [
    s000: string,
    s100: string,
    s200: string,
    s300: string,
    s400: string,
    s500: string,
    s600: string,
    s700: string,
    s800: string,
    s900: string,
  ]

  export interface PalxPalette {
    base: string
    black: string
    blue: ColorTuple
    cyan: ColorTuple
    fuschia: ColorTuple
    gray: ColorTuple
    green: ColorTuple
    indigo: ColorTuple
    lime: ColorTuple
    orange: ColorTuple
    pink: ColorTuple
    red: ColorTuple
    teal: ColorTuple
    violet: ColorTuple
    yellow: ColorTuple
  }

  declare function palx(hex: string, options?: any): palx.PalxPalette

  export = palx
}
