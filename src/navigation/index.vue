<template>
    <div class="top-navigation">
        <router-link :to="{name: 'home'}">
            <span class="logo">Roast</span>
        </router-link>

        <ul class="links">
            <li>
                <router-link :to="{name: 'cafes'}">
                    Cafes
                </router-link>
            </li>
        </ul>

        <!-- <div class="right">
            <img :src="user.avatar" class="avatar" v-show="userLoadStatus == 2">
        </div> -->
    </div>
</template>
<script>
export default {
    // 定义组件的计算属性
    computed: {
        // 从 Vuex 中获取用户加载状态
        userLoadStatus(){
            return this.$store.getters.getUserLoadStatus;
        },

        // 从 Vuex 中获取用户信息
        user(){
            return this.$store.getters.getUser;
        }
    }
}
</script>
<style scoped>
.top-navigation{
    background-color: #fff;
    height: 50px;
    border-bottom: 2px solid #7F5F2A;
}
.top-navigation .logo{
    border-right: 1px solid #7F5F2A;
    display: block;
    float: left;
    height: 50px;
    line-height: 50px;
    padding: 0px 20px 0px 20px;
    font-family: 'Josefin Sans', sans-serif;
    font-weight: bold;
    color: #7F5F2A;
}
.top-navigation .logo:hover{
    color: white;
    background-color: #7F5F2A;
}

.top-navigation .links{
    margin: 0;
    padding: 0;
    display: block;
    float: left;
}
.top-navigation .links li{
    padding: 0 20px;
    display: inline-block;
    list-style-type: none;
    line-height: 50px;
}

.top-navigation .links li a{
    font-family: 'Lato', sans-serif;
    font-weight: bold;
    color: #111;
}
.top-navigation .links li a:hover{
    color: #7F5F2A;
}

.top-navigation .right{
    float: right;
}
.top-navigation .right .avatar{
    width: 40px;
    height: 40px;
    border-radius: 40px;
    margin-top: 5px;
    margin-right: 10px;
}
</style>