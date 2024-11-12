import { haigeekRequest } from 'haigeek-axios';
import { loading } from 'haier-methods';
import { Message } from 'element-plus';
const env = process.env.NODE_ENV;
export const baseapi = env === 'development' ? '/apitest' : '';
/**
 * @description: 查询某一时刻状态数据信息
 * @param {method} method 请求方式
 * @param {path} path 请求路径
 * @param {params} params 参数
 * @param {headers} headers 请求头
 */
export const afRequest = (method, path, params, headers, other,  basepath=baseapi) => {
  if (path.indexOf('http://') === 0 || path.indexOf('https://') === 0) {
    basepath = '';
  }
  return haigeekRequest(
    method,
    basepath + path,
    params,
    {
      hgAppId: '',
      hgAppKey: '',
      hgUrlPrefix: basepath,
      hgSuccessCodeKey: 'retCode', // 默认retCode，可不传
      hgSuccessCode: 200, // 默认00000，可不传
      hgErrorMsgKey: 'retInfo', // 默认retInfo，可不传
      hgEncryptLevel: '0', // 默认0，可不传
			hgLoginCode: '403',
      hgLoading: true,
      hgAutoError: '1',
			fnShowError: fnShowError,
			fnStartLoading: fnStartLoading,
			fnEndLoading: fnEndLoading,
			fnLogin: fnLogin
    },
    headers,
		other
  );
}
const fnStartLoading = () => {
	loading.start();
};
const fnEndLoading = () => {
  loading.end();
};
const fnShowError = (msg) => {
  if (msg) {
		Message.error(msg);
	}
};
const fnLogin = () => {
  // 登录
}
