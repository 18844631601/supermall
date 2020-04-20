import Toast from './Toast'

const obj = {}

obj.install = function (Vue) {
    // 创建组件构造器
    const toastConstructor = Vue.extend(Toast)

    //创建组件构造器实例
    const toast = new toastConstructor()

    //组件挂在到节点
    toast.$mount(document.createElement('div'))

    //节点挂载到网页
    document.body.appendChild(toast.$el)

    //节点挂载到Vue原型
    Vue.prototype.$toast = toast
}

export default obj

