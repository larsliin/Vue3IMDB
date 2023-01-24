import { createStore } from 'vuex';
import imdb from './imdb/'

const store = createStore({
    modules: { imdb },
});

export default store;
