<template>
    <div class="container">
        <h1>HOME PAGE</h1>
        <!-- <ul class="list-unstyled" v-if="movies.length">
            <li v-for="movie in movies" :key="movie.id">
                <a role="button" @click="onTitleClick(movie.id)">{{ movie.title }}</a>
            </li>
        </ul> -->
        <table cellpadding="0" cellspacing="0" role="presentation" width="100%" v-if="movies.length">
            <tr v-for="movie in movies" :key="movie.id" role="button" @click="onTitleClick(movie.id)">
                <td width="100%" class="pb-2">
                    <table cellpadding="0" cellspacing="0" role="presentation" width="100%">
                        <tr class="list-row">
                            <!-- <td valign="top" width="100" class="wrapper-image pe-2">
                                <img :src="movie.image ? movie.image.url : 'assets/No-Image-Placeholder.png'" class="img-fluid" />
                            </td> -->
                            <td valign="top" class="pt-2 pb-2">{{ movie.title }}</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <nav v-if="movies.length" aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item" :class="currentPageIndex === 0 ? 'disabled' : ''">
                    <a class="page-link" role="button" aria-label="Previous" @click="onPageinationClick('-')">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item" v-if="currentPageIndex > 9">
                    <a class="page-link" role="button" aria-label="PreviousSection" @click="loadSection('previous')">
                        <span aria-hidden="true">...</span>
                    </a>
                </li>
                <li v-for="index in Math.min(pagesTotal, 10)" :key="index" class="page-item">
                    <a
                        class="page-link"
                        role="button"
                        :class="currentPageIndex === (index + sectionIndex) - 1 ? 'fw-bold' : ''"
                        @click="onPageinationClick((index + sectionIndex) - 1)">
                        {{ index + sectionIndex }}
                    </a>
                </li>
                <li class="page-item" v-if="pagesTotal > 10">
                    <a class="page-link" role="button" aria-label="NextSection" @click="loadSection('next')">
                        <span aria-hidden="true">...</span>
                    </a>
                </li>
                <li class="page-item" :class="currentPageIndex === pagesTotal - 1 ? 'disabled' : ''">
                    <a class="page-link" role="button" aria-label="Next" @click="onPageinationClick('+')">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script>
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'Home',
    setup() {
        const store = useStore();
        const router = useRouter();
        const movies = computed(() => store.getters['imdb/get_movies']);
        const pagesTotal = computed(() => store.getters['imdb/get_pagesTotal']);
        const currentPageIndex = ref(computed(() => store.getters['imdb/get_currentPageIndex']));
        const sectionIndex = ref(computed(() => store.getters['imdb/get_sectionIndex']));
        
        function onTitleClick(event) { 
            const movie = movies.value.find(e => e.id === event);

            store.commit('imdb/set_movie', movie);
            store.commit('imdb/set_plot', '');

            router.push({
                name: 'Details',
                params: {
                    id: getMovieId(movie.id),
                },
            });
        }

        function getMovieId (id) { 
            const arr = id.split('/');
            return arr.filter(e => e === 0 || e)[1];
        };

        function loadSection(dir) { 
            let key;
            switch (dir) { 
            case 'previous':
                store.commit('imdb/set_sectionIndex', sectionIndex.value - 10);
                // sectionIndex.value -= 10;
                    
                key = sectionIndex.value + 9;
                break;
            case 'next':
                store.commit('imdb/set_sectionIndex', sectionIndex.value + 10);
                // sectionIndex.value += 10;
                key = sectionIndex.value;
                break;
            }
            onPageinationClick(key);
        }

        function onPageinationClick(key) {
            let pageKey;
            switch (key) { 
            case '+':
                pageKey = currentPageIndex.value + 1;
                break;
            case '-':
                pageKey = currentPageIndex.value - 1;
                break;
            default:
                pageKey = key;
            }

            store.commit('imdb/set_sectionIndex', pageKey - (pageKey % 10));
            
            store.dispatch('imdb/fetch_movies', {
                paginationKey: pageKey,
                searchby: 'title',
                text: store.getters['imdb/get_searchStr'],
            });
        }
        
        return {
            movies,
            onTitleClick,
            onPageinationClick,
            pagesTotal,
            currentPageIndex,
            sectionIndex,
            loadSection,
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

    input[type="checkbox"] {
        margin-right: 8px;
    }

    .list-row:hover {
        background-color: #ccc;
    }

    .wrapper-image {
        width: 100px;
    }
</style>
