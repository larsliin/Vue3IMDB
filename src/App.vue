<template>
    <div>
        <main-navigation></main-navigation>
        <div class="wrapper">
            <div class="loader" v-if="imdb.loading">
                <div class="spinner"></div>
            </div>
            <div class="py-4">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script setup>
import { useImdbStore } from '@/store/imdbStore';

const imdb = useImdbStore();
</script>

<style scoped>
.wrapper {
    position: relative;
}
.loader{
    background-color: rgba(255, 255, 255, .5);
    height: 100%;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 10;
}
</style>
