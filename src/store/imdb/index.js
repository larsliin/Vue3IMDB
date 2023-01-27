import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const imdb = {
    namespaced: true,
    state: {
        movie: null,
        movies: [],
        plot: null,
        currentPageIndex: 0,
        resultsTotal: 0,
        pagesTotal: 0,
        searchStr: '',
        loading: false,
        sectionIndex: 0,
    },
    getters : getters,
    mutations : mutations,
    actions : actions,
}

export default imdb;
