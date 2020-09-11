<template>
  <span class="toggle-like">
        <span class="like" v-on:click="likeCafe( cafe.id )"
            v-if="!liked && cafeLoadStatus === 2 && cafeLikeActionStatus !== 1 && cafeUnlikeActionStatus !== 1">
            喜欢
        </span>
        <span class="un-like" v-on:click="unlikeCafe( cafe.id )"
              v-if="liked && cafeLoadStatus === 2 && cafeLikeActionStatus !== 1 && cafeUnlikeActionStatus !== 1">
            取消喜欢
        </span>


        <loader v-show="cafeLikeActionStatus === 1 || cafeUnlikeActionStatus === 1"
            :width="30"
            :height="30"
            :display="'inline-block'">
        </loader>
  </span>
</template>
<script>
import Loader from './loader.vue';
    export default {
        components: {
            Loader
        },
        computed: {
            cafeLoadStatus() {//咖啡店加载状态码
               return this.$store.getters.getCafeLoadStatus;
            },

            cafe() { //咖啡店数据
                return this.$store.getters.getCafe;
            },

            liked() {// 是否已经标记为喜欢
                return this.$store.getters.getCafeLikedStatus;
            },

            cafeLikeActionStatus() {// 喜欢请求状态码
                return this.$store.getters.getCafeLikeActionStatus;
            },

            cafeUnlikeActionStatus() {// 取消喜欢请求状态码
                return this.$store.getters.getCafeUnlikeActionStatus;
            }
        },
        methods: {
            likeCafe(cafeID) { //添加喜欢
                this.$store.dispatch('likeCafe', {
                    id: this.cafe.id
                });
            },
            unlikeCafe(cafeID) { //取消喜欢
                this.$store.dispatch('unlikeCafe', {
                    id: this.cafe.id
                });
            }
        }
    }
</script>
<style scoped>
    .toggle-like{
        display: block;
        text-align: center;
        margin-top: 30px;
    }
    .toggle-like>span{
        display: inline-block;
        font-weight: bold;
        text-decoration: underline;
        font-size: 20px;
        cursor: pointer;
    }
    .toggle-like>span.like{
        color: #111;
    }
    .toggle-like>span.un-like{
        color: #ccc;
    }
</style>