import reactPlugin from 'vite-plugin-react'

const mode = process.env.APP_ENV // This now exists.

/**
 * @type { import('vite').UserConfig }
 */
const config = {
  mode: mode,
  jsx: 'react',
  plugins: [reactPlugin],
}

export default config
