<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <template v-if="imdbStore.movies && imdbStore.movies.length">
                    <p>Total results: {{ imdbStore.resultsTotal }}</p>
                    <div class="tiles">
                        <div v-for="movie in imdbStore.movies"
                            :key="movie.id"
                            @click="onTitleClick(movie.id)"
                            @keydown="onTitleClick(movie.id)"
                            class="tile">
                            <movie-tile :movie="movie" />
                        </div>
                    </div>
                    <pagination-navigation />
                </template>
                <template v-else-if="imdbStore.noresults">
                    No results
                </template>
                <teleport to="#modal">
                    <modal-container v-if="modalOpen" @close="onModalClose">
                        <movie-view
                            :movie="movieDetails"
                            :plot="moviePlot"
                            :credits="movieCredits"
                            @close="onModalClose" />
                    </modal-container>
                </teleport>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useRouter, useRoute } from 'vue-router';
    import { useImdbStore } from '@/store/imdbStore';
    import { ref, onMounted, watch } from 'vue';
    import movieView from '@/views/MovieView.vue';
    import movieTile from '@/components/MovieTile.vue';
    import modalContainer from '@/components/ModalContainer.vue';
    import paginationNavigation from '@/components/PaginationNavigation.vue';

    const router = useRouter();
    const route = useRoute();
    const imdbStore = useImdbStore();

    const movieDetails = ref();
    const modalOpen = ref(false);
    const moviePlot = ref();
    const movieCredits = ref();
    const loading = ref(false);
    let controllerDetails = new AbortController();
    let controllerPlot = new AbortController();
    let controllerActors = new AbortController();

    async function updateMovieDetails(movieId, clear = true) {
        if (clear) {
            movieDetails.value = null;
            moviePlot.value = null;
            movieCredits.value = null;
        }

        loading.value = true;
        modalOpen.value = true;

        // fetch selected movie full movieCredits
        imdbStore.fetch_actors(movieId, controllerActors.signal).then((response) => {
            if (!response.error) {
                movieCredits.value = response;
            }
        });

        // fetch selected movie plot
        imdbStore.fetch_plot(movieId, controllerPlot.signal).then((response) => {
            if (!response.error) {
                moviePlot.value = response;
            }
        });

        // fetch selected movie details
        await imdbStore.fetch_details(movieId, controllerDetails.signal).then((response) => {
            if (!response.error) {
                movieDetails.value = response;
            }
        });

        loading.value = false;
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

    function getMovieId(id) {
        const arr = id.split('/');
        return arr.filter((e) => e === 0 || e)[1];
    }

    async function onTitleClick(event) {
        const movie = imdbStore.movies.find((e) => e.id === event);
        const movieId = getMovieId(movie.id);

        // update browser URL
        router.push({
            name: 'Modal',
            params: {
                id: movieId,
            },
        });
    }

    watch(() => route.name, () => {
        if (route.params.id) {
            const isSame = movieDetails.value ? getMovieId(movieDetails.value.id) === route.params.id : false;

            if (!isSame) {
                // abort active fetch requests
                abortRequests();
            }

            updateMovieDetails(route.params.id, !isSame);
        } else {
            modalOpen.value = false;
        }
    });

    onMounted(async () => {
        if (route.params.id) {
            updateMovieDetails(route.params.id);
        } else {
            modalOpen.value = false;
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
