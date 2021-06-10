import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw
} from 'vue-router';
import Home from '../views/Home.vue'
import BasicLayout from '../layout/BasicLayout.vue';

export default (contextRoutes: RouteRecordRaw[]) => {
  const routes: Array<RouteRecordRaw> = [
    {
      path: '/',
      component: BasicLayout,
      children: [
        {
          path: '/',
          name: 'Home',
          component: Home
        },
        ...contextRoutes
      ]
    }
  ];

  return createRouter({
    history: createWebHashHistory(),
    routes
  })
}
