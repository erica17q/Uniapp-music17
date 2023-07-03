import request from '@/utils/request/index.js'
// test200封装成Promise对象
// 暴露方法
export function test200(data) {
	return request.request({
		url: '/get200',
		method: 'POST',
		data: data,
		authType: 'None'
	})
}
