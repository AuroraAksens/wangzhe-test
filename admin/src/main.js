import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import http from './http'
import './style.css'

Vue.config.productionTip = false
Vue.prototype.$http = http


//给vue的原型中（全局）定义一个方法或者数据，在任何地方都可以调用
Vue.mixin({
  methods:{
    uploadAuth(){
      return{
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
