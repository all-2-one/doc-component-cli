<template>
  <div class="menus">
    <div class="menu" v-for="route in routes" :key="route.path">
      <router-link :to="route.path">{{ route.name }}</router-link>
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
export default {
  name: 'XMenu',
  setup() {
    const router = useRouter()
    const { routes } = router.options
    console.log(routes[0].children)
    return { routes: routes[0].children }
  },
}
</script>
<style lang="less">
@active-color: #2e8def;
.menus {
  padding-left: 36px;
  box-sizing: border-box;
  .menu {
    @size: 36px;
    height: @size;
    line-height: @size;
    a {
      text-decoration: none;
      color: #333;
      &:hover {
        color: @active-color;
      }
      &.router-link-exact-active {
        color: @active-color;
      }
    }
  }
}
</style>