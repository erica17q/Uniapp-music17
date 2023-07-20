const PubFuc = {
	/*  toString 将一个对象转换为字符串表示。
		parseInt 用于将字符串解析为整数。
		substring(startIndex, endIndex) 会返回一个新的字符串，其中包含提取的子字符串部分。结束索引（可选）左闭右开
		substr(startIndex, endIndex) 同上 提取的子字符串部分 结束索引（可选）左闭右开
		slice(startIndex, endIndex) 用于从一个字符串中提取指定范围的子字符串。结束索引（可选）左闭右开
		与 substr() 方法不同，slice() 方法不接受负值的索引。如果指定的索引为负数，或者第一个参数大于第二个参数，slice() 方法将返回一个空字符串。
	*/
	// 格式化时间戳 
	formatTime: (value) => {
		var value = String(value);

		function t(V) {
			return V = V < 10 ? ("0" + V) : V;
		}
		String.prototype.ToString = function(value) {
			var date = new Date(parseInt(this.substring(6, this.length - 2)));
			value = value.replace("yyyy", date.getFullYear());
			value = value.replace("yy", t(date.getFullYear().toString().substr(2)));
			value = value.replace("MM", t(date.getMonth()));
			value = value.replace("dd", t(date.getDate()));
			value = value.replace("hh", t(date.getHours()));
			value = value.replace("mm", t(date.getMinutes()));
			value = value.replace("ss", t(date.getSeconds()));
			value = value.replace("ms", date.getMilliseconds());
			return value;
		}
		return value.ToString("yyyy-MM-dd hh:mm:ss")
	},

	// 设置角标
	setTabBarBadge(page) {
		// 设置 store 红点信息
		const accountMsg = store.state.message.account || 6
		const newMsg = store.state.message.newMsg || []
		// 设置newZMsg数组的索引3的位置为0，数组长度是4，第四个元素的值为0，其余元素值为undifined
		newMsg[page] = 0

		const TempMsg = {
			account: page == 4 ? 0 : accountMsg,
			newMsg
		}

		store.commit('storeMessage', TempMsg)

		// 获取 store 红点信息
		const accountMsgNew = store.state.message.sccount
		const newMsgNew = store.state.message.newMsg || []

		if (accountMsgNew > 0) { //如果有账号信息
			setTimeout(() => {
				// uni.setTabBarBadge 这个API 在非tabbar 页面上调用会失效
				uni.setTabBarBadge({
					inex: 4,
					text: String(accountMsgNew)
				})
			})

		} else {
			setTimeout(() => {
				// 删除角标
				uni.removeTabBarBadge({
					index: 0,
				})
			})
		}

		newMsgNew.forEach((item, index) => { // 设置红点
			if (item > 0) {
				uni.showTabBarRedDot({
					index
				})
			} else {
				uni.hideTabBarRedDot({
					index
				})
			}
		})
	}
}

export default PubFuc