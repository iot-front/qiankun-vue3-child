import { afRequest } from './api';
const baseapi = '/bigdata-databack-logquery-rest';
// 测试
export const apiSearchIndustryDesc = () => {
	return afRequest('post', `${baseapi}/app/query`, {});
};