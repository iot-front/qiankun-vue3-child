import { useMainStore } from '@/pinia/index';
import { useRouter } from 'vue-router';
/**
 * @description: 
 * @param {method} method 请求方式
 * @param {path} path 请求路径
 * @param {params} params 参数
 * @param {headers} headers 请求头
 */
export const afRequest = (method, path, params, headers, other, basepath=useMainStore().baseDataUrl) => {
  return window.qkDssRequest(method, path, {
    hgSuccessCode: '1000', 
    hgLoginCode: '10401',
    ...params
  }, headers, other, basepath)
}
let router = null;
if (useMainStore().pageType === 'HAIER_DATA') {
  router = window.fnqkDssRouter
} else {
  router = useRouter()
}
export {
  router
}