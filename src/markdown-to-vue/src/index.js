const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

function generateCode(html) {
  return `<template>
  <div>11</div></template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({});</script><style></style>
  `
  // return `<template>
  // <div>${html.replace(/\n/g, '')}</div>
  // </template>`
}

export default function mdToVue() {
  return {
    name: 'markdown-to-vue',
    transform(source, id) {
      if (id.indexOf('.vue') > -1) {
        // console.log(typeof source)
      }
      if (id.indexOf('readme.md') > -1) {
        const html = md.render(source);
        const code = generateCode(html)
        console.log(code)
        // console.log(code)

        // return {
        //   code,
        //   map: null
        // }
        return {
          code,
          map: null
        }
      }
    }
  }
}