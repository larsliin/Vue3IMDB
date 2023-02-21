<template>
    <div>
        <div class="modal-image-wrapper">
            <img
                alt=""
                v-if="movie"
                :src="imgSource" class="modal-image" />

            <div class="modal-image-gradient"></div>
        </div>

        <div class="px-5 py-2">
            <ul class="list-unstyled">
                <li>
                    <template v-if="movie">
                        <template v-if="movie.title">
                            <strong>Title:</strong> {{ movie.title }}
                        </template>
                    </template>
                    <template v-else>
                        <text-placeholder :lines="1" :width="'50%'" />
                    </template>
                </li>
                <li>
                    <template v-if="movie">
                        <template v-if="movie.titleType">
                            <strong>Type:</strong> {{ movie.titleType }}
                        </template>
                    </template>
                    <template v-else>
                        <text-placeholder :lines="1" :width="'25%'" />
                    </template>
                </li>
                <li>
                    <template v-if="movie">
                        <template v-if="movie.year">
                            <strong>Year:</strong> {{ movie.year }}
                        </template>
                    </template>
                    <template v-else>
                        <text-placeholder :lines="1" :width="'20%'" />
                    </template>
                </li>
                <li>
                    <template v-if="credits">
                        <template v-if="starringList">
                            <strong>Starring:</strong> {{ starringList }}
                        </template>
                    </template>
                    <template v-else>
                        <text-placeholder :lines="1" :width="'65%'" />
                    </template>
                </li>
            </ul>
            <template v-if="plot">
                <p>
                    {{ plot }}
                </p>
            </template>
            <template v-else>
                <text-placeholder :width="'33%'" />
            </template>
        </div>
    </div>
</template>

<script setup>

    import { computed } from 'vue';
    import textPlaceholder from '@/components/TextPlaceholder.vue';

    const props = defineProps({
        movie: Object,
        plot: String,
        credits: Object,
    });

    const starringList = computed(() => (props.credits.cast ? props.credits.cast.map((e) => e.name).join(', ') : null));
    const imgSource = computed(() => (props.movie.image ? props.movie.image.url : '/assets/No-Image-Placeholder-Large.png'));

</script>

<style scoped>
    .modal-image-wrapper {
        height: 400px;
        position: relative;
        background-color: #ccc;
        overflow: hidden;
    }

    .modal-image {
        width: 100%;
    }

    .modal-image-gradient {
        background: transparent;
        background: linear-gradient(0deg, rgba(1,4,64,1) 0%, rgba(1,4,64,0) 100%);
        bottom: 0;
        height: 50%;
        position: absolute;
        width: 100%;
    }
</style>
