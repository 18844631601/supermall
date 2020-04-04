<template>
    <div class="recommend">
        <div v-for="item in recommend" class="recommend-item">
            <a href="item.link">
                <img :src="item.image" alt="">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HomeRecommend",
        props: {
            recommend: {
                type: Array,
                default() {
                    return []
                }
            }
        }
    }
</script>

<style scoped>
    .recommend{
        display: flex;
        width: 100%;
        text-align: center;
        font-size: 12px;
        padding: 8px 0;
        border-bottom: 1px solid #f2f2f2;
    }
    .recommend-item{
        flex: 1;
    }
    .recommend-item img{
        width: 65px;
        height: 65px;
        margin-bottom: 2px;
    }
</style>