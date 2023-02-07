const listActions = {
    async fetch_movies({ state, commit }, data) {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': state.apiKey,
                'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
            }
        };
        
        commit('set_loading', true);
        // eslint-disable-next-line
        await fetch(`https://imdb8.p.rapidapi.com/title/v2/find?title=${data.text}&limit=20&sortArg=moviemeter%2Casc&paginationKey=${data.paginationKey}`, options)
            .then(response => response.json())
            .then((response) => {
                const pagesOverflow = response.totalMatches % 20;
                let pagesTotal = (response.totalMatches - pagesOverflow) / 20;
                pagesTotal = pagesOverflow > 0 ? pagesTotal + 1 : pagesTotal;
                console.log(response);
                commit('set_movies', response.results ? response.results : []);
                commit('set_resultsTotal', response.totalMatches);
                commit('set_pagesTotal', pagesTotal);
                commit('set_currentPageIndex', data.paginationKey);
                commit('set_loading', false);
            })
            .catch(err => console.error(err));
    },

    async fetch_plot({ state, commit }, data) {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': state.apiKey,
                'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
            }
        };
        
        fetch(`https://imdb8.p.rapidapi.com/title/get-plots?tconst=${data.id}`, options)
            .then(response => response.json())
            .then((response) => { 
                if (response.plots.length) { 
                    commit('set_plot', response.plots[0].text)
                }

            })
            .catch(err => console.error(err));
    },

    async fetch_movie({ state, commit }, data) {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': state.apiKey,
                'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
            }
        };
        
        await fetch(`https://imdb8.p.rapidapi.com/title/find?q=${data.id}`, options)
            .then(response => response.json())
            .then((response) => {
                commit('set_movie', response.results[0]);
            })
            .catch(err => console.error(err));
    },
};

export default listActions;