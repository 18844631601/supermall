<template>
    <div class="bottom-bar">
        <div class="bar-item bar-left">
            <div>
                <div class="icon service"></div>
                <span class="text">客服</span>
            </div>
            <div>
                <div class="icon shop"></div>
                <span class="text">店铺</span>
            </div>
            <div>
                <div class="icon select"></div>
                <span class="text">收藏</span>
            </div>
        </div>
        <div class="bar-item bar-right">
            <div class="cart" @click="addToCart">加入购物车</div>
            <div class="buy">购买</div>
        </div>
        <!--<sport-ball ref="ball" class="sport-ball"></sport-ball>-->
    </div>
</template>

<script>
    export default {
        name: "DetailBottomBar",
        data() {
            return {}
        },
        methods: {
            addToCart() {
                this.$emit('addToCart')
            }
        }
    }
</script>

<style scoped>
    .bottom-bar {
        width: 100%;
        height: 49px;
        background: #fff;
        position: absolute;
        bottom: 0;
        display: flex;
        text-align: center;
    }

    .bar-item {
        display: flex;
        flex: 1;
    }

    .bar-item > div {
        border-right: 1px solid #ededed;
        border-top: 1px solid #ededed;
        flex: 1;
    }

    .bar-left .text {
        font-size: 13px;
    }

    .bar-left .icon {
        display: block;
        width: 22px;
        height: 22px;
        margin: 6px auto 0;
        background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
    }

    .bar-left .service {
        background-position: 0 -54px;
    }

    .bar-left .shop {
        background-position: 0 -98px;
    }

    .bar-right {
        font-size: 15px;
        color: #fff;
        line-height: 49px;
    }

    .bar-right .cart {
        background: #ffe817;
        color: #333;
    }

    .bar-right .buy {
        background: #f69;
    }
</style>