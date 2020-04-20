<template>
    <div class="detailNavBar">
        <nav-bar class="">
            <div slot="left" class="back" @click="backClick">
                <img src="~assets/img/common/back.svg" alt="">
            </div>
            <div slot="center" class="title">
                <div v-for="(item,index) in titles" class="title-item" :class="{active: index === currentIndex}" @click="itemClick(index)">{{item}}</div>
            </div>
        </nav-bar>
    </div>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'

    export default {
        name: "DetailNavBar",
        data() {
            return {
                titles: ['商品', '参数', '评论', '推荐'],
                currentIndex: 0
            }
        },
        components: {
            NavBar
        },
        methods:{
            itemClick(index){
                this.currentIndex = index;
                this.$emit('itemClick', index)
            },
            backClick(){
                this.$router.back()
            }
        }
    }
</script>

<style scoped>
    .back img {
        width: 20px;
        margin-top: 12px;
    }

    .title {
        display: flex;
        font-size: 13px;
    }

    .title-item {
        flex: 1;
    }

    .active{
        color: var(--color-tint);
    }
</style>