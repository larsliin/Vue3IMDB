<template>
    <div>
        <h1>HOME PAGE</h1>
        <div class="container"></div>
    </div>
</template>

<script>
// import ref from 'vue';
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'Home',
    setup() {
        const store = useStore();
        const movies = computed(() => store.getters['list/get_movies']);

        console.log(movies.value);

        onMounted(() => {
            store.dispatch('list/fetch_movies');
        });

        return {
            movies,
            store,
        };
    },
};
</script>
<style scoped>
    .wrapper {
        display: flex;
    }

    .wrapper > div {
        flex: 1;
    }

    ul {
        list-style: none;
        margin: 0;
        padding: 24px 0 0;
    }

    li {
        margin: 5px 0;
    }

    input[type="checkbox"] {
        margin-right: 8px;
    }

    .sticky {
        position: sticky;
        top: 0;
    }
</style>
