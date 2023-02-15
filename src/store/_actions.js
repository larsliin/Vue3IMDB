import constants from '@/constants/constants';

export default {
    async fetch_movies(text = '', paginationKey = 0) {
        this.loading = true;
        this.noresults = false;

        // eslint-disable-next-line
        await fetch(`https://imdb8.p.rapidapi.com/title/v2/find?title=${text}&limit=20&sortArg=moviemeter%2Casc&paginationKey=${paginationKey}`,
            {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': constants.KEY,
                    'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
                }
            })
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
                this.noresults = !!this.movies;
            })
            .catch(err => console.error(err));
    },
    async fetch_plot(id) {
        fetch(`https://imdb8.p.rapidapi.com/title/get-plots?tconst=${id}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': constants.KEY,
                'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
            }
        })
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
        await fetch(`https://imdb8.p.rapidapi.com/title/find?q=${id}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': constants.KEY,
                'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
            }
        })
            .then(response => response.json())
            .then((response) => {
                this.movie = response.results[0];
            })
            .catch(err => console.error(err));
    },

};
