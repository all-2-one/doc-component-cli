const generateCode = require('./generate')

export default function mdToVue() {
  return {
    name: 'markdown-to-vue',
    transform(source, id) {
      if (id.indexOf('readme.md') > -1) {
        const { code } = generateCode(source)

        return {
          code,
          map: null
        }
      }
    },
    load(id) {
      console.log(id)
    }
  }
}