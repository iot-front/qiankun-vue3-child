import { afRequest } from './api';
// 获取城市区域
export const apiGetRegion = (params) => {
	return afRequest('get', '/openServerInf/oneCode/afterSales/getCityList', params);
};