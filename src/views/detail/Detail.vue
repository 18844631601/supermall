<template>
    <div class="detail">
        <detail-nav-bar class="nav-bar" @itemClick="itemClick" ref="nav"/>
        <b-scroll class="detail-scroll" ref="scroll" @scroll="scroll" :probe-type="3">
            <detail-swiper :top-images="topImages"/>
            <detail-base-info :good="good"/>
            <detail-shop :shop="shop"/>
            <detail-good-info :good-info="goodInfo" @imageLoad="goodInfoImageLoad"/>
            <detail-param-info ref="param" :param-info="paramInfo"/>
            <detail-comment-info ref="comment" :comment-info="commentInfo"/>
            <goods-list ref="recommend" :goods="recommends"/>
        </b-scroll>
        <detail-bottom-bar @addToCart="addToCart"/>
        <back-top @click.native="backTop" v-show="isShowBackTop"/>
    </div>
</template>

<script>
    import DetailNavBar from './childComps/DetailNavBar'
    import DetailSwiper from './childComps/DetailSwiper'
    import DetailBaseInfo from './childComps/DetailBaseInfo'
    import DetailShop from './childComps/DetailShop'
    import DetailGoodInfo from './childComps/DetailGoodInfo'
    import DetailParamInfo from './childComps/DetailParamInfo'
    import DetailCommentInfo from './childComps/DetailCommentInfo'
    import DetailBottomBar from './childComps/DetailBottomBar'

    import GoodsList from 'components/content/goods/GoodsList'
    import BScroll from 'components/common/bscroll/BScroll'

    import {getDetail, Good, Shop, ParamInfo, getRecommend} from "network/detail";

    import {itemImgLoadMixin, backTopMixin} from "common/mixins";
    import {mapActions} from "vuex";

    export default {
        name: "Detail",
        data() {
            return {
                iid: null,
                goodDetail: {
                    "liveInfo": {},
                    "userInfo": {
                        "userId": "13ljza4",
                        "isLogin": false,
                        "isSelf": false,
                        "admin": false,
                        "shopId": "1oriro",
                        "sellerId": "13ljza4"
                    },
                    "rateLookInfo": {},
                    "rateInfo": {
                        "list": [{
                            "user": {
                                "uname": "福泰安康Vera",
                                "avatar": "https://s5.mogucdn.com/mlcdn/5abf39/190320_13haca1f2bd9la3fe90kjf50a3af6_132x132.jpg",
                                "profileUrl": ""
                            },
                            "rateId": "118xhcke",
                            "content": "衣服收到，物流很快，就是色泽差点",
                            "created": 1568329385,
                            "isAnonymous": 0,
                            "style": "颜色:卡其 尺码:XL ",
                            "isEmpty": 1,
                            "level": "",
                            "canExplain": false,
                            "isBuyerShow": false
                        },
                            {
                                "user": {
                                    "uname": "樱花满天飞Iris",
                                    "avatar": "https://s5.mogucdn.com/mlcdn/5abf39/180514_0541if6h5jk4lbc6a4e64glekcfj3_132x132.jpg",
                                    "profileUrl": ""
                                },
                                "rateId": "118341xu",
                                "content": "衣服色差太大，和客服说了以后再也没人回",
                                "created": 1556532329,
                                "isAnonymous": 0,
                                "style": "颜色:卡其 尺码:L ",
                                "isEmpty": 1,
                                "level": "",
                                "canExplain": false,
                                "isBuyerShow": false
                            }],
                        "cRate": 29,
                        "imgTotal": 2,
                        "rateTags": [{
                            "emotion": "positive",
                            "property": "图片",
                            "value": "有图片",
                            "num": 2,
                            "labelId": 0
                        },
                            {
                                "emotion": "positive",
                                "property": "质量",
                                "value": "质量很好",
                                "num": 3,
                                "labelId": 0
                            }],
                        "sales": 166
                    },
                    "itemInfo": {
                        "desc": "男士2019秋季新款外套韩版潮流青年休闲夹克春秋百搭男装衣服",
                        "title": "男士2019秋季新款外套韩版潮流青年休闲夹克春秋百搭男装衣服",
                        "itemId": "1kivjuo",
                        "isFaved": false,
                        "isShareIntegral": false,
                        "cFav": 366,
                        "state": 0,
                        "saleStartTime": 0,
                        "saleType": 0,
                        "seo": {
                            "keywords": "男士2019秋季新款外套韩版潮流青年休闲夹克春秋百搭男装衣服",
                            "wap_url": "//m.mogujie.com/x6/detail/1kivjuo",
                            "description": "来自蘑菇街优店上衣_男装_夹克_服饰鞋包家男士2019秋季新款外套韩版潮流青年休闲夹克春秋百搭男装衣服的男士2019秋季新款外套韩版潮流青年休闲夹克春秋百搭男装衣服，发现当季男友和苏州帅爵服饰贸易有限公司搭配心得。",
                            "alternate": "//m.mogujie.com/x6/detail/1kivjuo",
                            "links": "null",
                            "canonical": "//shop.mogujie.com/detail/1kivjuo",
                            "seo_noindex": "0",
                            "title": "【男士2019秋季新款外套韩版潮流青年休闲夹克春秋百搭男装衣服】-男友-上衣_男装_夹克_服饰鞋包-苏州帅爵服饰贸易有限公司-蘑菇街优店"
                        },
                        "type": 8,
                        "priceChannel": 0,
                        "virtualItemType": 0,
                        "isMedicalBeautyVirtualItem": false,
                        "isVirtualCouponItem": false,
                        "isVirtualItem": false,
                        "isJdItem": false,
                        "inSpringFestival": false,
                        "isSpringFestivalShutdownItem": false,
                        "contain30DayDeliveryService": false,
                        "canApplyInstallment": false,
                        "extra": {
                            "sales": 166,
                            "isFreePost": true,
                            "express": "全国包邮",
                            "onSaleTime": 0,
                            "isLiveSeckill": false
                        },
                        "officialRecommend": {},
                        "limitDiscountInfo": {},
                        "lowPrice": "185.00",
                        "highPrice": "185.00",
                        "lowNowPrice": "119.00",
                        "highNowPrice": "119.00",
                        "nowTime": 1586244390,
                        "titleTags": [],
                        "titleTagsV2": [],
                        "picTags": []
                    },
                    "platformCoupons": {
                        "bonusCount": 0,
                        "isBonusItem": false
                    },
                    "saleTextInfo": {
                        "name": "slogan"
                    },
                    "priceInfo": {
                        "nowPrice": "119.00",
                        "oldPrice": "185.00",
                        "highNowPrice": "",
                        "priceSplit": "~",
                        "currency": "¥",
                        "priceColor": "#333333",
                        "priceTags": [{
                            "text": "优惠价",
                            "bgColor": "#FFE8EE",
                            "textColor": "#FF2255"
                        }],
                        "prePriceTag": {
                            "bgColor": "#FFE8EE",
                            "textColor": "#FF2255"
                        },
                        "eventPrice": "",
                        "eventPriceDesc": {
                            "bgColor": "#FFE8EE",
                            "textColor": "#FF2255"
                        },
                        "eventPriceColor": "#FF2255",
                        "eventTags": [],
                        "mobilePrice": "",
                        "mobileDownloadLink": "",
                        "eventDesc": "",
                        "extraDesc": ""
                    },
                    "diamondInfo": {
                        "diamondPrice": "119.00",
                        "normalPrice": "119.00",
                        "state": 3,
                        "currency": "¥",
                        "backgroundImage": "https://s11.mogucdn.com/mlcdn/c45406/170728_2740cc0db684ccfg34i2323gak715_751x81.png",
                        "priceTitle": "限时优惠",
                        "arrowTitle": "豪华黄钻专享价"
                    },
                    "normalCountdown": {
                        "businessType": "",
                        "isWarmUp": false,
                        "nowTime": 1586244390,
                        "countdown": 0,
                        "image": "",
                        "titleColor": "#FFFFFF",
                        "priceColor": "#FFFFFF",
                        "activityBanner": "",
                        "activityBannerLink": "",
                        "titleIcon": "",
                        "isHideRightCountdown": false,
                        "text": "",
                        "isCountdomShow": true,
                        "isPriceShow": false
                    },
                    "shopInfo": {
                        "score": [{
                            "name": "描述相符",
                            "score": 5.0,
                            "isBetter": true
                        },
                            {
                                "name": "质量满意",
                                "score": 5.0,
                                "isBetter": true
                            }],
                        "services": [{
                            "icon": "https://s11.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png",
                            "name": "延误必赔",
                            "desc": "极速发货、送货保障，若发货时间晚于商家承诺时间或快递派送时间晚于平台标准，可获得延误补贴。"
                        },
                            {
                                "icon": "https://s11.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png",
                                "name": "退货补运费",
                                "link": "https://www.mogu.com/rule/mogu?categoryId=326&ruleId=927",
                                "desc": "用户发起退货且绑定提现银行卡，可获6-18元运费补贴"
                            },
                            {
                                "icon": "https://s11.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png",
                                "name": "全国包邮",
                                "link": "https://www.mogu.com/rule/mogu?categoryId=326&ruleId=895",
                                "desc": ""
                            },
                            {
                                "icon": "https://s11.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png",
                                "name": "7天无理由退货",
                                "link": "https://www.mogu.com/rule/mogu?categoryId=326&ruleId=892",
                                "desc": "物流签收后7天内买家可无理由退货，需满足退货条件"
                            },
                            {
                                "icon": "https://s11.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png",
                                "name": "72小时发货",
                                "link": "https://www.mogu.com/rule/mogu?categoryId=326&ruleId=893",
                                "desc": ""
                            }],
                        "categories": [{
                            "name": "夹克",
                            "link": "http://shop.mogu.com/1oriro/list/index?categoryId=281671"
                        },
                            {
                                "name": "羽绒服",
                                "link": "http://shop.mogu.com/1oriro/list/index?categoryId=281687"
                            },
                            {
                                "name": "裤子",
                                "link": "http://shop.mogu.com/1oriro/list/index?categoryId=281692"
                            },
                            {
                                "name": "棉衣男",
                                "link": "http://shop.mogu.com/1oriro/list/index?categoryId=281699"
                            },
                            {
                                "name": "毛衣",
                                "link": "http://shop.mogu.com/1oriro/list/index?categoryId=281706"
                            },
                            {
                                "name": "卫衣",
                                "link": "http://shop.mogu.com/1oriro/list/index?categoryId=1324959"
                            },
                            {
                                "name": "毛尼",
                                "link": "http://shop.mogu.com/1oriro/list/index?categoryId=1328567"
                            },
                            {
                                "name": "风衣",
                                "link": "http://shop.mogu.com/1oriro/list/index?categoryId=1336302"
                            },
                            {
                                "name": "t恤",
                                "link": "http://shop.mogu.com/1oriro/list/index?categoryId=1336666"
                            },
                            {
                                "name": "情侣棉衣",
                                "link": "http://shop.mogu.com/1oriro/list/index?categoryId=1358192"
                            },
                            {
                                "name": "皮草",
                                "link": "http://shop.mogu.com/1oriro/list/index?categoryId=1364848"
                            },
                            {
                                "name": "男鞋",
                                "link": "http://shop.mogu.com/1oriro/list/index?categoryId=1435300"
                            },
                            {
                                "name": "西服",
                                "link": "http://shop.mogu.com/1oriro/list/index?categoryId=1444217"
                            },
                            {
                                "name": "外套",
                                "link": "http://shop.mogu.com/1oriro/list/index?categoryId=1444465"
                            },
                            {
                                "name": "衬衫",
                                "link": "http://shop.mogu.com/1oriro/list/index?categoryId=1466059"
                            },
                            {
                                "name": "防晒服",
                                "link": "http://shop.mogu.com/1oriro/list/index?categoryId=1477938"
                            },
                            {
                                "name": "女装",
                                "link": "http://shop.mogu.com/1oriro/list/index?categoryId=20083304"
                            },
                            {
                                "name": "套装",
                                "link": "http://shop.mogu.com/1oriro/list/index?categoryId=20090254"
                            }],
                        "cFans": "6052",
                        "cSells": "41839",
                        "isMarked": false,
                        "cGoods": 30,
                        "userId": "13ljza4",
                        "shopLogo": "https://s11.mogucdn.com/pic/141211/1agxqe_ieygmodbmiztmzrqmuytambqmmyde_120x120.jpg",
                        "name": "苏州帅爵服饰贸易有限公司",
                        "shopId": "1oriro",
                        "type": 1,
                        "level": 2,
                        "levelDescV2": "推荐指数",
                        "shopUrl": "//m.mogu.com/v8/meili/shop?shopid=1oriro",
                        "saleDesc": "在架商品 ",
                        "saleDescV2": "在架商品 30",
                        "shopLabels": [{
                            "id": 201,
                            "text": "6052人关注"
                        },
                            {
                                "id": 303,
                                "text": "累计销量4.1万+"
                            },
                            {
                                "id": 602,
                                "text": "3年老字号"
                            }],
                        "dynShopLabels": [],
                        "shopLabelPriority": "101,102,201,301,302,303,401,402,501,502,601,602"
                    },
                    "preSaleInfo": "",
                    "detailInfo": {
                        "splitDetailImage": true,
                        "desc": "男士2019秋季新款外套韩版潮流青年休闲夹克春秋百搭男装衣服",
                        "detailImage": [{
                            "desc": "",
                            "key": "穿着效果",
                            "anchor": "model_img",
                            "list": ["https://s11.mogucdn.com/mlcdn/c45406/170828_2jf0ebf32b19j1le020di8fhdejgg_640x960.jpg", "https://s5.mogucdn.com/mlcdn/c45406/170828_227j26a2cgehc3fa85a4a4l8ll31e_640x960.jpg", "https://s5.mogucdn.com/mlcdn/c45406/170828_094c27289j3j1g53723kgf33i960e_640x960.jpg", "https://s5.mogucdn.com/mlcdn/c45406/190317_47bflfb5fihji85i3jj9981e0d2b9_790x591.jpg"]
                        },
                            {
                                "desc": "",
                                "key": "整体款式",
                                "anchor": "baipai_img2",
                                "list": ["https://s11.mogucdn.com/mlcdn/c45406/170828_799e64jfi33ij9ic85de57kdfc53h_640x960.jpg", "https://s5.mogucdn.com/mlcdn/c45406/170828_7f83jia7j20639487ag9ci6b505c9_640x960.jpg", "https://s11.mogucdn.com/mlcdn/c45406/170828_6lk14da382g7bg1bj487igh9a6ejd_640x960.jpg", "https://s5.mogucdn.com/mlcdn/c45406/170828_61l95ac8458j2chh25jej91e73ke6_640x960.jpg"]
                            },
                            {
                                "desc": "",
                                "key": "细节做工",
                                "anchor": "detail_img",
                                "list": ["https://s5.mogucdn.com/mlcdn/c45406/170828_6g194h40fgfa3iab955egeb86fhk9_640x960.jpg", "https://s11.mogucdn.com/mlcdn/c024f5/190417_2d51ljj2a42lddkg49ibag494g3ca_1125x540.png"]
                            }]
                    },
                    "countdownInfo": {
                        "businessType": "NORMAL",
                        "isWarmUp": false,
                        "nowTime": 1586244390,
                        "countdown": 0,
                        "image": "",
                        "titleColor": "#FFFFFF",
                        "priceColor": "#FFFFFF",
                        "activityBanner": "",
                        "activityBannerLink": "",
                        "titleIcon": "",
                        "isHideRightCountdown": false,
                        "text": "",
                        "isCountdomShow": true,
                        "isPriceShow": false
                    },
                    "topImages": ["https://s5.mogucdn.com/mlcdn/c45406/170828_29fedia92idhfj12e527clj8937l2_640x960.jpg", "https://s11.mogucdn.com/mlcdn/c45406/170828_50i9f3f6fh283gi3cc6d7717gdeib_640x960.jpg"],
                    "normalShareInfo": {
                        "title": "男士2019秋季新款外套韩版潮流青年休闲夹克春秋百搭男装衣服",
                        "content": "亲爱的～这件宝贝不错哦，快进来看看吧～",
                        "url": "//h5.mogu.com/detail-normal/index.html?itemId=1kivjuo&from=share",
                        "imageUrl": "https://s5.mogucdn.com/mlcdn/c45406/170828_29fedia92idhfj12e527clj8937l2_640x960.jpg"
                    },
                    "itemParams": {
                        "info": {
                            "set": {
                                "图案": "纯色",
                                "颜色": "黑色,卡其",
                                "袖型": "常规袖",
                                "衣门襟": "拉链",
                                "男装厚薄": "普通",
                                "尺码": "XL,L,M,XXL,XXXL",
                                "衣长": "常规款",
                                "版型": "修身",
                                "细节": "其它",
                                "面料材质": "棉,其它材质",
                                "领型": "立领",
                                "风格": "学院,简约"
                            },
                            "key": "产品参数",
                            "anchor": "product_info"
                        },
                        "rule": {
                            "tables": [[["尺码", "衣长", "肩宽", "胸围", "袖长"], ["M", "65", "45", "104", "62"], ["L", "67", "46.2", "108", "63.5"], ["XL", "69", "47.9", "112", "65"], ["XXL", "71", "79.2", "116", "66"], ["XXXL", "73", "50.2", "120", "67"]]],
                            "key": "尺码说明",
                            "anchor": "size_info",
                            "disclaimer": "※ 以上尺寸为实物人工测量，因测量方式不同会有1-2cm误差，相关数据仅作参考，以收到实物为准。"
                        }
                    },
                    "normalPrice": {
                        "nowPrice": "119.00",
                        "oldPrice": "185.00",
                        "highNowPrice": "",
                        "priceSplit": "~",
                        "currency": "¥",
                        "priceColor": "#333333",
                        "priceTags": [{
                            "text": "优惠价",
                            "bgColor": "#FFE8EE",
                            "textColor": "#FF2255"
                        }],
                        "prePriceTag": {
                            "bgColor": "#FFE8EE",
                            "textColor": "#FF2255"
                        },
                        "eventPrice": "",
                        "eventPriceDesc": {
                            "bgColor": "#FFE8EE",
                            "textColor": "#FF2255"
                        },
                        "eventPriceColor": "#FF2255",
                        "eventTags": [],
                        "mobilePrice": "",
                        "mobileDownloadLink": "",
                        "eventDesc": "",
                        "extraDesc": ""
                    },
                    "itemServices": {
                        "services": [{
                            "name": "72小时发货",
                            "icon": "https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png",
                            "content": "",
                            "link": "https://www.mogu.com/rule/mogu?categoryId=326&ruleId=893"
                        },
                            {
                                "name": "7天无理由退货",
                                "icon": "https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png",
                                "content": "物流签收后7天内买家可无理由退货，需满足退货条件",
                                "link": "https://www.mogu.com/rule/mogu?categoryId=326&ruleId=892"
                            },
                            {
                                "name": "延误必赔",
                                "icon": "https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png",
                                "content": "极速发货、送货保障，若发货时间晚于商家承诺时间或快递派送时间晚于平台标准，可获得延误补贴。"
                            },
                            {
                                "name": "退货补运费",
                                "icon": "https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png",
                                "content": "用户发起退货且绑定提现银行卡，可获6-18元运费补贴",
                                "link": "https://www.mogu.com/rule/mogu?categoryId=326&ruleId=927"
                            },
                            {
                                "name": "白付美分期购",
                                "icon": "https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png",
                                "content": "白付美分期购：在我的钱包 →白付美页面开通即可使用分期购。本月消费，分3/6/12期还款，每月只还一点点，轻松享受大牌好货。（分12期只对部分用户开放。）"
                            },
                            {
                                "name": "全国包邮",
                                "icon": "https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png",
                                "content": "",
                                "link": "https://www.mogu.com/rule/mogu?categoryId=326&ruleId=895"
                            }],
                        "columns": [{
                            "name": "sales",
                            "desc": "销量 166",
                            "icon": "https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png"
                        },
                            {
                                "name": "express",
                                "desc": "免邮费",
                                "icon": "https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png"
                            }]
                    },
                    "skuInfo": {
                        "itemId": "1kivjuo",
                        "img": "https://s5.mogucdn.com/mlcdn/c45406/170828_29fedia92idhfj12e527clj8937l2_640x960.jpg",
                        "isJdItem": false,
                        "title": "男士2019秋季新款外套韩版潮流青年休闲夹克春秋百搭男装衣服",
                        "skus": [{
                            "stockId": "1tuolta",
                            "xdSkuId": "1tuolta",
                            "price": 18500,
                            "nowprice": 11900,
                            "img": "https://s5.mogucdn.com/mlcdn/c45406/170828_0c152fg2c9ldgh9ili4a3j72le3j8_640x960.jpg",
                            "currency": "¥",
                            "stock": 493,
                            "style": "黑色",
                            "color": "#000000",
                            "size": "M",
                            "styleId": 1,
                            "sizeId": 100
                        },
                            {
                                "stockId": "1tuoltc",
                                "xdSkuId": "1tuoltc",
                                "price": 18500,
                                "nowprice": 11900,
                                "img": "https://s5.mogucdn.com/mlcdn/c45406/170828_0c152fg2c9ldgh9ili4a3j72le3j8_640x960.jpg",
                                "currency": "¥",
                                "stock": 490,
                                "style": "黑色",
                                "color": "#000000",
                                "size": "L",
                                "styleId": 1,
                                "sizeId": 101
                            },
                            {
                                "stockId": "1tuolte",
                                "xdSkuId": "1tuolte",
                                "price": 18500,
                                "nowprice": 11900,
                                "img": "https://s5.mogucdn.com/mlcdn/c45406/170828_0c152fg2c9ldgh9ili4a3j72le3j8_640x960.jpg",
                                "currency": "¥",
                                "stock": 487,
                                "style": "黑色",
                                "color": "#000000",
                                "size": "XL",
                                "styleId": 1,
                                "sizeId": 102
                            },
                            {
                                "stockId": "1tuoltg",
                                "xdSkuId": "1tuoltg",
                                "price": 18500,
                                "nowprice": 11900,
                                "img": "https://s5.mogucdn.com/mlcdn/c45406/170828_0c152fg2c9ldgh9ili4a3j72le3j8_640x960.jpg",
                                "currency": "¥",
                                "stock": 489,
                                "style": "黑色",
                                "color": "#000000",
                                "size": "XXL",
                                "styleId": 1,
                                "sizeId": 103
                            },
                            {
                                "stockId": "1tuolti",
                                "xdSkuId": "1tuolti",
                                "price": 18500,
                                "nowprice": 11900,
                                "img": "https://s5.mogucdn.com/mlcdn/c45406/170828_0c152fg2c9ldgh9ili4a3j72le3j8_640x960.jpg",
                                "currency": "¥",
                                "stock": 493,
                                "style": "黑色",
                                "color": "#000000",
                                "size": "XXXL",
                                "styleId": 1,
                                "sizeId": 104
                            },
                            {
                                "stockId": "1tuoltu",
                                "xdSkuId": "1tuoltu",
                                "price": 18500,
                                "nowprice": 11900,
                                "img": "https://s11.mogucdn.com/mlcdn/c45406/170828_5c9a816lh2glicc1ig1al3bg64848_640x960.jpg",
                                "currency": "¥",
                                "stock": 491,
                                "style": "卡其",
                                "color": "",
                                "size": "M",
                                "styleId": 2,
                                "sizeId": 100
                            },
                            {
                                "stockId": "1tuoltw",
                                "xdSkuId": "1tuoltw",
                                "price": 18500,
                                "nowprice": 11900,
                                "img": "https://s11.mogucdn.com/mlcdn/c45406/170828_5c9a816lh2glicc1ig1al3bg64848_640x960.jpg",
                                "currency": "¥",
                                "stock": 481,
                                "style": "卡其",
                                "color": "",
                                "size": "L",
                                "styleId": 2,
                                "sizeId": 101
                            },
                            {
                                "stockId": "1tuolty",
                                "xdSkuId": "1tuolty",
                                "price": 18500,
                                "nowprice": 11900,
                                "img": "https://s11.mogucdn.com/mlcdn/c45406/170828_5c9a816lh2glicc1ig1al3bg64848_640x960.jpg",
                                "currency": "¥",
                                "stock": 469,
                                "style": "卡其",
                                "color": "",
                                "size": "XL",
                                "styleId": 2,
                                "sizeId": 102
                            },
                            {
                                "stockId": "1tuolu0",
                                "xdSkuId": "1tuolu0",
                                "price": 18500,
                                "nowprice": 11900,
                                "img": "https://s11.mogucdn.com/mlcdn/c45406/170828_5c9a816lh2glicc1ig1al3bg64848_640x960.jpg",
                                "currency": "¥",
                                "stock": 485,
                                "style": "卡其",
                                "color": "",
                                "size": "XXL",
                                "styleId": 2,
                                "sizeId": 103
                            },
                            {
                                "stockId": "1tuolu2",
                                "xdSkuId": "1tuolu2",
                                "price": 18500,
                                "nowprice": 11900,
                                "img": "https://s11.mogucdn.com/mlcdn/c45406/170828_5c9a816lh2glicc1ig1al3bg64848_640x960.jpg",
                                "currency": "¥",
                                "stock": 490,
                                "style": "卡其",
                                "color": "",
                                "size": "XXXL",
                                "styleId": 2,
                                "sizeId": 104
                            }],
                        "props": [{
                            "label": "颜色",
                            "list": [{
                                "default": false,
                                "styleId": 1,
                                "name": "黑色",
                                "index": 1,
                                "type": "style"
                            },
                                {
                                    "default": false,
                                    "styleId": 2,
                                    "name": "卡其",
                                    "index": 2,
                                    "type": "style"
                                }],
                            "isDefault": false
                        },
                            {
                                "label": "尺码",
                                "list": [{
                                    "sizeId": 100,
                                    "default": false,
                                    "name": "M",
                                    "index": 100,
                                    "type": "size"
                                },
                                    {
                                        "sizeId": 101,
                                        "default": false,
                                        "name": "L",
                                        "index": 101,
                                        "type": "size"
                                    },
                                    {
                                        "sizeId": 102,
                                        "default": false,
                                        "name": "XL",
                                        "index": 102,
                                        "type": "size"
                                    },
                                    {
                                        "sizeId": 103,
                                        "default": false,
                                        "name": "XXL",
                                        "index": 103,
                                        "type": "size"
                                    },
                                    {
                                        "sizeId": 104,
                                        "default": false,
                                        "name": "XXXL",
                                        "index": 104,
                                        "type": "size"
                                    }],
                                "isDefault": false
                            }],
                        "styleKey": "颜色",
                        "sizeKey": "尺码",
                        "priceRange": "¥119.00",
                        "defaultPrice": "¥119.00",
                        "totalStock": 4868,
                        "canInstallment": false,
                        "addressInfo": {}
                    }
                },
                topImages: [],
                good: {},
                shop: {},
                goodInfo: {},
                paramInfo: {},
                commentInfo: [],
                recommends: [
                    {
                        "tradeItemId": 625102065,
                        "image": "https://s5.mogucdn.com/mlcdn/c45406/171119_24e534c03d4ik5hh9h98885441dbj_640x960.jpg",
                        "item_id": "1koc7q2",
                        "itemLikes": 94,
                        "discountPrice": "129",
                        "discount": 648,
                        "acm": "3.mce.1_4_1koc7q2.5018.0-33202.9m17ErVEE6aEB.sd_119_115-mid_5018-pos_0-pm_014-lc_201",
                        "title": "2017新款冬季轻薄羽绒服男士修身短款青年加厚帅气羽绒冬外套",
                        "isShelf": 0,
                        "shop_id": "1oriro",
                        "itemSale": 2,
                        "price": "199",
                        "cfav": 94,
                        "item_url": "/pages/detail/pages/normal/index?itemId=1koc7q2&acm=3.mce.1_4_1koc7q2.5018.0-33202.9m17ErVEE6aEB.sd_119_115-mid_5018-pos_0-pm_014-lc_201",
                        "item_h5_url": "//h5.mogu.com/detail-normal/index.html?itemId=1koc7q2&acm=3.mce.1_4_1koc7q2.5018.0-33202.9m17ErVEE6aEB.sd_119_115-mid_5018-pos_0-pm_014-lc_201"
                    }, {
                        "tradeItemId": 653142197,
                        "image": "https://s11.mogucdn.com/mlcdn/c45406/171126_268i3hilcgial6li7g8iehka6379k_640x960.jpg",
                        "item_id": "1llq7j6",
                        "itemLikes": 245,
                        "discountPrice": "139",
                        "discount": 577,
                        "acm": "3.mce.1_4_1llq7j6.5018.0-33202.9m17ErVEE6aEB.sd_119_115-mid_5018-pos_1-pm_014-lc_201",
                        "title": "羽绒服男士修身加厚中长款2017冬季新款青年韩版羽绒服男外套",
                        "isShelf": 0,
                        "shop_id": "1oriro",
                        "itemSale": 10,
                        "price": "241",
                        "cfav": 245,
                        "item_url": "/pages/detail/pages/normal/index?itemId=1llq7j6&acm=3.mce.1_4_1llq7j6.5018.0-33202.9m17ErVEE6aEB.sd_119_115-mid_5018-pos_1-pm_014-lc_201",
                        "item_h5_url": "//h5.mogu.com/detail-normal/index.html?itemId=1llq7j6&acm=3.mce.1_4_1llq7j6.5018.0-33202.9m17ErVEE6aEB.sd_119_115-mid_5018-pos_1-pm_014-lc_201"
                    }, {
                        "tradeItemId": 659675465,
                        "image": "https://s5.mogucdn.com/mlcdn/c45406/180316_13aeki84kij4129h78f7lgd9dekhd_640x960.jpg",
                        "item_id": "1lti9qi",
                        "itemLikes": 0,
                        "discountPrice": "114",
                        "discount": 1000,
                        "acm": "3.mce.1_4_1lti9qi.5018.0-33202.9m17ErVEE6aEB.sd_119_115-mid_5018-pos_2-pm_014-lc_201",
                        "title": "[一套】韩版修身时尚潮流两件套日系男士夏季t恤套装休闲百搭格子青少年学生五分裤短裤",
                        "isShelf": 0,
                        "shop_id": "1oriro",
                        "itemSale": 0,
                        "price": "114",
                        "cfav": 0,
                        "item_url": "/pages/detail/pages/normal/index?itemId=1lti9qi&acm=3.mce.1_4_1lti9qi.5018.0-33202.9m17ErVEE6aEB.sd_119_115-mid_5018-pos_2-pm_014-lc_201",
                        "item_h5_url": "//h5.mogu.com/detail-normal/index.html?itemId=1lti9qi&acm=3.mce.1_4_1lti9qi.5018.0-33202.9m17ErVEE6aEB.sd_119_115-mid_5018-pos_2-pm_014-lc_201"
                    }, {
                        "tradeItemId": 672771666,
                        "image": "https://s5.mogucdn.com/mlcdn/c45406/180927_8cf51he66h560be6ffcbb9974h64b_640x960.jpg",
                        "item_id": "1m93nx8",
                        "itemLikes": 11,
                        "discountPrice": "179",
                        "discount": 785,
                        "acm": "3.mce.1_4_1m93nx8.5018.0-33202.9m17ErVEE6aEB.sd_119_115-mid_5018-pos_3-pm_014-lc_201",
                        "title": "男士棉衣冬季中长款加厚外套韩版潮流个性羽绒棉服男装帅气棉袄子",
                        "isShelf": 0,
                        "shop_id": "1oriro",
                        "itemSale": 2,
                        "price": "228",
                        "cfav": 11,
                        "item_url": "/pages/detail/pages/normal/index?itemId=1m93nx8&acm=3.mce.1_4_1m93nx8.5018.0-33202.9m17ErVEE6aEB.sd_119_115-mid_5018-pos_3-pm_014-lc_201",
                        "item_h5_url": "//h5.mogu.com/detail-normal/index.html?itemId=1m93nx8&acm=3.mce.1_4_1m93nx8.5018.0-33202.9m17ErVEE6aEB.sd_119_115-mid_5018-pos_3-pm_014-lc_201"
                    }, {
                        "tradeItemId": 611986831,
                        "image": "https://s5.mogucdn.com/p2/170318/108801298_67alc46hljh12d6cl7db8gbh595gl_640x960.jpg",
                        "item_id": "1k8q05y",
                        "itemLikes": 1461,
                        "discountPrice": "79",
                        "discount": 693,
                        "acm": "3.mce.1_4_1k8q05y.5018.0-33202.9m17ErVEE6aEB.sd_119_115-mid_5018-pos_4-pm_014-lc_201",
                        "title": "[一套】夏季九分裤中裤套装男青年韩版修身时尚潮流裤休闲两件套",
                        "isShelf": 0,
                        "shop_id": "1oriro",
                        "itemSale": 1,
                        "price": "114",
                        "cfav": 1461,
                        "item_url": "/pages/detail/pages/normal/index?itemId=1k8q05y&acm=3.mce.1_4_1k8q05y.5018.0-33202.9m17ErVEE6aEB.sd_119_115-mid_5018-pos_4-pm_014-lc_201",
                        "item_h5_url": "//h5.mogu.com/detail-normal/index.html?itemId=1k8q05y&acm=3.mce.1_4_1k8q05y.5018.0-33202.9m17ErVEE6aEB.sd_119_115-mid_5018-pos_4-pm_014-lc_201"
                    }, {
                        "tradeItemId": 685676592,
                        "image": "https://s5.mogucdn.com/mlcdn/c45406/191129_8c81blh30e56e068jkdhcb974hkdk_640x960.jpg",
                        "item_id": "1moguxk",
                        "itemLikes": 2,
                        "discountPrice": "240",
                        "discount": 1000,
                        "acm": "3.mce.1_4_1moguxk.5018.0-33202.9m17ErVEE6aEB.sd_119_115-mid_5018-pos_5-pm_014-lc_201",
                        "title": "棉衣男新款冬季中长款加厚外套潮流韩版棉袄衣服毛领冬天棉服",
                        "isShelf": 0,
                        "shop_id": "1oriro",
                        "itemSale": 0,
                        "price": "240",
                        "cfav": 2,
                        "item_url": "/pages/detail/pages/normal/index?itemId=1moguxk&acm=3.mce.1_4_1moguxk.5018.0-33202.9m17ErVEE6aEB.sd_119_115-mid_5018-pos_5-pm_014-lc_201",
                        "item_h5_url": "//h5.mogu.com/detail-normal/index.html?itemId=1moguxk&acm=3.mce.1_4_1moguxk.5018.0-33202.9m17ErVEE6aEB.sd_119_115-mid_5018-pos_5-pm_014-lc_201"
                    }, {
                        "tradeItemId": 683896165,
                        "image": "https://s11.mogucdn.com/mlcdn/c45406/191020_814ilgcc13g7c0eahkbk9jeji93g1_640x960.jpg",
                        "item_id": "1mmcjcy",
                        "itemLikes": 10,
                        "discountPrice": "129",
                        "discount": 763,
                        "acm": "3.mce.1_4_1mmcjcy.5018.0-33202.9m17ErVEE6aEB.sd_119_115-mid_5018-pos_6-pm_014-lc_201",
                        "title": "工装外套男士秋冬季加绒上衣服韩版潮流褂子2019年新款夹克",
                        "isShelf": 0,
                        "shop_id": "1oriro",
                        "itemSale": 4,
                        "price": "169",
                        "cfav": 10,
                        "item_url": "/pages/detail/pages/normal/index?itemId=1mmcjcy&acm=3.mce.1_4_1mmcjcy.5018.0-33202.9m17ErVEE6aEB.sd_119_115-mid_5018-pos_6-pm_014-lc_201",
                        "item_h5_url": "//h5.mogu.com/detail-normal/index.html?itemId=1mmcjcy&acm=3.mce.1_4_1mmcjcy.5018.0-33202.9m17ErVEE6aEB.sd_119_115-mid_5018-pos_6-pm_014-lc_201"
                    }, {
                        "tradeItemId": 659676074,
                        "image": "https://s5.mogucdn.com/mlcdn/c45406/180316_5a6140df11hdh6h72d2i6k25j46kk_640x960.jpg",
                        "item_id": "1ltiaoc",
                        "itemLikes": 2,
                        "discountPrice": "114",
                        "discount": 1000,
                        "acm": "3.mce.1_4_1ltiaoc.5018.0-33202.9m17ErVEE6aEB.sd_119_115-mid_5018-pos_7-pm_014-lc_201",
                        "title": "[一套】新款两件套韩版修身时尚潮流日系男士夏季t恤套装休闲百搭格子青少年学生五分裤短裤",
                        "isShelf": 0,
                        "shop_id": "1oriro",
                        "itemSale": 0,
                        "price": "114",
                        "cfav": 2,
                        "item_url": "/pages/detail/pages/normal/index?itemId=1ltiaoc&acm=3.mce.1_4_1ltiaoc.5018.0-33202.9m17ErVEE6aEB.sd_119_115-mid_5018-pos_7-pm_014-lc_201",
                        "item_h5_url": "//h5.mogu.com/detail-normal/index.html?itemId=1ltiaoc&acm=3.mce.1_4_1ltiaoc.5018.0-33202.9m17ErVEE6aEB.sd_119_115-mid_5018-pos_7-pm_014-lc_201"
                    }, {
                        "tradeItemId": 667197637,
                        "image": "https://s5.mogucdn.com/mlcdn/c45406/180525_4ld891cebkdh7a8k3d0ldjfd5cfc3_640x960.jpg",
                        "item_id": "1m2gq0y",
                        "itemLikes": 128,
                        "discountPrice": "85",
                        "discount": 1000,
                        "acm": "3.mce.1_4_1m2gq0y.5018.0-33202.9m17ErVEE6aEB.sd_119_115-mid_5018-pos_8-pm_014-lc_201",
                        "title": "防晒衣男韩版潮流青少年2018新款夏季超薄透气防紫外线防晒服外套",
                        "isShelf": 0,
                        "shop_id": "1oriro",
                        "itemSale": 0,
                        "price": "85",
                        "cfav": 128,
                        "item_url": "/pages/detail/pages/normal/index?itemId=1m2gq0y&acm=3.mce.1_4_1m2gq0y.5018.0-33202.9m17ErVEE6aEB.sd_119_115-mid_5018-pos_8-pm_014-lc_201",
                        "item_h5_url": "//h5.mogu.com/detail-normal/index.html?itemId=1m2gq0y&acm=3.mce.1_4_1m2gq0y.5018.0-33202.9m17ErVEE6aEB.sd_119_115-mid_5018-pos_8-pm_014-lc_201"
                    }, {
                        "tradeItemId": 624706109,
                        "image": "https://s11.mogucdn.com/mlcdn/c45406/171018_35hi2g9cc0e8glf5ihefhea1d684g_640x960.jpg",
                        "item_id": "1knv8oi",
                        "itemLikes": 3442,
                        "discountPrice": "149",
                        "discount": 584,
                        "acm": "3.mce.1_4_1knv8oi.5018.0-33202.9m17ErVEE6aEB.sd_119_115-mid_5018-pos_9-pm_014-lc_201",
                        "title": "秋冬男士中长款羽绒服男韩版青年连帽加厚男冬季外套学生上衣潮流",
                        "isShelf": 0,
                        "shop_id": "1oriro",
                        "itemSale": 17,
                        "price": "255",
                        "cfav": 3442,
                        "item_url": "/pages/detail/pages/normal/index?itemId=1knv8oi&acm=3.mce.1_4_1knv8oi.5018.0-33202.9m17ErVEE6aEB.sd_119_115-mid_5018-pos_9-pm_014-lc_201",
                        "item_h5_url": "//h5.mogu.com/detail-normal/index.html?itemId=1knv8oi&acm=3.mce.1_4_1knv8oi.5018.0-33202.9m17ErVEE6aEB.sd_119_115-mid_5018-pos_9-pm_014-lc_201"
                    }, {
                        "tradeItemId": 659553872,
                        "image": "https://s5.mogucdn.com/mlcdn/c45406/180315_58ddc4i996ibb94ee4bj4i7d2bkje_640x960.jpg",
                        "item_id": "1ltd23c",
                        "itemLikes": 0,
                        "discountPrice": "128",
                        "discount": 1000,
                        "acm": "3.mce.1_4_1ltd23c.5018.0-33202.9m17ErVEE6aEB.sd_119_115-mid_5018-pos_10-pm_014-lc_201",
                        "title": "（一套）2018春夏新款韩版百搭品质日系亚麻短袖九分裤t恤男士复古宽松棉麻短袖套装潮男",
                        "isShelf": 0,
                        "shop_id": "1oriro",
                        "itemSale": 0,
                        "price": "128",
                        "cfav": 0,
                        "item_url": "/pages/detail/pages/normal/index?itemId=1ltd23c&acm=3.mce.1_4_1ltd23c.5018.0-33202.9m17ErVEE6aEB.sd_119_115-mid_5018-pos_10-pm_014-lc_201",
                        "item_h5_url": "//h5.mogu.com/detail-normal/index.html?itemId=1ltd23c&acm=3.mce.1_4_1ltd23c.5018.0-33202.9m17ErVEE6aEB.sd_119_115-mid_5018-pos_10-pm_014-lc_201"
                    }, {
                        "tradeItemId": 672290734,
                        "image": "https://s11.mogucdn.com/mlcdn/c45406/180913_14kci2de7d5gh8009jl1372j52a43_640x960.jpg",
                        "item_id": "1m8j1qs",
                        "itemLikes": 7,
                        "discountPrice": "159",
                        "discount": 799,
                        "acm": "3.mce.1_4_1m8j1qs.5018.0-33202.9m17ErVEE6aEB.sd_119_115-mid_5018-pos_11-pm_014-lc_201",
                        "title": "冬季外套男韩版潮流冬装棉袄男士2018新款加厚羽绒棉服中长款棉衣",
                        "isShelf": 0,
                        "shop_id": "1oriro",
                        "itemSale": 2,
                        "price": "199",
                        "cfav": 7,
                        "item_url": "/pages/detail/pages/normal/index?itemId=1m8j1qs&acm=3.mce.1_4_1m8j1qs.5018.0-33202.9m17ErVEE6aEB.sd_119_115-mid_5018-pos_11-pm_014-lc_201",
                        "item_h5_url": "//h5.mogu.com/detail-normal/index.html?itemId=1m8j1qs&acm=3.mce.1_4_1m8j1qs.5018.0-33202.9m17ErVEE6aEB.sd_119_115-mid_5018-pos_11-pm_014-lc_201"
                    }],
                offsetTopYs: [],
                currentIndex: 0,
            }
        },
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShop,
            DetailGoodInfo,
            DetailParamInfo,
            DetailCommentInfo,
            DetailBottomBar,
            GoodsList,
            BScroll,
        },
        created() {
            //获取iid
            this.iid = this.$route.params.iid;

            //获取详情数据
            getDetail(this.iid).then(res => {
                //获取数据
                // this.goodDetail = res;
                // console.log(this.goodDetail);

                //获取顶部图片
                this.topImages = this.goodDetail.topImages;
                // console.log(this.topImages);

                //获取商品信息
                this.good = new Good(this.goodDetail.itemInfo, this.goodDetail.priceInfo.priceTags[0], this.goodDetail.itemServices.services);

                //获取店铺信息
                this.shop = new Shop(this.goodDetail.shopInfo);
                // this.paramInfo = new ParamInfo();

                //获取商品详细信息
                this.goodInfo = this.goodDetail.detailInfo;

                //获取商品参数
                this.paramInfo = new ParamInfo(this.goodDetail.itemParams.info, this.goodDetail.itemParams.rule)

                //获取评论信息
                if (this.goodDetail.rateInfo.cRate !== 0)
                    this.commentInfo = this.goodDetail.rateInfo.list;
            })

            //获取推荐数据
            getRecommend().then(res => {
                // this.recommends = res.data.list
            })
        },
        mixins: [itemImgLoadMixin, backTopMixin],
        destroyed() {
            this.$bus.$off('itemImgLoad', this.itemImgListener)
        },
        methods: {
            ...mapActions({
                map_addToCart: 'addToCart'
            }),
            goodInfoImageLoad() {
                this.$refs.scroll.refresh();
                this.offsetTopYs.push(0);
                this.offsetTopYs.push(-this.$refs.param.$el.offsetTop);
                this.offsetTopYs.push(-this.$refs.comment.$el.offsetTop);
                this.offsetTopYs.push(-this.$refs.recommend.$el.offsetTop);
                /*
                Number.MIN_VALUE表示的最小值为5e-324
                MIN_VALUE代表的并不是负最小，而是最接近0的一个数
                负最小值可以使用-Number.MAX_VALUE表示
                * */
                this.offsetTopYs.push(-Number.MAX_VALUE);
                // this.offsetTopYs = [0,this.$refs.param.$el.offsetTop,this.$refs.comment.$el.offsetTop,this.$refs.recommend.$el.offsetTop];
                // console.log(this.offsetTopYs);
            },
            itemClick(index) {
                // console.log(index);
                this.$refs.scroll.scrollTo(0, this.offsetTopYs[index], 200);
            },
            scroll(position) {
                //判断backTop是否显示
                this.listenerShowBackTop(position)

                // console.log(position.y);
                let offsetTopYsLength = this.offsetTopYs.length
                // for (let index = 0; index < offsetTopYsLength; index++) {
                //     if (this.currentIndex !== index && ((index < offsetTopYsLength - 1 && position.y <=
                //         this.offsetTopYs[index] && position.y > this.offsetTopYs[index + 1]) ||
                //         (index === offsetTopYsLength - 1 && position.y <= this.offsetTopYs[index]))) {
                //         this.currentIndex = index;
                //         this.$refs.nav.currentIndex = this.currentIndex
                //         // console.log(index);
                //     }
                // }
                //写法二空间换时间，提高性能，减少写代码时间
                for (let index = 0; index < offsetTopYsLength - 1; index++) {
                    if (this.currentIndex !== index && (position.y <= this.offsetTopYs[index] &&
                        position.y > this.offsetTopYs[index + 1])) {
                        this.currentIndex = index;
                        this.$refs.nav.currentIndex = this.currentIndex
                        // console.log(index);
                    }
                }
            },
            addToCart(){
                const product = {
                    'iid': this.iid,
                    'img': this.topImages[0],
                    'title': this.good.title,
                    'desc': this.good.desc,
                    'price': this.good.nowPrice,
                };
                this.map_addToCart(product).then(res=>{
                    this.$toast.show(res)
                })
            }
        }
    }
</script>

<style scoped>
    .detail {
        position: relative;
        z-index: 12;
        background: #fff;
        height: 100vh;
    }

    .nav-bar {
        position: relative;
        z-index: 10;
    }

    .detail-scroll {
        position: absolute;
        top: 44px;
        bottom: 49px;
        overflow: hidden;
    }
</style>