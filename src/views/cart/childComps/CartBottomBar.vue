<template>
    <div class="bottom-bar">
        <div class="check-content">
            <check-button :is-checked="isSelectAll" @click.native="checkClick" class="check-button"/>
            <span>全选</span>
        </div>
        <div class="total-price">
            合计：{{totalPrice}}
        </div>
        <div class="totalCheck" @click="toBuy">
            <span>去计算({{totalCheck}})</span>
        </div>
    </div>
</template>

<script>
    import CheckButton from 'components/content/checkButton/CheckButton'

    import {mapGetters} from "vuex";

    export default {
        name: "CartBottomBar",
        components: {
            CheckButton
        },
        computed: {
            ...mapGetters(['cartList']),
            totalPrice() {
                return '¥' + this.cartList.filter(item => {
                    return item.checked
                }).reduce((preValue, item) => {
                    return preValue + item.price * item.count
                }, 0)
            },
            totalCheck() {
                return this.cartList.filter(item => item.checked).length
            },
            isSelectAll() {
                if (this.cartList.length === 0)
                    return false
                return !this.cartList.find(item => !item.checked)
            }
        },
        methods: {
            checkClick() {
                if (this.isSelectAll)
                    this.cartList.forEach(item => item.checked = false);
                else
                    this.cartList.forEach(item => item.checked = true)
            },
            toBuy(){
                // if(!this.isSelectAll)
                    this.$toast.show("请选择要购买的商品")
            }
        }
    }
</script>

<style scoped>
    .bottom-bar {
        height: 40px;
        width: 100vw;
        background: #f2f2f2;
        position: fixed;
        bottom: 49px;
        display: flex;
        line-height: 40px;
    }

    .check-content {
        display: flex;
        align-items: center;
        margin-left: 10px;
    }

    .check-button {
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-right: 5px;
    }

    .check-content, .total-price {
        width: 80px;
        margin: auto 10px;
    }

    .total-price {
        flex: 1;
        text-align: center;
    }

    .totalCheck {
        font-size: 14px;
        color: #fff;
        background: var(--color-high-text);
        width: 90px;
        text-align: center;
    }
</style>