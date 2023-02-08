<template>
    <div class="container" v-if="imdb.movie">
        <div class="row">
            <div class="col-sm-4">
                <img :src="imdb.movie.image ? imdb.movie.image.url : '../assets/No-Image-Placeholder.png'" class="img-fluid" />
            </div>
            <div class="col-sm-8">
                <ul class="list-unstyled">
                    <li v-if="imdb.movie.title">
                        <strong>Title:</strong> {{ imdb.movie.title }}
                    </li>
                    <li v-if="imdb.movie.titleType">
                        <strong>Type:</strong> {{ imdb.movie.titleType }}
                    </li>
                    <li v-if="imdb.movie.year">
                        <strong>Year:</strong> {{ imdb.movie.year }}
                    </li>
                    <li v-if="starringList">
                        <strong>Starring:</strong> {{ starringList }}
                    </li>
                </ul>
                <content-placeholder v-if="!plot" />
                <p>
                    {{ plot }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed, onMounted } from 'vue';
import { useImdbStore } from '@/store/imdb/imdb';
import contentPlaceholder from '@/components/ContentPlaceholder.vue';

const route = useRoute();
const imdb = useImdbStore();

const starringList = computed(() => {
    return imdb.get_movie.principals ? imdb.get_movie.principals.map(e => e.name).join(', ') : null;
});
        
const getMovieId = computed(() => { 
    const arr = imdb.get_movie.id.split('/');
    return arr.filter(e => e === 0 || e)[1];
});

const plot = computed(() => { 
    imdb.fetch_plot(getMovieId.value);
    return imdb.get_plot;
});

onMounted(async() => { 
    if (!imdb.get_movie) { 
        imdb.fetch_movie(route.params.id);
    }
});
</script>

<style scoped>
</style>
