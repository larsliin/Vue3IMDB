const listActions = {
    async fetch_movies({ commit }, data) {
        console.log(data.text);

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '136abbac66mshf4aab4b99fa7ecbp13288cjsn41ca7ed4997f',
                'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
            }
        };
        
        await fetch(`https://imdb8.p.rapidapi.com/title/find?q=${data.text}`, options)
            .then(response => response.json())
            .then(response => {
                commit('set_movies', response.results)
            })
            .catch(err => console.error(err));
    }
};

export default listActions;