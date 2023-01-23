const listMutations = {
    set_movies(state, data) {
        state.movies = data;
    },
    set_selected(state, val) {
        state.selected = val;
    }
};

export default listMutations;
