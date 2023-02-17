<template>
    <div>
        <div class="modal-image-wrapper">
            <img
            :src="movie.image ? movie.image.url : 'assets/No-Image-Placeholder.png'" class="modal-image" />
            <div class="modal-image-gradient"></div>
        </div>
        <button class="close-button" @click="emit('close')"></button>
        <div class="px-5 py-2">
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
            <content-placeholder v-if="!plot" />
            <p>
                {{ plot }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import contentPlaceholder from '@/components/ContentPlaceholder.vue';

const emit = defineEmits(['close']);

const props = defineProps({
    movie: Object,
    plot: String,
});

const starringList = computed(() => {
    return props.movie.principals ? props.movie.principals.map(e => e.name).join(', ') : null;
});

</script>

<style scoped>
    .modal-image-wrapper {
        height: 400px;
        position: relative;
        overflow: hidden;
    }

    .modal-image {
        width: 100%;
    }

    .modal-image-gradient {
        height: 50%;
        position: absolute;
        width: 100%;
        bottom: 0;
        background: transparent;
        background: linear-gradient(0deg, rgba(1,4,64,1) 0%, rgba(1,4,64,0) 100%);
    }

    .close-button {
        align-items: center;
        background-color: #0BB3D9   ;
        border-radius: 50%;
        border: none;
        display: flex;
        font-size: 50px;
        height: 40px;
        justify-content: center;
        outline: none;
        padding: 0;
        position: absolute;
        right: 20px;
        top: 20px;
        width: 40px;
    }
    
    .close-button::before,
    .close-button::after {
        background-color: #010440;
        content: '';
        height: 25px;
        position: absolute;
        width: 4px;
    }
    .close-button::before {
        transform: rotate(-45deg);
    }
    .close-button::after {
        transform: rotate(45deg);
    }
</style>
