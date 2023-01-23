const listMutations = {
    set_countries(state, data) {
        state.countries = data;
    },
    set_selected(state, val) {
        state.selected = val;
    }
};

export default listMutations;
