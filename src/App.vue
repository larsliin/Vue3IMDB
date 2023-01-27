<template>
    <div>
        <main-navigation></main-navigation>
        <div class="wrapper">
            <div class="loader" v-if="loading">
                <div class="spinner"></div>
            </div>
            <div class="py-4">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>

import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
    name: "App",
    setup() {
        const store = useStore();

        const loading = computed(() => store.getters['imdb/get_loading']);
        return {
            loading,
        }
    }

};
</script>

<style scoped>
.wrapper {
    position: relative;
    min-height: calc(100vh - 70px);
}
.loader{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, .5);
    z-index: 10;
}
</style>
