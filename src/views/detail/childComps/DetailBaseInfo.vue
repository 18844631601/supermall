<template>
    <div v-if="Object.keys(good).length !== 0" class="detail-base-info">
        <div class="title">{{good.title}}</div>
        <div class="price">
            <span class="n-price">{{good.nowPrice}}</span>
            <span class="o-price">{{good.oldPrice}}</span>
            <span class="price-tag" :style="{
                    background: good.priceTagBgColor,
                    color: good.priceTagTextColor
                }">{{good.priceTag}}</span>
        </div>
        <div class="info">
            <span>销售 {{good.sales}}</span>
            <span>收藏{{good.cFav}}人</span>
            <span>{{good.services[good.services.length-1].name}}</span>
        </div>
        <div class="services">
            <span class="services-item" v-for="index in good.services.length-1">
                <img :src="good.services[index-1].icon" alt="">
                <span>{{good.services[index-1].name}}</span>
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DetailBaseInfo",
        props: {
            good: Object,
            default() {
                return {}
            }
        },
    }
</script>

<style scoped>
    .detail-base-info {
        margin-top: 15px;
        padding: 0 8px;
        color: #999;
        border-bottom: 5px solid #f2f5f8;
    }

    .title {
        color: #222
    }

    .price {
        margin-top: 10px;
    }

    .price .n-price {
        font-size: 24px;
        color: var(--color-high-text);
    }

    .price .o-price {
        font-size: 13px;
        margin-left: 5px;
        text-decoration: line-through;
    }

    .price .price-tag {
        font-size: 12px;
        padding: 2px 5px;
        /*color: #fff;*/
        /*background-color: var(--color-high-text);*/
        border-radius: 8px;
        margin-left: 5px;

        /*让元素上浮一些: 使用相对定位即可*/
        position: relative;
        top: -8px;
    }

    .info {
        margin-top: 15px;
        line-height: 30px;
        display: flex;
        font-size: 13px;
        border-bottom: 1px solid rgba(100, 100, 100, .1);
        justify-content: space-between;
    }

    /*.services {*/
    /*display: flex;*/
    /*justify-content: space-between;*/
    /*line-height: 60px;*/
    /*}*/
    .services{
        height: 76px;
        line-height: 20px;
        text-align: center;
        padding: 13px 2px;
    }

    .services-item {
        height: 24px;
        line-height: 24px;
        margin-right: 16px;
    }

    .services-item img {
        width: 14px;
        height: 14px;
        position: relative;
        top: 2px;
    }

    .services-item span {
        font-size: 13px;
        color: #333;
    }
</style>
