<template>
    <div v-if="imdb.movies">
        <nav v-if="imdb.resultsTotal > 20" aria-label="Page navigation">
            <ul class="pagination">
                <li class="page-item" :class="imdb.currentPageIndex < 10 ? 'disabled' : ''" v-if="imdb.pagesTotal > 10">
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
    </div>
</template>

<script setup>
import { useImdbStore } from '@/store/imdbStore';

const imdb = useImdbStore();

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

</script>
<style scoped>
</style>
