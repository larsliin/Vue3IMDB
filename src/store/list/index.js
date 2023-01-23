import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const list = {
    namespaced: true,
    state: {
        movies: [],
        selected: [],
    },
    getters : getters,
    mutations : mutations,
    actions : actions,
}

export default list;
