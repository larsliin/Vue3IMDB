import { defineStore } from 'pinia'

export const useImdbStore = defineStore('imdb', {
    state: () => {
        return { 
            apiKey: 'KEY',
            movie: null,
            movies: null,
            plot: null,
            currentPageIndex: 0,
            resultsTotal: 0,
            pagesTotal: 0,
            searchStr: '',
            cast: null,
            loading: false,
            sectionIndex: 0,
        }
    },
    getters: {
        get_movie(state) {
            return state.movie;
        },
        get_movies(state) {
            return state.movies;
        },
        get_plot(state) {
            return state.plot;
        },
        get_currentPageIndex(state) {
            return state.currentPageIndex;
        },
        get_resultsTotal(state) { 
            return state.resultsTotal;
        },
        get_pagesTotal(state) { 
            return state.pagesTotal;
        },
        get_searchStr(state) { 
            return state.searchStr;
        },
        get_loading(state) { 
            return state.loading;
        },
        get_sectionIndex(state) { 
            return state.sectionIndex;
        },
    },
    actions: {
        async fetch_movies(text = '', paginationKey = 0) {
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': this.apiKey,
                    'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
                }
            };
            
            this.loading = true;

            // eslint-disable-next-line
            await fetch(`https://imdb8.p.rapidapi.com/title/v2/find?title=${text}&limit=20&sortArg=moviemeter%2Casc&paginationKey=${paginationKey}`, options)
                .then(response => response.json())
                .then((response) => {
                    const pagesOverflow = response.totalMatches % 20;
                    let pagesTotal = (response.totalMatches - pagesOverflow) / 20;
                    pagesTotal = pagesOverflow > 0 ? pagesTotal + 1 : pagesTotal;
                    
                    this.movies = response.results ? response.results : [];
                    this.resultsTotal = response.totalMatches;
                    this.pagesTotal = pagesTotal;
                    this.currentPageIndex = paginationKey;
                    this.loading = false;
                })
                .catch(err => console.error(err));
        },

        async fetch_plot(id) {
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': this.apiKey,
                    'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
                }
            };
            
            fetch(`https://imdb8.p.rapidapi.com/title/get-plots?tconst=${id}`, options)
                .then(response => response.json())
                .then((response) => { 
                    if (response.plots.length) {
                        this.plot = response.plots[0].text;
                    } else { 
                        this.plot = 'No plot description available';
                    }
    
                })
                .catch(err => console.error(err));
        },
    
        async fetch_movie(id) {
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': this.apiKey,
                    'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
                }
            };
            
            await fetch(`https://imdb8.p.rapidapi.com/title/find?q=${id}`, options)
                .then(response => response.json())
                .then((response) => {
                    this.movie = response.results[0];
                })
                .catch(err => console.error(err));
        },
    },
})