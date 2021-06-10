import { createApp } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import App from './App.vue';
import getRouter from './router';

export interface Modules { [x: string]: Promise<any>; }

export default function (modules: Modules) {
  const contextRouter = Object.keys(modules).map(key => {
    return {
      path: '/demo/button',
      name: 'button',
      component: modules[key]
    };
  }) as RouteRecordRaw[];

  const app = createApp(App);
  app.use(getRouter(contextRouter));
  app.mount('#app');

  return app;
}
