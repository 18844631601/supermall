<template>
    <div class="cart">
        <nav-bar class="nav-bar">
            <div slot="center">购物车({{cartListLength}})</div>
        </nav-bar>
        <b-scroll class="cart-scroll" :probeType="3" ref="scroll">
            <cart-list/>
        </b-scroll>
        <cart-bottom-bar/>
    </div>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'
    import BScroll from 'components/common/bscroll/BScroll'

    import CartList from './childComps/CartList'
    import CartBottomBar from './childComps/CartBottomBar'

    import {mapGetters} from "vuex";

    export default {
        name: "Cart",
        data() {
            return {}
        },
        components: {
            NavBar,
            CartList,
            BScroll,
            CartBottomBar
        },
        computed: {
            ...mapGetters([
                'cartListLength',
            ])
        },
        activated(){
            this.$refs.scroll.refresh()
        }
    }
</script>

<style scoped>
    .cart {
        height: 100vh;
    }

    .nav-bar {
        color: #fff;
        background: var(--color-tint);
    }

    .cart-scroll{
        position: fixed;
        top:44px;
        bottom: 89px;
        overflow: hidden;
    }
</style>
