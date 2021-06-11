import { createApp } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import App from './App.vue';
import getRouter from './router';
import DemoBlock from './components/demo-block.vue';

import 'highlight.js/styles/monokai.css';

export interface Modules { [x: string]: Promise<any>; }

export default function (modules: Modules) {
  const contextRouter: RouteRecordRaw[] = [];
  Object.keys(modules).forEach(key => {
    const componentName = key.match(/\.\/packages\/(.*)\/readme.md/);
    if (!componentName) {
      return;
    }
    const [, name] = componentName;
    contextRouter.push({
      path: `/demo/${name}`,
      name,
      component: modules[key]
    });
  });

  const app = createApp(App);
  app.use(getRouter(contextRouter));
  app.mount('#app');
  app.component(DemoBlock.name, DemoBlock);

  return app;
}
