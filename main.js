import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'

import  PubFuc from './common/js/util.js'
Vue.config.$pubFuc = PubFuc
//挂载
Vue.prototype.$imgSuffix = '?imageView&thumbnail=369x0&quality=75&tostatic=0';
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif


// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif