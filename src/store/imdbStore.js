import { defineStore } from 'pinia';
import actions from './_actions';
import getters from './_getters';

export const useImdbStore = defineStore('imdbStore', {
    state: () => ({
        currentPageIndex: 0,
        loading: false,
        movies: [],
        noresults: false,
        pagesTotal: 0,
        resultsTotal: 0,
        searchStr: '',
        sectionIndex: 0,
    }),
    actions,
    getters,
});
