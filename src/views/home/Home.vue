<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <home-swiper :banner="banner"/>
        <home-recommend :recommend="recommend"/>
    </div>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar';
    import HomeSwiper from './childComps/HomeSwiper'
    import HomeRecommend from './childComps/HomeRecommend'

    import {getHomeMutidata} from 'network/home'

    export default {
        name: "Home",
        components: {
            NavBar,
            HomeSwiper,
            HomeRecommend,
        },
        data() {
            return {
                banner: [],
                dKeyword: [],
                keywords: [],
                recommend: []
            }
        },
        created() {
            getHomeMutidata().then(res => {
                console.log(res);
                this.banner = res.data.banner.list;
                this.dKeyword = res.data.dKeyword.list;
                this.keywords = res.data.keywords.list;
                this.recommend = res.data.recommend.list;
            })
        }
    }
</script>

<style scoped>
    .home-nav {
        background: var(--color-tint);
        color: white;
    }
</style>
