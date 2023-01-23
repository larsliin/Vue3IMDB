const listActions = {
    async fetch_countries({ commit }) {
        await fetch('assets/countries.json')
            .then((response) => response.json())
            .then((data) => {
                commit('set_countries', data);
            });
    }

};

export default listActions;
