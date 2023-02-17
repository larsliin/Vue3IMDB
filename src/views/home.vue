<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
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
                    <pagination></pagination>
                </template>
                <template v-else-if="imdb.noresults">
                    No results
                </template>
                <teleport to="#modal">
                    <modal v-if="modalOpen" @close="onModalClose">
                        <movie-details
                            :movie="movieDetailsSelected"
                            :plot="plot"
                            :credits="credits"
                            @close="onModalClose"></movie-details>
                    </modal>
                </teleport>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useImdbStore } from '@/store/imdbStore';
import { ref, onMounted } from 'vue';
import tile from '@/components/Tile.vue';
import modal from '@/components/Modal.vue';
import MovieDetails from '@/components/MovieDetails.vue';
import pagination from '@/components/Pagination.vue';

const router = useRouter();
const route = useRoute();
const imdb = useImdbStore();

const movieDetailsSelected = ref();
const modalOpen = ref(false);
const plot = ref();
const credits = ref();
const loading = ref(false);
let controllerDetails = new AbortController();
let controllerPlot = new AbortController();
let controllerActors = new AbortController();


async function onTitleClick(event) { 
    const movie = imdb.movies.find(e => e.id === event);
    const movieId = getMovieId(movie.id);

    // abourt active fetch requests
    abortRequests();

    modalOpen.value = true;

    // update browser URL
    router.push({
        name: 'Modal',
        params: {
            id: movieId,
        },
    });

    // load movie details if selected movie is different from previous selected
    if (!movieDetailsSelected.value || (movieDetailsSelected.value && (getMovieId(movieDetailsSelected.value.id) !== movieId))) {
        movieDetailsSelected.value = null;
        plot.value = null;
        credits.value = null;

        loading.value = true;

        // fetch selected movie plot
        imdb.fetch_plot(movieId, controllerPlot.signal).then((response) => { 
            plot.value = response;
        });

        // fetch selected movie full credits
        imdb.fetch_actors(movieId, controllerActors.signal).then((response) => { 
            credits.value = response;
        });

        // fetch selected movie details
        movieDetailsSelected.value = await imdb.fetch_details(movieId, controllerDetails.signal);

        loading.value = false;
    }
}

function onModalClose() { 
    modalOpen.value = false;
    router.push({
        name: 'Home',
    });
}

function abortRequests() {
    if (loading.value) { 
        controllerDetails.abort();
        controllerDetails = new AbortController();
        controllerPlot.abort();
        controllerPlot = new AbortController();
        controllerActors.abort();
        controllerActors = new AbortController();
    }
}

function getMovieId (id) { 
    const arr = id.split('/');
    return arr.filter(e => e === 0 || e)[1];
};

onMounted(async() => { 
    if (route.params.id) { 
        modalOpen.value = true;
        imdb.fetch_plot(route.params.id, controllerPlot.signal).then((response) => { 
            plot.value = response;
        });
        // fetch selected movie full credits
        imdb.fetch_actors(route.params.id, controllerActors.signal).then((response) => { 
            credits.value = response;
        });

        movieDetailsSelected.value = await imdb.fetch_details(route.params.id, controllerDetails.signal);
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
