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
			value = value.replace("yyyy",date.getFullYear());
			value = value.replace("yy",t(date.getFullYear().toString().substr(2)));
			value = value.replace("MM",t(date.getMonth()));
			value = value.replace("dd",t(date.getDate()));
			value = value.replace("hh",t(date.getHours()));
			value = value.replace("mm",t(date.getMinutes()));
			value = value.replace("ss",t(date.getSeconds()));
			value = value.replace("ms",date.getMilliseconds());
			return value;
		}
		return value.ToString("yyyy-MM-dd hh:mm:ss")
	}
}

export default PubFuc
