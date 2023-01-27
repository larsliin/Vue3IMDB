const listGetters = {
    get_movie(state) {
        return state.movie;
    },
    get_movies(state) {
        return state.movies;
    },
    get_plot(state) {
        return state.plot;
    },
    get_currentPageIndex(state) {
        return state.currentPageIndex;
    },
    get_resultsTotal(state) { 
        return state.resultsTotal;
    },
    get_pagesTotal(state) { 
        return state.pagesTotal;
    },
    get_searchStr(state) { 
        return state.searchStr;
    },
    get_loading(state) { 
        return state.loading;
    },
    get_sectionIndex(state) { 
        return state.sectionIndex;
    },
};

export default listGetters;
