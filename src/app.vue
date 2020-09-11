<template>
    <div id="app">
        this is app.vue
        <navigation></navigation>
        <router-view></router-view>
    </div>
</template>
<script>
import Navigation from './navigation/index.vue';

export default {
    components: {
        Navigation
    },
    created(){
        this.$store.dispatch( 'loadCafes' );
        this.$store.dispatch( 'loadUser' );
    },
    mounted() {
        this.$store.dispatch('loadBrewMethods');
    }
}
</script>