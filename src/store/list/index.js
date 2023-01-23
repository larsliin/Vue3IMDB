import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const list = {
    namespaced: true,
    state: {
        countries: [],
        selected: [],
    },
    getters : getters,
    mutations : mutations,
    actions : actions,
}

export default list;
