import { createStore } from 'vuex';
import list from './list/'

const store = createStore({
    modules: { list },
});

export default store;
