<template>
  <div class="basicLayout">
    <div class="header">
      <div class="logo">此处是一个logo</div>
    </div>
    <div class="container">
      <div class="aside">
        <XMenu />
      </div>
      <div class="main">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
import XMenu from './Menu.vue'
export default defineComponent({
  name: 'BasicLayout',
  setup() {},
  components: { XMenu },
})
</script>
<style lang="less">
.basicLayout {
  height: 100v;
  display: flex;
  flex-direction: column;
  .header {
    height: 48px;
    padding-left: 24px;
    box-sizing: border-box;
    border-bottom: 1px solid #dcdfe6;
    .logo {
      line-height: 48px;
    }
  }
  .container {
    flex: 1;
    display: flex;
    .aside {
      width: 240px;
    }
    .main {
      flex: 1;
      padding: 12px 24px;
      box-sizing: border-box;
      overflow: hidden;
    }
  }
}
</style>