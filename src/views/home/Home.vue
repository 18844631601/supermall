<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <tab-control :titles="titles" @itemClick="itemClick" ref="tabControl1" class="tab-control" v-show="isTabFixed"/>
        <b-scroll class="home-scroll" ref="scroll" @scroll="scroll" :probe-type="3" :pull-up-load="true"
                  @pullingUp="loadMore">
            <home-swiper :banner="banner" @swiperImgLoad="swiperImgLoad"/>
            <home-recommend :recommend="recommend"/>
            <home-feature/>
            <tab-control :titles="titles" @itemClick="itemClick" ref="tabControl2"/>
            <goods-list :goods="showGoods"/>
        </b-scroll>
        <back-top @click.native="backTop" v-show="isShowBackTop"/>
    </div>
</template>

<script>
    //子组件
    import HomeSwiper from './childComps/HomeSwiper'
    import HomeRecommend from './childComps/HomeRecommend'
    import HomeFeature from './childComps/HomeFeature'
    //公共组件
    import NavBar from 'components/common/navbar/NavBar';
    import TabControl from 'components/content/tabControl/TabControl'
    import GoodsList from 'components/content/goods/GoodsList'
    import BScroll from 'components/common/bscroll/BScroll'

    import {getHomeMutidata, getHomeGoods} from 'network/home'

    import {itemImgLoadMixin, backTopMixin} from "common/mixins";
    import {BACK_POSITION} from "common/const";

    export default {
        name: "Home",
        components: {
            HomeSwiper,
            HomeRecommend,
            HomeFeature,
            NavBar,
            TabControl,
            GoodsList,
            BScroll,
        },
        data() {
            return {
                banner: [],
                recommend: [],
                titles: ['流行', '新款', '精选'],
                goods: {
                    "pop": {
                        page: 0, list: [{
                            iid: 111,
                            cfav: 466,
                            img: "https://s5.mogucdn.com/mlcdn/c45406/190817_7bfbc11kicca4fe2fgic954ikhhfj_640x960.jpg",
                            link: "https://h5.mogu.com/detail-normal/index.html?itemId=1mk63ma&acm=3.ms.1_4_1mk63ma.46.36620-68998.e6MRRrUTAKG5E.sd_117-swt_46-imt_6-c_1_17_545809170_0_0_3-t_e6MRRrUTAKG5E-lc_17-pit_1-qid_37010-dit_167&cparam=MTU4NTczMTI1N18xMWtfMDA2ZDc5MzRkMTc5MzI4MWY0NTJhMWY1YWQ0NjRkMGVfMTdfMF81NDU4MDkxNzBfNGY4Zl8wXzBfMF83ODFfMV8zX2xvYy0w",
                            price: 108.5,
                            title: "外套男士潮牌春季2020新款潮少年衣服男装韩版潮流工装夹克男"
                        }, {
                            iid: 222,
                            cfav: 466,
                            img: "https://s5.mogucdn.com/mlcdn/c45406/190817_7bfbc11kicca4fe2fgic954ikhhfj_640x960.jpg",
                            link: "https://h5.mogu.com/detail-normal/index.html?itemId=1mk63ma&acm=3.ms.1_4_1mk63ma.46.36620-68998.e6MRRrUTAKG5E.sd_117-swt_46-imt_6-c_1_17_545809170_0_0_3-t_e6MRRrUTAKG5E-lc_17-pit_1-qid_37010-dit_167&cparam=MTU4NTczMTI1N18xMWtfMDA2ZDc5MzRkMTc5MzI4MWY0NTJhMWY1YWQ0NjRkMGVfMTdfMF81NDU4MDkxNzBfNGY4Zl8wXzBfMF83ODFfMV8zX2xvYy0w",
                            price: 108.5,
                            title: "外套男士潮牌春季2020新款潮少年衣服男装韩版潮流工装夹克男"
                        }, {
                            iid: 111,
                            cfav: 466,
                            img: "https://s5.mogucdn.com/mlcdn/c45406/190817_7bfbc11kicca4fe2fgic954ikhhfj_640x960.jpg",
                            link: "https://h5.mogu.com/detail-normal/index.html?itemId=1mk63ma&acm=3.ms.1_4_1mk63ma.46.36620-68998.e6MRRrUTAKG5E.sd_117-swt_46-imt_6-c_1_17_545809170_0_0_3-t_e6MRRrUTAKG5E-lc_17-pit_1-qid_37010-dit_167&cparam=MTU4NTczMTI1N18xMWtfMDA2ZDc5MzRkMTc5MzI4MWY0NTJhMWY1YWQ0NjRkMGVfMTdfMF81NDU4MDkxNzBfNGY4Zl8wXzBfMF83ODFfMV8zX2xvYy0w",
                            price: 108.5,
                            title: "外套男士潮牌春季2020新款潮少年衣服男装韩版潮流工装夹克男"
                        }, {
                            iid: 222,
                            cfav: 466,
                            img: "https://s5.mogucdn.com/mlcdn/c45406/190817_7bfbc11kicca4fe2fgic954ikhhfj_640x960.jpg",
                            link: "https://h5.mogu.com/detail-normal/index.html?itemId=1mk63ma&acm=3.ms.1_4_1mk63ma.46.36620-68998.e6MRRrUTAKG5E.sd_117-swt_46-imt_6-c_1_17_545809170_0_0_3-t_e6MRRrUTAKG5E-lc_17-pit_1-qid_37010-dit_167&cparam=MTU4NTczMTI1N18xMWtfMDA2ZDc5MzRkMTc5MzI4MWY0NTJhMWY1YWQ0NjRkMGVfMTdfMF81NDU4MDkxNzBfNGY4Zl8wXzBfMF83ODFfMV8zX2xvYy0w",
                            price: 108.5,
                            title: "外套男士潮牌春季2020新款潮少年衣服男装韩版潮流工装夹克男"
                        }, {
                            iid: 111,
                            cfav: 466,
                            img: "https://s5.mogucdn.com/mlcdn/c45406/190817_7bfbc11kicca4fe2fgic954ikhhfj_640x960.jpg",
                            link: "https://h5.mogu.com/detail-normal/index.html?itemId=1mk63ma&acm=3.ms.1_4_1mk63ma.46.36620-68998.e6MRRrUTAKG5E.sd_117-swt_46-imt_6-c_1_17_545809170_0_0_3-t_e6MRRrUTAKG5E-lc_17-pit_1-qid_37010-dit_167&cparam=MTU4NTczMTI1N18xMWtfMDA2ZDc5MzRkMTc5MzI4MWY0NTJhMWY1YWQ0NjRkMGVfMTdfMF81NDU4MDkxNzBfNGY4Zl8wXzBfMF83ODFfMV8zX2xvYy0w",
                            price: 108.5,
                            title: "外套男士潮牌春季2020新款潮少年衣服男装韩版潮流工装夹克男"
                        }, {
                            iid: 222,
                            cfav: 466,
                            img: "https://s5.mogucdn.com/mlcdn/c45406/190817_7bfbc11kicca4fe2fgic954ikhhfj_640x960.jpg",
                            link: "https://h5.mogu.com/detail-normal/index.html?itemId=1mk63ma&acm=3.ms.1_4_1mk63ma.46.36620-68998.e6MRRrUTAKG5E.sd_117-swt_46-imt_6-c_1_17_545809170_0_0_3-t_e6MRRrUTAKG5E-lc_17-pit_1-qid_37010-dit_167&cparam=MTU4NTczMTI1N18xMWtfMDA2ZDc5MzRkMTc5MzI4MWY0NTJhMWY1YWQ0NjRkMGVfMTdfMF81NDU4MDkxNzBfNGY4Zl8wXzBfMF83ODFfMV8zX2xvYy0w",
                            price: 108.5,
                            title: "外套男士潮牌春季2020新款潮少年衣服男装韩版潮流工装夹克男"
                        }, {
                            iid: 111,
                            cfav: 466,
                            img: "https://s5.mogucdn.com/mlcdn/c45406/190817_7bfbc11kicca4fe2fgic954ikhhfj_640x960.jpg",
                            link: "https://h5.mogu.com/detail-normal/index.html?itemId=1mk63ma&acm=3.ms.1_4_1mk63ma.46.36620-68998.e6MRRrUTAKG5E.sd_117-swt_46-imt_6-c_1_17_545809170_0_0_3-t_e6MRRrUTAKG5E-lc_17-pit_1-qid_37010-dit_167&cparam=MTU4NTczMTI1N18xMWtfMDA2ZDc5MzRkMTc5MzI4MWY0NTJhMWY1YWQ0NjRkMGVfMTdfMF81NDU4MDkxNzBfNGY4Zl8wXzBfMF83ODFfMV8zX2xvYy0w",
                            price: 108.5,
                            title: "外套男士潮牌春季2020新款潮少年衣服男装韩版潮流工装夹克男"
                        }, {
                            iid: 222,
                            cfav: 466,
                            img: "https://s5.mogucdn.com/mlcdn/c45406/190817_7bfbc11kicca4fe2fgic954ikhhfj_640x960.jpg",
                            link: "https://h5.mogu.com/detail-normal/index.html?itemId=1mk63ma&acm=3.ms.1_4_1mk63ma.46.36620-68998.e6MRRrUTAKG5E.sd_117-swt_46-imt_6-c_1_17_545809170_0_0_3-t_e6MRRrUTAKG5E-lc_17-pit_1-qid_37010-dit_167&cparam=MTU4NTczMTI1N18xMWtfMDA2ZDc5MzRkMTc5MzI4MWY0NTJhMWY1YWQ0NjRkMGVfMTdfMF81NDU4MDkxNzBfNGY4Zl8wXzBfMF83ODFfMV8zX2xvYy0w",
                            price: 108.5,
                            title: "外套男士潮牌春季2020新款潮少年衣服男装韩版潮流工装夹克男"
                        },]
                    },
                    "news": {
                        page: 0, list: [{
                            cfav: 1166,
                            img: "https://s5.mogucdn.com/mlcdn/c45406/200227_3ch663bgcl2aj1556h34ff6hkga7k_4688x7032.jpg",
                            link: "https://h5.mogu.com/detail-normal/index.html?itemId=1mk63ma&acm=3.ms.1_4_1mk63ma.46.36620-68998.e6MRRrUTAKG5E.sd_117-swt_46-imt_6-c_1_17_545809170_0_0_3-t_e6MRRrUTAKG5E-lc_17-pit_1-qid_37010-dit_167&cparam=MTU4NTczMTI1N18xMWtfMDA2ZDc5MzRkMTc5MzI4MWY0NTJhMWY1YWQ0NjRkMGVfMTdfMF81NDU4MDkxNzBfNGY4Zl8wXzBfMF83ODFfMV8zX2xvYy0w",
                            price: 69,
                            title: "阔腿裤搭配女装小个子显瘦春装新款韩版春秋洋气女神衣服两件套装"
                        }, {
                            cfav: 1166,
                            img: "https://s5.mogucdn.com/mlcdn/c45406/200227_3ch663bgcl2aj1556h34ff6hkga7k_4688x7032.jpg",
                            link: "https://h5.mogu.com/detail-normal/index.html?itemId=1mk63ma&acm=3.ms.1_4_1mk63ma.46.36620-68998.e6MRRrUTAKG5E.sd_117-swt_46-imt_6-c_1_17_545809170_0_0_3-t_e6MRRrUTAKG5E-lc_17-pit_1-qid_37010-dit_167&cparam=MTU4NTczMTI1N18xMWtfMDA2ZDc5MzRkMTc5MzI4MWY0NTJhMWY1YWQ0NjRkMGVfMTdfMF81NDU4MDkxNzBfNGY4Zl8wXzBfMF83ODFfMV8zX2xvYy0w",
                            price: 69,
                            title: "阔腿裤搭配女装小个子显瘦春装新款韩版春秋洋气女神衣服两件套装"
                        }, {
                            cfav: 1166,
                            img: "https://s5.mogucdn.com/mlcdn/c45406/200227_3ch663bgcl2aj1556h34ff6hkga7k_4688x7032.jpg",
                            link: "https://h5.mogu.com/detail-normal/index.html?itemId=1mk63ma&acm=3.ms.1_4_1mk63ma.46.36620-68998.e6MRRrUTAKG5E.sd_117-swt_46-imt_6-c_1_17_545809170_0_0_3-t_e6MRRrUTAKG5E-lc_17-pit_1-qid_37010-dit_167&cparam=MTU4NTczMTI1N18xMWtfMDA2ZDc5MzRkMTc5MzI4MWY0NTJhMWY1YWQ0NjRkMGVfMTdfMF81NDU4MDkxNzBfNGY4Zl8wXzBfMF83ODFfMV8zX2xvYy0w",
                            price: 69,
                            title: "阔腿裤搭配女装小个子显瘦春装新款韩版春秋洋气女神衣服两件套装"
                        }, {
                            cfav: 1166,
                            img: "https://s5.mogucdn.com/mlcdn/c45406/200227_3ch663bgcl2aj1556h34ff6hkga7k_4688x7032.jpg",
                            link: "https://h5.mogu.com/detail-normal/index.html?itemId=1mk63ma&acm=3.ms.1_4_1mk63ma.46.36620-68998.e6MRRrUTAKG5E.sd_117-swt_46-imt_6-c_1_17_545809170_0_0_3-t_e6MRRrUTAKG5E-lc_17-pit_1-qid_37010-dit_167&cparam=MTU4NTczMTI1N18xMWtfMDA2ZDc5MzRkMTc5MzI4MWY0NTJhMWY1YWQ0NjRkMGVfMTdfMF81NDU4MDkxNzBfNGY4Zl8wXzBfMF83ODFfMV8zX2xvYy0w",
                            price: 69,
                            title: "阔腿裤搭配女装小个子显瘦春装新款韩版春秋洋气女神衣服两件套装"
                        }, {
                            cfav: 1166,
                            img: "https://s5.mogucdn.com/mlcdn/c45406/200227_3ch663bgcl2aj1556h34ff6hkga7k_4688x7032.jpg",
                            link: "https://h5.mogu.com/detail-normal/index.html?itemId=1mk63ma&acm=3.ms.1_4_1mk63ma.46.36620-68998.e6MRRrUTAKG5E.sd_117-swt_46-imt_6-c_1_17_545809170_0_0_3-t_e6MRRrUTAKG5E-lc_17-pit_1-qid_37010-dit_167&cparam=MTU4NTczMTI1N18xMWtfMDA2ZDc5MzRkMTc5MzI4MWY0NTJhMWY1YWQ0NjRkMGVfMTdfMF81NDU4MDkxNzBfNGY4Zl8wXzBfMF83ODFfMV8zX2xvYy0w",
                            price: 69,
                            title: "阔腿裤搭配女装小个子显瘦春装新款韩版春秋洋气女神衣服两件套装"
                        }, {
                            cfav: 1166,
                            img: "https://s5.mogucdn.com/mlcdn/c45406/200227_3ch663bgcl2aj1556h34ff6hkga7k_4688x7032.jpg",
                            link: "https://h5.mogu.com/detail-normal/index.html?itemId=1mk63ma&acm=3.ms.1_4_1mk63ma.46.36620-68998.e6MRRrUTAKG5E.sd_117-swt_46-imt_6-c_1_17_545809170_0_0_3-t_e6MRRrUTAKG5E-lc_17-pit_1-qid_37010-dit_167&cparam=MTU4NTczMTI1N18xMWtfMDA2ZDc5MzRkMTc5MzI4MWY0NTJhMWY1YWQ0NjRkMGVfMTdfMF81NDU4MDkxNzBfNGY4Zl8wXzBfMF83ODFfMV8zX2xvYy0w",
                            price: 69,
                            title: "阔腿裤搭配女装小个子显瘦春装新款韩版春秋洋气女神衣服两件套装"
                        }]
                    },
                    "sell": {
                        page: 0, list: [{
                            cfav: 466,
                            img: "https://s5.mogucdn.com/mlcdn/c45406/190817_7bfbc11kicca4fe2fgic954ikhhfj_640x960.jpg",
                            link: "https://h5.mogu.com/detail-normal/index.html?itemId=1mk63ma&acm=3.ms.1_4_1mk63ma.46.36620-68998.e6MRRrUTAKG5E.sd_117-swt_46-imt_6-c_1_17_545809170_0_0_3-t_e6MRRrUTAKG5E-lc_17-pit_1-qid_37010-dit_167&cparam=MTU4NTczMTI1N18xMWtfMDA2ZDc5MzRkMTc5MzI4MWY0NTJhMWY1YWQ0NjRkMGVfMTdfMF81NDU4MDkxNzBfNGY4Zl8wXzBfMF83ODFfMV8zX2xvYy0w",
                            price: 108.5,
                            title: "外套男士潮牌春季2020新款潮少年衣服男装韩版潮流工装夹克男"
                        }, {
                            cfav: 466,
                            img: "https://s5.mogucdn.com/mlcdn/c45406/190817_7bfbc11kicca4fe2fgic954ikhhfj_640x960.jpg",
                            link: "https://h5.mogu.com/detail-normal/index.html?itemId=1mk63ma&acm=3.ms.1_4_1mk63ma.46.36620-68998.e6MRRrUTAKG5E.sd_117-swt_46-imt_6-c_1_17_545809170_0_0_3-t_e6MRRrUTAKG5E-lc_17-pit_1-qid_37010-dit_167&cparam=MTU4NTczMTI1N18xMWtfMDA2ZDc5MzRkMTc5MzI4MWY0NTJhMWY1YWQ0NjRkMGVfMTdfMF81NDU4MDkxNzBfNGY4Zl8wXzBfMF83ODFfMV8zX2xvYy0w",
                            price: 108.5,
                            title: "外套男士潮牌春季2020新款潮少年衣服男装韩版潮流工装夹克男"
                        }, {
                            cfav: 466,
                            img: "https://s5.mogucdn.com/mlcdn/c45406/190817_7bfbc11kicca4fe2fgic954ikhhfj_640x960.jpg",
                            link: "https://h5.mogu.com/detail-normal/index.html?itemId=1mk63ma&acm=3.ms.1_4_1mk63ma.46.36620-68998.e6MRRrUTAKG5E.sd_117-swt_46-imt_6-c_1_17_545809170_0_0_3-t_e6MRRrUTAKG5E-lc_17-pit_1-qid_37010-dit_167&cparam=MTU4NTczMTI1N18xMWtfMDA2ZDc5MzRkMTc5MzI4MWY0NTJhMWY1YWQ0NjRkMGVfMTdfMF81NDU4MDkxNzBfNGY4Zl8wXzBfMF83ODFfMV8zX2xvYy0w",
                            price: 108.5,
                            title: "外套男士潮牌春季2020新款潮少年衣服男装韩版潮流工装夹克男"
                        }, {
                            cfav: 466,
                            img: "https://s5.mogucdn.com/mlcdn/c45406/190817_7bfbc11kicca4fe2fgic954ikhhfj_640x960.jpg",
                            link: "https://h5.mogu.com/detail-normal/index.html?itemId=1mk63ma&acm=3.ms.1_4_1mk63ma.46.36620-68998.e6MRRrUTAKG5E.sd_117-swt_46-imt_6-c_1_17_545809170_0_0_3-t_e6MRRrUTAKG5E-lc_17-pit_1-qid_37010-dit_167&cparam=MTU4NTczMTI1N18xMWtfMDA2ZDc5MzRkMTc5MzI4MWY0NTJhMWY1YWQ0NjRkMGVfMTdfMF81NDU4MDkxNzBfNGY4Zl8wXzBfMF83ODFfMV8zX2xvYy0w",
                            price: 108.5,
                            title: "外套男士潮牌春季2020新款潮少年衣服男装韩版潮流工装夹克男"
                        }, {
                            cfav: 466,
                            img: "https://s5.mogucdn.com/mlcdn/c45406/190817_7bfbc11kicca4fe2fgic954ikhhfj_640x960.jpg",
                            link: "https://h5.mogu.com/detail-normal/index.html?itemId=1mk63ma&acm=3.ms.1_4_1mk63ma.46.36620-68998.e6MRRrUTAKG5E.sd_117-swt_46-imt_6-c_1_17_545809170_0_0_3-t_e6MRRrUTAKG5E-lc_17-pit_1-qid_37010-dit_167&cparam=MTU4NTczMTI1N18xMWtfMDA2ZDc5MzRkMTc5MzI4MWY0NTJhMWY1YWQ0NjRkMGVfMTdfMF81NDU4MDkxNzBfNGY4Zl8wXzBfMF83ODFfMV8zX2xvYy0w",
                            price: 108.5,
                            title: "外套男士潮牌春季2020新款潮少年衣服男装韩版潮流工装夹克男"
                        }, {
                            cfav: 466,
                            img: "https://s5.mogucdn.com/mlcdn/c45406/190817_7bfbc11kicca4fe2fgic954ikhhfj_640x960.jpg",
                            link: "https://h5.mogu.com/detail-normal/index.html?itemId=1mk63ma&acm=3.ms.1_4_1mk63ma.46.36620-68998.e6MRRrUTAKG5E.sd_117-swt_46-imt_6-c_1_17_545809170_0_0_3-t_e6MRRrUTAKG5E-lc_17-pit_1-qid_37010-dit_167&cparam=MTU4NTczMTI1N18xMWtfMDA2ZDc5MzRkMTc5MzI4MWY0NTJhMWY1YWQ0NjRkMGVfMTdfMF81NDU4MDkxNzBfNGY4Zl8wXzBfMF83ODFfMV8zX2xvYy0w",
                            price: 108.5,
                            title: "外套男士潮牌春季2020新款潮少年衣服男装韩版潮流工装夹克男"
                        }]
                    },
                },
                currentType: 'pop',
                tabOffsetTop: 0,
                isTabFixed: false,
                saveY: 0,
            }
        },
        computed: {
            showGoods() {
                return this.goods[this.currentType].list
            }
        },
        activated() {
            // console.log('act'+this.saveY);
            this.$refs.scroll.refresh()
            this.$refs.scroll.scrollTo(0, this.saveY, 0)
        },
        deactivated() {
            this.saveY = this.$refs.scroll.getScrollY()
            // console.log('deact'+this.saveY);
            this.$bus.$off('itemImgLoad', this.itemImgListener)
        },
        created() {
            //获取多种数据
            this.getHomeMutidata();

            //获取商品数据
            // this.getHomeGoods("pop");
            // this.getHomeGoods("news");
            // this.getHomeGoods("sell");
        },
        mixins: [itemImgLoadMixin, backTopMixin],
        methods: {
            /*
            * 事件监听
            * */
            itemClick(index) {
                switch (index) {
                    case 0:
                        this.currentType = 'pop';
                        break;
                    case 1:
                        this.currentType = 'news';
                        break;
                    case 2:
                        this.currentType = 'sell';
                        break;
                }
                this.$refs.tabControl1.currentIndex = index;
                this.$refs.tabControl2.currentIndex = index;
            },
            scroll(position) {
                //判断backTop是否显示
                this.listenerShowBackTop(position);
                //判断是否吸顶
                this.isTabFixed = position.y <= -this.tabOffsetTop
            },
            loadMore() {
                console.log('loadMore');
                // this.getHomeGoods(this.currentType);
            },
            swiperImgLoad() {
                //获取tabControl的offsetTop
                //所有组件都有一个属性$el,用于获取组建中元素
                this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
                // console.log(this.tabOffsetTop);
            },
            /*
            * 网络请求
            * */
            getHomeMutidata() {
                getHomeMutidata().then(res => {
                    // console.log(res);
                    this.banner = res.data.banner.list;
                    this.recommend = res.data.recommend.list;
                })
            },
            getHomeGoods(type) {
                const page = this.goods[type].page + 1;
                getHomeGoods(type, page).then(res => {
                    // console.log(res);
                    this.goods[type].list.push(...res.data.list);
                    this.goods[type].page++;

                    this.$refs.scroll.finishPullUp()
                })
            }
        }
    }
</script>


<style scoped>
    #home {
        height: 100vh;
        position: relative;
    }

    .home-nav {
        background: var(--color-tint);
        color: white;

        /*原生滚动采用*/
        /*position: fixed;*/
        /*left: 0;*/
        /*right: 0;*/
        /*top: 0;*/
        /*z-index: 1;*/
    }

    /*.tab-control {*/
    /*position: sticky; !*粘性定位*!*/
    /*top: 44px;*/
    /*}*/

    .tab-control {
        position: relative;
        z-index: 10;
    }

    /*.home-scroll{*/
    /*height: calc(100% - 93px);*/
    /*overflow: hidden;*/
    /*margin-top: 44px;*/
    /*}*/

    /*推荐*/
    .home-scroll {
        position: absolute;
        top: 44px;
        bottom: 49px;
        overflow: hidden;
    }
</style>
