import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import Toast from "components/common/toast"
import FastClick from "fastclick"
import VueLazyLoad from "vue-lazyload"

Vue.config.productionTip = false

//空组件，用作事件总线
Vue.prototype.$bus = new Vue()

//安装Toast插件
Vue.use(Toast)

//解决移动端300ms延迟
FastClick.attach(document.body)

//使用图片懒加载
Vue.use(VueLazyLoad, {
    loading: require("./assets/img/common/placeholder.png")
})

new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app')
