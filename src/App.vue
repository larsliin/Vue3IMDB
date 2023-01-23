<template>
    <main-navigation></main-navigation>
    <div class="view-wrapper">
        <router-view />
    </div>
</template>

<script>

import MainNavigation from './components/MainNavigation.vue';

export default {
    name: "App",
    components: {
        MainNavigation
    },
};
</script>

<style scoped>
.view-wrapper{
    padding: 16px 32px;
}
</style>
