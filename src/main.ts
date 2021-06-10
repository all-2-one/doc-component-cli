import bootstrap, { Modules } from './bootstrap/bootstrap';

const modules = import.meta.glob('./packages/**/readme.md');
bootstrap(modules as any as Modules);