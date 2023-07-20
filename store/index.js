const store = new Vuex.store({
	state:{
		message:{} //角标信息
	},
	mutations: {
		storeMessage(state, payload){ //角标信息
			state.message = { ...state.message, ...payload}
		}
	}
})

export default store