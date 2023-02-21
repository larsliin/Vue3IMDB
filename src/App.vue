<template>
    <div>
        <main-navigation></main-navigation>
        <div class="loader" v-if="imdbStore.loading">
            <spinner-radial />
        </div>
        <router-view />
    </div>
</template>

<script setup>
    import { useImdbStore } from '@/store/imdbStore';
    import MainNavigation from '@/components/MainNavigation.vue';
    import spinnerRadial from '@/components/SpinnerRadial.vue';

    const imdbStore = useImdbStore();
</script>

<style scoped>
.loader{
    background-color: rgba(255, 255, 255, .5);
    height: 100%;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 10;
}
</style>
