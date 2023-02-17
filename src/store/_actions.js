import constants from '@/constants/constants';

export default {
    async fetch_movies(text = '', paginationKey = 0) {
        this.loading = true;
        this.noresults = false;

        const response = await fetch(
            `https://imdb8.p.rapidapi.com/title/v2/find?title=${text}&limit=20&sortArg=moviemeter%2Casc&paginationKey=${paginationKey}`,
            {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': constants.KEY,
                    'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
                }
            });
            
        const list = await response.json();
        const pagesOverflow = list.totalMatches % 20;

        let pagesTotal = (list.totalMatches - pagesOverflow) / 20;
        pagesTotal = pagesOverflow > 0 ? pagesTotal + 1 : pagesTotal;
        
        this.movies = await list.results ? list.results : [];
        this.resultsTotal = list.totalMatches;
        this.pagesTotal = pagesTotal;
        this.currentPageIndex = paginationKey;
        this.loading = false;
        this.noresults = !!this.movies;

        return list;
    },
    async fetch_plot(id) {
        const response = await fetch(`https://imdb8.p.rapidapi.com/title/get-plots?tconst=${id}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': constants.KEY,
                'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
            }
        });
        const plot = await response.json();
        
        if (plot.plots.length) {
            return plot.plots[0].text;
        } else { 
            return 'No plot description available';
        }
    },
    async fetch_movie(id) {
        const response = await fetch(`https://imdb8.p.rapidapi.com/title/find?q=${id}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': constants.KEY,
                'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
            }
        });
        const movie = await response.json();

        return movie;
    },
};
