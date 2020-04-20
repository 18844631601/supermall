import {debounce} from 'common/util'
import BackTop from 'components/content/backTop/BackTop'
import {BACK_POSITION} from "./const";


export const itemImgLoadMixin = {
    data() {
        return {
            itemImgListener: null,
            refresh: null,
        }
    },
    mounted() {
        //图片加载完成事件总线
        this.refresh = debounce(this.$refs.scroll.refresh, 200)
        this.itemImgListener = () => {
            this.refresh()
        };
        this.$bus.$on('itemImgLoad', this.itemImgListener)
    }
}

export const backTopMixin = {
    data(){
        return {
            isShowBackTop: false,
        }
    },
    components:{
        BackTop
    },
    methods:{
        backTop() {
            this.$refs.scroll.scrollTo(0, 0)
        },
        listenerShowBackTop(position){
            this.isShowBackTop = position.y <= BACK_POSITION;
        }
    }
}