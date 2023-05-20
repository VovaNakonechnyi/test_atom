import { boot } from 'quasar/wrappers';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';

export default boot(({ app }) => {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
  app.use(ElementPlus);
});
