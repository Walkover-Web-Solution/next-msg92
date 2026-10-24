// Lets `node --test` resolve the `@/` import alias (jsconfig.json) to src/.
import { register } from 'node:module';

register('./alias-loader.mjs', import.meta.url);
