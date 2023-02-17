
export default {
    get_currentPageIndex(state) {
        return state.currentPageIndex;
    },
    get_loading(state) { 
        return state.loading;
    },
    get_movies(state) {
        return state.movies;
    },
    get_noresults(state) { 
        return state.noresults;
    },
    get_pagesTotal(state) { 
        return state.pagesTotal;
    },
    get_resultsTotal(state) { 
        return state.resultsTotal;
    },
    get_searchStr(state) { 
        return state.searchStr;
    },
    get_sectionIndex(state) { 
        return state.sectionIndex;
    },
};
