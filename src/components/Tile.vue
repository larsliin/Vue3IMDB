<template>
    
    <div class="wrapper">
        <div class="img-wrapper">
            <img @load="onThumbLoaded"
                :src="movie.image ? movie.image.url : 'assets/No-Image-Placeholder.png'" class="img-fluid" />
                <div class="thumb-placeholder"><spinner /></div>
        </div>
        <div class="m-3">
            <h6>{{ movie.title }}</h6>
            <p>{{ movie.year }}</p>
        </div>
    </div>  
</template>

<script setup>
import Spinner from '@/components/Spinner.vue';

defineProps({
    movie: Object,
});

function onThumbLoaded(event) { 
    event.target.classList.add('loaded')
}
</script>
<style scoped>
    .wrapper {
        background-color: #fff;
        height: 100%;
        box-shadow: 0 0 5px 0px rgba(0, 0, 0, .15);
        border-radius: 20px;
        overflow: hidden;
        transition: transform .075s, box-shadow .075s;
        cursor: pointer;
    }

    .wrapper:hover {
        transform: scale(1.025);
        box-shadow: 0 0 15px 5px rgba(0, 0, 0, .25);
    }

    .spinner {
        border-width: 5px;
        height: 36px;
        left: 50%;
        margin: -18px 0 0 -18px;
        position: absolute;
        top: 50%;
        width: 36px;
    }

    .thumb-placeholder {
        height: 250px;
        position: relative;
    }

    img {
        box-shadow: 0 0 10px 5px rgba(0, 0, 0, .25);
        width: 100%;
        display: none;
    }
    img.loaded{
        display: block;
    }

    img.loaded + .thumb-placeholder {
        display: none;
    }

    
</style>
