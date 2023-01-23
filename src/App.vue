<template>
    <main-navigation></main-navigation>
    <div class="view-wrapper">
        <router-view />
    </div>
</template>

<script>
// import { useStore } from 'vuex';

import MainNavigation from './components/MainNavigation.vue';

export default {
    name: "App",
    components: {
        MainNavigation
    },
    setup() {
        // const store = useStore();

        // console.log(store.dispatch('list/fetch_countries'));

    }
};
</script>

<style scoped>
.view-wrapper{
    padding: 16px 32px;
}
</style>
