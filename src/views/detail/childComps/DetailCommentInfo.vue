<template>
    <div class="comment-info" v-if="Object.keys(commentInfo).length !== 0">
        <div class="info-header">
            <div class="header-title">用户评价</div>
            <div class="header-more">更多<i class="arrow-right"><img src="~assets/img/common/arrow-left.svg" width="14" alt=""></i></div>
        </div>
        <div v-for="index in commentInfo.length" class="comment-info-item">
            <div class="info-user">
                <img :src="commentInfo[index-1].user.avatar" alt="">
                <span>{{commentInfo[index-1].user.uname}}</span>
            </div>
            <div class="info-detail">
                <p>{{commentInfo[index-1].content}}</p>
                <div class="info-other">
                    <span class="date">{{commentInfo[index-1].created | showDate}}</span>
                    <span>{{commentInfo[index-1].style}}</span>
                </div>
            </div>
            <div class="info-imgs">
                <img :src="item" v-for="(item,index) in commentInfo.images" :key="index" alt="">
            </div>
        </div>
    </div>
</template>

<script>
    import {formatDate} from 'common/util'

    export default {
        name: "DetailCommentInfo",
        data() {
            return {}
        },
        props: {
            commentInfo: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        filters: {
            showDate: function (value) {
                //时间戳：秒，Date：毫秒 => 格式化对应字符串
                let date = new Date(value * 1000);
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
            }
        }
    }
</script>

<style scoped>
    .comment-info {
        padding: 5px 12px;
        color: #333;
        border-bottom: 5px solid #f2f5f8;
    }

    .info-header {
        height: 50px;
        line-height: 50px;
        /*background: #000;*/
    }

    .header-title {
        float: left;
        font-size: 15px;
    }

    .header-more {
        float: right;
        margin-right: 10px;
        font-size: 13px;
    }

    .arrow-right {
        /*display: inline-block;*/
        /*position: relative;*/
        /*left: 5px;*/
        /*top: 3px;*/
        /*width: 14px;*/
        /*height: 14px;*/
        /*background: url("~assets/img/common/arrow-left.svg") 0 0/14px 14px;*/

    }

    .comment-info-item {
        border-top: 1px solid rgba(0, 0, 0, .1);
    }

    .info-user {
        padding: 10px 0 5px;
    }

    .info-user img {
        width: 42px;
        height: 42px;
        border-radius: 50%;
    }

    .info-user span {
        position: relative;
        font-size: 15px;
        top: -15px;
        margin-left: 10px;
    }

    .info-detail {
        padding: 0 5px 15px;
    }

    .info-detail p {
        font-size: 14px;
        color: #777;
        line-height: 1.5;
    }

    .info-detail .info-other {
        font-size: 12px;
        color: #999;
        margin-top: 10px;
    }

    .info-other .date {
        margin-right: 8px;
    }

    .info-imgs {
        margin-top: 10px;
    }

    .info-imgs img {
        width: 70px;
        height: 79px;
        margin-right: 5px;
    }
</style>
</style>