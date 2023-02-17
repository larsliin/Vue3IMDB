<template>
    <div class="container">
        <template v-if="imdb.movies && imdb.movies.length">
            <p>Total results: {{ imdb.resultsTotal }}</p>
            
            <div class="tiles">
                <div v-for="movie in imdb.movies"
                    :key="movie.id"
                    @click="onTitleClick(movie.id)"
                    class="tile">
                    <tile :movie="movie"></tile>
                </div>
            </div>

            <nav v-if="imdb.resultsTotal > 20" aria-label="Page navigation">
                <ul class="pagination">
                    <li class="page-item" :class="imdb.currentPageIndex === 0 ? 'disabled' : ''" v-if="imdb.pagesTotal > 10">
                        <a class="page-link" role="button" aria-label="Previous" @click="loadSection('previous')">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li class="page-item" :class="imdb.currentPageIndex === 0 ? 'disabled' : ''">
                        <a class="page-link" role="button" aria-label="Next" @click="onPageinationClick('-')">
                            <span aria-hidden="true">&#60;</span>
                        </a>
                    </li>
                    <li v-for="index in Math.min(imdb.pagesTotal, 10)" :key="index" class="page-item">
                        <a
                            class="page-link"
                            role="button"
                            :class="imdb.currentPageIndex === (index + imdb.sectionIndex) - 1 ? 'fw-bold' : ''"
                            @click="onPageinationClick((index + imdb.sectionIndex) - 1)">
                            {{ index + imdb.sectionIndex }}
                        </a>
                    </li>
                    <li class="page-item" :class="imdb.currentPageIndex === imdb.pagesTotal - 1 ? 'disabled' : ''">
                        <a class="page-link" role="button" aria-label="Next" @click="onPageinationClick('+')">
                            <span aria-hidden="true">&#62;</span>
                        </a>
                    </li>
                    <li class="page-item" :class="imdb.currentPageIndex === imdb.pagesTotal - 1 ? 'disabled' : ''" v-if="imdb.pagesTotal > 10">
                        <a class="page-link" role="button" aria-label="Next" @click="loadSection('next')">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </template>
        <template v-else-if="imdb.noresults">
            No results
        </template>

        <teleport to="#modal">
            <modal v-if="selectedMovie" @close="onModalClose">
                <movie-details :movie="selectedMovie" :plot="plot" @close="onModalClose"></movie-details>
            </modal>
        </teleport>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useImdbStore } from '@/store/imdbStore';
import { ref, onMounted, watch } from 'vue';
import Tile from '@/components/Tile.vue';
import Modal from '@/components/Modal.vue';
import MovieDetails from '@/components/Details.vue';

const router = useRouter();
const route = useRoute();
const imdb = useImdbStore();

const selectedMovie = ref();
const plot = ref();

async function onTitleClick(event) { 
    const movie = imdb.movies.find(e => e.id === event);
    const movieId = getMovieId(movie.id);

    selectedMovie.value = movie;

    router.push({
        name: 'Modal',
        params: {
            id: movieId,
        },
    });

    plot.value = await imdb.fetch_plot(movieId);
}

function onModalClose() { 
    selectedMovie.value = null;
    plot.value = '';

    router.push({
        name: 'Home',
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
        imdb.sectionIndex = imdb.get_sectionIndex - 10;
        
        key = imdb.get_sectionIndex + 9;
        break;
    case 'next':
        imdb.sectionIndex = imdb.get_sectionIndex + 10;
        key = imdb.get_sectionIndex;
        break;
    }
    onPageinationClick(key);
}

async function onPageinationClick(key) {
    let pageKey;
    switch (key) { 
    case '+':
        pageKey = imdb.get_currentPageIndex + 1;
        break;
    case '-':
        pageKey = imdb.get_currentPageIndex - 1;
        break;
    default:
        pageKey = key;
    }

    imdb.sectionIndex = pageKey - (pageKey % 10);

    await imdb.fetch_movies(imdb.get_searchStr, pageKey);

    window.scrollTo(0, 0);
}

watch(route, () => {
    switch (route.name) { 
    case 'Home':
        selectedMovie.value = null;
        break;
    case 'Modal':
        break;
    default:
    }
})

onMounted(async() => { 
    if (route.params.id) { 
        const movie = await imdb.fetch_movie(route.params.id);
        
        selectedMovie.value = movie.results[0];

        plot.value = await imdb.fetch_plot(route.params.id);
    }
});
</script>

<style scoped>
    .tiles {
        column-gap: 20px;
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 50px;
        row-gap: 40px;
    }

    .tile {
        flex-basis: calc(50% - 15px);
    }

    @media only screen and (min-width: 768px) {
        .tile {
            flex-basis: calc(33% - 15px);
        }
    }

    @media only screen and (min-width: 992px) {
        .tile {
            flex-basis: calc(25% - 15px);
        }
    }

</style>
