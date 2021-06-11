import hljs from 'highlight.js'
import { hljsDefineVue } from './language-vue'

const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

md.use(require('markdown-it-highlightjs'))
hljs.registerLanguage('vue', hljsDefineVue)

module.exports = function (source) {
  const demoCodes = source.match(/```vue[^`]+```/g)

  const components = []
  if (demoCodes) {
    demoCodes.forEach(code => {
      code = code.replace(/```vue/g, '')
        .replace(/```/g, '')
        .replace(/\/n/g, '')
      components.push({
        id: 'v-' + code.length,
        code
      })
    })
  }

  const html = md.render(source);

  const codes = []

  let index = 0;
  const splitString = '<pre><code class="hljs language-vue">'
  html.split(splitString).forEach(code => {
    if (code.indexOf('</code></pre>') === -1) {
      codes.push(code)
    } else {
      codes.push(`<demo-block>`)
      codes.push(`<${components[index].id}/>`)
      codes.push(splitString)
      codes.push(code)
      codes.push(`</demo-block>`)
      index += 1
    }
  })

  return {
    code: `
    <template>${codes.join('')}</template>
    <script>
      export default {}
    </script>
    `,
    demoCodes: components
  }
}