<template>
    <div class="container" v-if="movie">
        <div class="row">
            <div class="col-sm-4">
                <img :src="movie.image ? movie.image.url : '../assets/No-Image-Placeholder.png'" class="img-fluid" />
            </div>
            <div class="col-sm-8">
                <ul class="list-unstyled">
                    <li v-if="movie.title">
                        <strong>Title:</strong> {{ movie.title }}
                    </li>
                    <li v-if="movie.titleType">
                        <strong>Type:</strong> {{ movie.titleType }}
                    </li>
                    <li v-if="movie.year">
                        <strong>Year:</strong> {{ movie.year }}
                    </li>
                    <li v-if="starringList">
                        <strong>Starring:</strong> {{ starringList }}
                    </li>
                </ul>
                <p>
                    {{ plot }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { computed, onMounted, ref } from 'vue';

const store = useStore();
const route = useRoute();

const movie = computed(() => store.getters['imdb/get_movie']);
        
const starringList = computed(() => {
    return movie.value.principals ? movie.value.principals.map(e => e.name).join(', ') : null;
});
        
const getMovieId = computed(() => { 
    const arr = movie.value.id.split('/');
    return arr.filter(e => e === 0 || e)[1];
});
        
const plot = computed(() => { 
    store.dispatch('imdb/fetch_plot', { id: getMovieId.value });
    return store.getters['imdb/get_plot'];
});

onMounted(async() => { 
    if (!store.getters['imdb/get_movie']) { 
        store.dispatch('imdb/fetch_movie', { id: route.params.id });
    }
});
</script>

<style scoped>
</style>
