import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router/index';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import en from 'element-plus/es/locale/lang/en';
import 'element-plus/dist/index.css';
import haieruiPlus from 'haierui-plus';
import '@/assets/css/base.css';
import { useMainStore } from '@/pinia/index';
import i18n from './locales';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
// 加载语言
async function loadLanguagePack(locale) {
  try {
    const { loadLocaleMessages } = await import('@/locales');
    const messages = await loadLocaleMessages(locale);
    
    // Vue 3 中使用 setLocaleMessage
    i18n.global.setLocaleMessage(locale, messages);
    return true;
  } catch (error) {
    console.error('加载语言包失败:', error)
    return false
  }
}
// qiankun
let instance = null;
/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
function render(props = {}) {
  const { container, locale, registerApp } = props;
  instance = createApp(App)
  instance.use(pinia);
  useMainStore().locale = locale;
  // 设置初始语言
  if (locale && i18n.global.locale.value !== locale) {
    i18n.global.locale.value = locale
    loadLanguagePack(locale)
  }
  // element
  const localeMap = {
    zh: zhCn,
    en: en
  };
  // 注册到主应用-用于后面切换语言
  if (registerApp) {
    registerApp({
      onLocaleChange: async (newLocale) => {
        useMainStore().locale = props.locale
        if (i18n.locale === newLocale) return;
        // 加载新语言包
        await loadLanguagePack(newLocale);
        // 更新 i18n 实例
        i18n.global.locale.value = newLocale;
        // 触发视图更新
        if (instance) {
          instance.config.globalProperties.$forceUpdate?.();
        }
        return true;
      }
    })
  }
  instance
    .use(ElementPlus,{locale: localeMap[i18n.global.locale.value]})
    .use(haieruiPlus, {
      locale: i18n.global.locale.value
    })
    .use(router)
    .use(i18n)
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
  render(props)
  useMainStore().setMainStore(props.mainStore)
  useMainStore().pageType = props.pageType
  useMainStore().baseDataUrl = props.baseDataUrl
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