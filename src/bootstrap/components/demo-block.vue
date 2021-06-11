<template>
  <div class="demo-block">
    <div class="demo-block-example">示例</div>
    <div class="demo-block-code">
      <slot />
    </div>
    <div class="demo-block-footer">显示/隐藏</div>
  </div>
</template>
<script>
export default {
  name: 'demo-block',
}
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
    @size: 36px;
    height: @size;
    line-height: @size;
    text-align: center;
  }
}
</style>