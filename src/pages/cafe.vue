<template>
    <div id="cafe" class="page">
        <div class="page_inner">
            <div class="cell">
                <loader v-show="cafeLoadStatus === 1" :width="100" :height="100">
                </loader>

                <div class="cafe-page" v-show="cafeLoadStatus === 2">
                    <h2>{{ cafe.name }}</h2>
                    <h3 v-if="cafe.location_name !== ''">{{ cafe.location_name }}</h3>

                    <div class="grid-x">
                        <div class="cell">
                            <toggle-like></toggle-like>
                        </div>
                    </div>

                    <span class="address">
                        {{ cafe.address }}<br>
                        {{ cafe.city }}, {{ cafe.state }}<br>
                        {{ cafe.zip }}
                    </span>

                    <a class="website" v-bind:href="cafe.website" target="_blank">{{ cafe.website }}</a>

                    <div class="brew-methods-container">
                        <div class="grid-x grid-padding-x">
                            <div class="large-3 medium-4 small-12 cell" v-for="brewMethod in cafe.brew_methods">
                                {{ brewMethod.method }}
                            </div>
                        </div>
                    </div>

                    <br>

                    <individual-cafe-map></individual-cafe-map>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import Loader from './../commons/loader.vue';
    import IndividualCafeMap from './../IndividualCafeMap/index.vue';
    import ToggleLike from  './../commons/ToggleLike.vue';

    export default {
        // 定义页面使用的组件
        components: {
            Loader,
            IndividualCafeMap,
            ToggleLike
        },

        // 页面创建时通过路由中的参数ID加载咖啡店数据
        created() {
            this.$store.dispatch('loadCafe', {
                // id: this.$route.params.id
                id: 1
            });
        },

        // 定义计算属性
        computed: {
            // 咖啡加载状态
            cafeLoadStatus() {
                return this.$store.getters.getCafeLoadStatus;
            },
            // 咖啡列表
            cafe() {
                return this.$store.getters.getCafe;
            }
        }
    }
</script>
<style scoped>
    div.cafe-page h2 {
        text-align: center;
        color: #7F6D50;
        font-family: 'Josefin Sans', sans-serif;
    }

    div.cafe-page h3 {
        text-align: center;
        color: #FFBE54;
        font-family: 'Josefin Sans', sans-serif;
    }

    div.cafe-page span.address {
        text-align: center;
        display: block;
        font-family: 'Lato', sans-serif;
        color: #A0A0A0;
        font-size: 20px;
        line-height: 30px;
        margin-top: 50px;
    }

    div.cafe-page a.website {
        text-align: center;
        color: #CCAF80;
        font-size: 30px;
        font-weight: bold;
        margin-top: 50px;
        display: block;
        font-family: 'Josefin Sans', sans-serif;
    }

    div.cafe-page div.brew-methods-container {
        max-width: 700px;
        margin: auto;
    }
    div.cafe-page div.brew-methods-container div.cell {
        text-align: center;
    }
</style>