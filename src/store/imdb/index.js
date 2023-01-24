import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const imdb = {
    namespaced: true,
    state: {
        movies: [],
        search: '',
    },
    getters : getters,
    mutations : mutations,
    actions : actions,
}

export default imdb;
