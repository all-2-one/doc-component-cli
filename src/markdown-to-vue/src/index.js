const generateCode = require('./generate')
const cacheDemos = require('./map')
const path = require('path')

export default function mdToVue() {
  return {
    name: 'markdown-to-vue',
    configResolved(resolvedConfig = {}) {
      config = resolvedConfig
    },
    resolveId(id) {
      if (id.indexOf('vd') > -1) {
        const idPath = id.startsWith(config.root + '/') ? id : path.join(config.root, id.substr(1))
        return idPath
      }
    },
    transform(source, id) {
      if (id.indexOf('readme.md') > -1) {
        const filePath = id.startsWith(config.root + '/') ? id : path.join(config.root, id.substr(1))
        const { code, demoCodes } = generateCode(source, filePath)
        demoCodes.forEach(demoCode => {
          cacheDemos.set(demoCode.id, demoCode.code)
        })

        return {
          code,
          map: null
        }
      }
    },
    load(id) {
      if (id.indexOf('.vd') > -1) {
        const arr = id.split('.')
        const vd = arr[arr.length - 2]
        return decodeURI(cacheDemos.get(vd))
      }
    }
  }
}