import XButton from './packages/Button/src'
import bootstrap, { Modules } from './bootstrap/bootstrap';

const modules = import.meta.glob('./packages/**/readme.md');
const app = bootstrap(modules as any as Modules);

app.component(XButton.name, XButton);