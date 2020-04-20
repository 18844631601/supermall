<template>
    <div class="wrapper">
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';

    export default {
        name: "BScroll",
        props: {
            probeType: {
                type: Number,
                default: 0
            },
            pullUpLoad: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                scroll: null
            }
        },
        mounted() {
            this.scroll = new BScroll('.wrapper', {
                probeType: this.probeType,
                pullUpLoad: this.pullUpLoad,
                click: true
            });
            this.scroll.on('scroll', (position) => {
                this.$emit('scroll', position);
            });
            this.scroll.on('pullingUp', () => {
                // console.log('pull');
                this.$emit('pullingUp')
            });
        },
        methods: {
            scrollTo(x, y, time = 300) {
                this.scroll.scrollTo(x, y, time)
            },
            finishPullUp() {
                setTimeout(() => {
                    this.scroll.finishPullUp()
                }, 2000);
            },
            refresh() {
                this.scroll.refresh()
            },
            getScrollY() {
                return this.scroll ? this.scroll.y : 0;
            }
        }

    }
</script>

<style scoped>

</style>