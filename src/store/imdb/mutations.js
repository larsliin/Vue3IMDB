const listMutations = {
    set_movies(state, data) {
        state.movies = data;
    },
    set_search(state, str) { 
        state.movies = str;
    }
};

export default listMutations;
