import {ADD_COUNTER, ADD_TO_CART} from "./mutation-types";

export default {
    addToCart(context, payload) {
        return new Promise((resolve, reject) => {
            let oldProduce = context.state.cartList.find(item => item.iid === payload.iid)
            if (oldProduce) {
                context.commit(ADD_COUNTER, oldProduce)
                resolve('当前商品数量+1')
            } else {
                payload.count = 1;
                context.commit(ADD_TO_CART, payload)
                resolve('商品加购成功')
            }
        })
    }
}