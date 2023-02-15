import { defineStore } from 'pinia';
import actions from './_actions';
import getters from './_getters';

export const useImdbStore = defineStore('imdbStore', {
    state: () => ({
        cast: null,
        currentPageIndex: 0,
        loading: false,
        movie: null,
        movies: [],
        noresults: false,
        pagesTotal: 0,
        plot: null,
        resultsTotal: 0,
        searchStr: '',
        sectionIndex: 0,
    }),
    actions,
    getters,
});
