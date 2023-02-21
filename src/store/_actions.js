import constants from '@/constants/constants';

export default {
    async fetch_movies(text = '', paginationKey = 0) {
        try {
            this.loading = true;
            this.noresults = false;

            const response = await fetch(
                `https://imdb8.p.rapidapi.com/title/v2/find?title=${text}&limit=20&sortArg=moviemeter%2Casc&paginationKey=${paginationKey}`,
                {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': constants.KEY,
                        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com',
                    },
                },
            );

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

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
        } catch (error) {
            console.warn('request aborted');
            return null;
        }
    },
    async fetch_plot(id, signal) {
        try {
            const response = await fetch(`https://imdb8.p.rapidapi.com/title/get-plots?tconst=${id}`, {
                method: 'GET',
                signal,
                headers: {
                    'X-RapidAPI-Key': constants.KEY,
                    'X-RapidAPI-Host': 'imdb8.p.rapidapi.com',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const plot = await response.json();

            if (plot.plots.length) {
                return plot.plots[0].text;
            }
            return 'No plot description available';
        } catch (error) {
            console.warn('request aborted');
            return null;
        }
    },
    async fetch_details(id, signal) {
        try {
            const response = await fetch(`https://imdb8.p.rapidapi.com/title/get-details?tconst=${id}`, {
                method: 'GET',
                signal,
                headers: {
                    'X-RapidAPI-Key': constants.KEY,
                    'X-RapidAPI-Host': 'imdb8.p.rapidapi.com',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const details = await response.json();

            return details;
        } catch (error) {
            console.warn('request aborted');
            return null;
        }
    },
    async fetch_actors(id, signal) {
        try {
            const response = await fetch(`https://imdb8.p.rapidapi.com/title/get-full-credits?tconst=${id}`, {
                method: 'GET',
                signal,
                headers: {
                    'X-RapidAPI-Key': constants.KEY,
                    'X-RapidAPI-Host': 'imdb8.p.rapidapi.com',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const credits = await response.json();

            return credits;
        } catch (error) {
            console.warn('request aborted');
            return null;
        }
    },
};
