const listMutations = {
    set_movie(state, data) {
        state.movie = data;
    },
    set_movies(state, data) {
        state.movies = data;
    },
    set_plot(state, data) {
        state.plot = data;
    },
    set_currentPageIndex(state, num) { 
        state.currentPageIndex = num;
    },
    set_resultsTotal(state, num) { 
        state.resultsTotal = num;
    },
    set_pagesTotal(state, num) { 
        state.pagesTotal = num;
    },
    set_searchStr(state, str) { 
        state.searchStr = str;
    },
    set_loading(state, bool) { 
        state.loading = bool;
    },
    set_sectionIndex(state, num) { 
        state.sectionIndex = num;
    },
};

export default listMutations;
