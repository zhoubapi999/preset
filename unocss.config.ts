import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'
import { times } from 'lodash'
import path from 'path'

export default defineConfig({
  theme: {
    spacing: [
      ...['none', 'xs', 'sm', 'DEFAULT', 'lg', 'xl'],
      ...times(8).map(n => n + 2 + 'xl'),
    ].reduce((o, k, i) => {
      if (process.env.UNI_PLATFORM?.startsWith('mp')) o[k] = (i * 10).toFixed(2) + 'rpx'
      else o[k] = (i / 3.2).toFixed(2) + 'rem'
      return o
    }, {}),
  },
  presets: [presetUno(), presetAttributify(), presetIcons()],
  shortcuts: {
    'flex-center': 'flex flex-row justify-center items-center',
    'flex-center-col': 'flex flex-col justify-center items-center',
    'fixed-bottom': 'fixed bottom-0 left-0 right-0',
  },
  include: [path.resolve(__dirname, 'src', '**')],
})
