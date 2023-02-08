<template>
    <div class="container">
        <h1>HOME PAGE</h1>
        <!-- <ul class="list-unstyled" v-if="movies.length">
            <li v-for="movie in movies" :key="movie.id">
                <a role="button" @click="onTitleClick(movie.id)">{{ movie.title }}</a>
            </li>
        </ul> -->
        <template v-if="imdb.movies && imdb.movies.length">
            <table cellpadding="0" cellspacing="0" role="presentation" width="100%">
                <tr v-for="movie in imdb.movies" :key="movie.id" role="button" @click="onTitleClick(movie.id)">
                    <td width="100%" class="pb-2">
                        <table cellpadding="0" cellspacing="0" role="presentation" width="100%">
                            <tr class="list-row">
                                <td valign="top" width="100" class="wrapper-image pe-2">
                                    <img :src="movie.image ? movie.image.url : 'assets/No-Image-Placeholder.png'" class="img-fluid" />
                                </td>
                                <td valign="top" class="pt-2 pb-2">{{ movie.title }}</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <nav v-if="imdb.movies.length" aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item" :class="imdb.currentPageIndex === 0 ? 'disabled' : ''">
                        <a class="page-link" role="button" aria-label="Previous" @click="onPageinationClick('-')">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li class="page-item" v-if="imdb.currentPageIndex > 9">
                        <a class="page-link" role="button" aria-label="PreviousSection" @click="loadSection('previous')">
                            <span aria-hidden="true">...</span>
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
                    <li class="page-item" v-if="imdb.pagesTotal > 10">
                        <a class="page-link" role="button" aria-label="NextSection" @click="loadSection('next')">
                            <span aria-hidden="true">...</span>
                        </a>
                    </li>
                    <li class="page-item" :class="imdb.currentPageIndex === imdb.pagesTotal - 1 ? 'disabled' : ''">
                        <a class="page-link" role="button" aria-label="Next" @click="onPageinationClick('+')">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </template>
        <template v-else-if="imdb.movies && imdb.movies.length === 0 && imdb.searchStr.length">
            No results
        </template>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useImdbStore } from '@/store/imdb/imdb';

const router = useRouter();
const imdb = useImdbStore();

function onTitleClick(event) { 
    const movie = imdb.movies.find(e => e.id === event);

    imdb.movie = movie;
    imdb.plot = '';

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

function onPageinationClick(key) {
    let pageKey;
    switch (key) { 
    case '+':
        pageKey = imdb.get_currentPageIndex.value + 1;
        break;
    case '-':
        pageKey = imdb.get_currentPageIndex.value - 1;
        break;
    default:
        pageKey = key;
    }

    imdb.sectionIndex = pageKey - (pageKey % 10);

    imdb.fetch_movies(imdb.get_searchStr, pageKey);
}
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
