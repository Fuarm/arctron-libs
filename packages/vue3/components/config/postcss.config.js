import path from 'path'
import postcssImport from 'postcss-import'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import tailwindConfig from './tailwind.config.js'

export default {
  plugins: [
    postcssImport(),
    tailwindcss({
      config: tailwindConfig
    }),
    autoprefixer(),
    cssnano()
  ],
  extract: path.resolve('lib/index.css'),
}
