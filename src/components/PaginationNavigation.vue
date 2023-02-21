<template>
    <div v-if="imdbStore.movies">
        <nav v-if="imdbStore.resultsTotal > 20" aria-label="Page navigation">
            <ul class="pagination">
                <li class="page-item" :class="imdbStore.currentPageIndex < 10 ? 'disabled' : ''" v-if="imdbStore.pagesTotal > 10">
                    <a class="page-link" role="button" aria-label="Previous" @click="loadSection('previous')">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item" :class="imdbStore.currentPageIndex === 0 ? 'disabled' : ''">
                    <a class="page-link" role="button" aria-label="Next" @click="onPageinationClick('-')">
                        <span aria-hidden="true">&#60;</span>
                    </a>
                </li>
                <li v-for="index in Math.min(imdbStore.pagesTotal, 10)" :key="index" class="page-item">
                    <a
                        class="page-link"
                        role="button"
                        :class="imdbStore.currentPageIndex === (index + imdbStore.sectionIndex) - 1 ? 'fw-bold' : ''"
                        @click="onPageinationClick((index + imdbStore.sectionIndex) - 1)">
                        {{ index + imdbStore.sectionIndex }}
                    </a>
                </li>
                <li class="page-item" :class="imdbStore.currentPageIndex === imdbStore.pagesTotal - 1 ? 'disabled' : ''">
                    <a class="page-link" role="button" aria-label="Next" @click="onPageinationClick('+')">
                        <span aria-hidden="true">&#62;</span>
                    </a>
                </li>
                <li class="page-item" :class="imdbStore.currentPageIndex === imdbStore.pagesTotal - 1 ? 'disabled' : ''" v-if="imdbStore.pagesTotal > 10">
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

    const imdbStore = useImdbStore();

    async function onPageinationClick(key) {
        let pageKey;
        switch (key) {
        case '+':
            pageKey = imdbStore.get_currentPageIndex + 1;
            break;
        case '-':
            pageKey = imdbStore.get_currentPageIndex - 1;
            break;
        default:
            pageKey = key;
        }

        imdbStore.sectionIndex = pageKey - (pageKey % 10);

        await imdbStore.fetch_movies(imdbStore.get_searchStr, pageKey);

        window.scrollTo(0, 0);
    }

    function loadSection(dir) {
        let key;
        switch (dir) {
        case 'previous':
            imdbStore.sectionIndex = imdbStore.get_sectionIndex - 10;

            key = imdbStore.get_sectionIndex + 9;
            break;
        case 'next':
            imdbStore.sectionIndex = imdbStore.get_sectionIndex + 10;
            key = imdbStore.get_sectionIndex;
            break;
        default:
        }
        onPageinationClick(key);
    }

</script>
<style scoped>
</style>
