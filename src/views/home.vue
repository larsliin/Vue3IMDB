<template>
    <div class="container">
        <template v-if="imdb.movies && imdb.movies.length">
            <p>Total results: {{ imdb.resultsTotal }}</p>
            <table cellpadding="0" cellspacing="0" role="presentation" width="100%">
                <tr v-for="movie in imdb.movies" :key="movie.id" role="button" @click="onTitleClick(movie.id)">
                    <td width="100%" class="pb-2">
                        <table cellpadding="0" cellspacing="0" role="presentation" width="100%">
                            <tr class="list-row">
                                <td valign="top" width="80" class="wrapper-image">
                                    <img @load="onThumbLoaded" width="80"
                                    :src="movie.image ? movie.image.url : 'assets/No-Image-Placeholder.png'" class="img-fluid" />
                                    <div class="thumb-placeholder"><div class="spinner"></div></div>
                                </td>
                                <td valign="top" class="pt-2 pb-2 ps-2">{{ movie.title }}</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
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
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useImdbStore } from '@/store/imdbStore';

const router = useRouter();
const imdb = useImdbStore();

function onThumbLoaded(event) { 
    event.target.classList.add('loaded')
}

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

async function onPageinationClick(key) {
    let pageKey;
    switch (key) { 
    case '+':
        console.log('+')
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

    // window.scrollTo(0, 0);
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

    .list-row {
        border-radius: 10px;
    }

    .list-row:hover {
        box-shadow: 0 0 10px 6px rgba(0, 0, 0, 0.1);
    }

    .list-row td:first-child{
        border-radius: 10px 0 0 10px;
        overflow: hidden;
    }

    .wrapper-image {
        width: 80px;
    }

    .thumb-placeholder {
        background-color: #eee;
        height: 100px;
        position: relative;
        width: 80px;
    }

    img {
        display: none;
    }
    img.loaded{
        display: block;
    }

    img.loaded + .thumb-placeholder {
        display: none;
    }

    .thumb-placeholder .spinner {
        border-width: 3px;
        height: 24px;
        left: 50%;
        margin: -12px 0 0 -12px;
        position: absolute;
        top: 50%;
        width: 24px;
    }
</style>
