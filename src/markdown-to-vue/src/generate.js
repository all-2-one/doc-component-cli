import hljs from 'highlight.js'
import { hljsDefineVue } from './language-vue'
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt({
  quotes: '\u201c\u201d\u2018\u2019',
});

function slash(path) {
  const isExtendedLengthPath = /^\\\\\?\\/.test(path);
  const hasNonAscii = /[^\u0000-\u0080]+/.test(path); // eslint-disable-line no-control-regex

  if (isExtendedLengthPath || hasNonAscii) {
    return path;
  }

  return path.replace(/\\/g, '/');
}

md.use(require('markdown-it-highlightjs'))
hljs.registerLanguage('vue', hljsDefineVue)

module.exports = function (source, filePath) {
  if (filePath.indexOf('.vd') > -1) {
    return {
      code: source,
      demoCodes: []
    }
  }

  const demoCodes = source.match(/```vue[^`]+```/g)

  const components = []
  if (demoCodes) {
    demoCodes.forEach(code => {
      code = code.replace(/```vue/g, '')
        .replace(/```/g, '')
        .replace(/\\n/g, '')
      components.push({
        id: 'v' + code.length,
        code: `${code}`
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
      codes.push(`<template v-slot:example>`)
      codes.push(`<${components[index].id} />`)
      codes.push(`</template>`)
      codes.push(splitString)

      if(code.indexOf('</code></pre>')===-1){
        codes.push(code)
        codes.push(`</demo-block>`)
      }else{
        const [end,other] = code.split('</code></pre>')
        codes.push(end)
        codes.push('</code></pre>')
        codes.push(`</demo-block>`)
        codes.push(other)
      }

      index += 1
    }
  })

  const importStr = components.map(demo => {
    const request = `${slash(filePath)}.${demo.id}.vd`
    return `import ${demo.id} from '${request}';`
  }).join('\n')
  const componentsStr = components.reduce((str, component, index) => {
    return `${str}${index === 0 ? '' : ','}${component.id}:${component.id}`
  }, '')

  return {
    code: `
    <template>${codes.join('')}</template>
    <script>
      ${importStr}
      export default {
        components:{
          ${componentsStr}
        }
      }
    </script>
    `,
    demoCodes: components
  }
}