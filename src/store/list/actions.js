const listActions = {
    async fetch_movies({ commit }) {
        await fetch('http://www.omdbapi.com/?i=tt3896198&apikey=af988c66')
            .then((response) => response.json())
            .then((data) => {
                commit('set_movies', data);
            });
    }
    

};

export default listActions;
