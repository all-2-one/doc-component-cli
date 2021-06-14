<template>
  <div class="demo-block">
    <div class="demo-block-example">
      <slot name="example" />
    </div>
    <div class="demo-block-code" v-if="visible">
      <slot name="default" />
    </div>
    <div class="demo-block-footer" @click="toggle">{{visible? '隐藏' :'显示'}}代码</div>
  </div>
</template>
<script lang='ts'>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'demo-block',
  setup() {
    const visible = ref(false)
    return {
      visible,
      toggle: () => {
        visible.value = !visible.value
      },
    }
  },
})
</script>
<style lang='less'>
.demo-block {
  border: 1px solid #ddd;
  box-sizing: border-box;
  margin-bottom: 24px;
  &-example {
    padding: 12px;
    box-sizing: border-box;
  }
  &-code {
    pre {
      margin: 0;
    }
  }

  &-footer {
    border-top: 1px solid #ddd;
    @size: 36px;
    height: @size;
    line-height: @size;
    text-align: center;
  }
}
</style>