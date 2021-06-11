<template>
  <div class="basicLayout">
    <div class="header"></div>
    <div class="container">
      <div class="aside"></div>
      <div class="main">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import A from './a.vue'
export default {
  components: {A},
}
</script>