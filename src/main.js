import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index';
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { useMainStore } from '@/pinia/index'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
// 加载所有插件
// qiankun
let instance = null;
/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
function render(props = {}) {
  let { container } = props
  instance = createApp(App)
    .use(pinia)
    .use(ElementPlus)
    .use(router)
    .mount(container ? container.querySelector('#child-app') : '#child-app')
}
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
if (!window.__POWERED_BY_QIANKUN__) {
	render();
}
export async function bootstrap() {
}
export async function mount(props = {}) {
  render()
  useMainStore().setMainStore(props.mainStore)
  useMainStore().pageType = props.pageType
}
/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount() {
  instance.$unmount()
  instance = null;
}
/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {
  console.log('update props', props)
}