import {ADD_COUNTER, ADD_TO_CART} from "./mutation-types";

export default {
    //mutations设计原则，尽可能完成的事件比较单一，修改state状态，方便vue工具监测数据
    [ADD_COUNTER](state, payload){
        payload.count++
    },
    [ADD_TO_CART](state, payload) {
        payload.checked = true
        state.cartList.push(payload)
    }
}