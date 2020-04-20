<template>
    <swiper>
        <swiper-item v-for="item in banner">
            <a :href="item.link">
                <img :src="item.image" alt="" @load="imgLoad">
            </a>
        </swiper-item>
    </swiper>
</template>

<script>
    import {Swiper, SwiperItem} from 'components/common/swiper'

    export default {
        name: "HomeSwiper",
        props: {
            banner: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                isLoad: false
            }
        },
        components: {
            Swiper,
            SwiperItem
        },
        methods: {
            imgLoad() {
                if (!this.isLoad) {
                    this.isLoad = true
                    this.$emit('swiperImgLoad')
                }
            }
        }
    }
</script>

<style scoped>

</style>