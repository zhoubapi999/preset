const fs = require('fs')

// 默认是unocss
let source = 'unocss'

export default function uniTwuCssPlugin(options) {
  let outDir = ''

  if (options) {
    source = options.source
  }

  return {
    // 插件名称
    name: 'vite:uni-twucss',
    apply: 'build',

    config(config, mode) {
      if (mode.command === 'build') {
        outDir = config.build.outDir
      }
    },

    transform(code) {
      code = code.replace(/<!--.*?-->/gms, '')
    },

    writeBundle(options, bundle) {
      const files = Object.keys(bundle)

      if (outDir.includes('mp-weixin') || outDir.includes('mp-qq')) {
        let cssFiles = null
        if (outDir.includes('mp-weixin')) {
          cssFiles = files.filter(i => i.endsWith('.wxss'))
        }

        if (outDir.includes('mp-qq')) {
          cssFiles = files.filter(i => i.endsWith('.qss'))
        }

        if (!cssFiles.length) return

        for (const file of cssFiles) {
          const bundleChunk = bundle[file]
          const currentFile = outDir + '/' + bundleChunk.fileName

          if (bundleChunk.type === 'asset' && typeof bundleChunk.source === 'string') {
            bundleChunk.source = updateWXCss(bundleChunk.source)
            fs.writeFile(currentFile, bundleChunk.source, errWF => {
              if (errWF) {
                console.log(errWF)
              }
            })
          }
        }
      }
    },
  }
}

function updateWXCss(css) {
  // 解决*
  css = css.replace(/\*,/g, ':not,')
  css = css.replace(/\*\s*{/g, ':not{')

  return css
}
