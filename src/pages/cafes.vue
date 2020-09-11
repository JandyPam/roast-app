<template>
    <div id="cafes">
        <div class="cafes-inner">
            <div class="cafes-inner_left cell">
                <cafe-map></cafe-map>
            </div>
            <div class="cafes-inner_right cell">

            </div>
        </div>
    </div>
</template>
<script>
import CafeMap from './../cafemap/index.vue';
export default {
    components: {
        CafeMap
    }
}
</script>
<style scoped>
    .cafes-inner_left{
        margin: 0 auto;
        width: 75%;
    }
</style>