<template>
    <div class="container">
        <h1>HOME PAGE</h1>
        <ul v-if="movies.length">
            <li v-for="movie in movies" :key="movie.id">
                <router-link class="nav-link" :to="`/details/${movie.title}`">{{ movie.title }}</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
import { useRoute } from 'vue-router';
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'Home',
    setup() {
        const store = useStore();
        const router = useRoute();
        const movies = computed(() => store.getters['imdb/get_movies']);

        onMounted(() => {
            // store.commit('imdb/set_movies', []);
            console.log(router);
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
