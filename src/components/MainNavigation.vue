<template>
    <nav class="navbar navbar-light bg-light">
        <div class="container">
            <a class="nav-link" role="button" @click="onHomeClick">HOME</a>
            <div class="navbar" id="navbarSupportedContent">
                <form
                    class="form-inline my-2"
                    @submit.prevent="search">
                    <!-- <span class="d-inline-block me-2">Search by</span>
                    <select v-model="selected" class="form-select d-inline-block w-auto me-2">
                        <option v-for="item in select" :key="item.value" :value="item.value">
                            {{ item.text }}
                        </option>
                    </select> -->
                    <input
                        v-model="searchstr"
                        class="form-control inp-search me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search">
                    <button
                        :disabled="!searchstr"
                        class="btn btn-outline-success my-2 my-sm-0 inp-button"
                        type="button"
                        @click.prevent="search">Search</button>
                </form>
            </div>
        </div>
    </nav>
</template>

<script setup>

import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const route = useRoute();
const router = useRouter();
const searchstr = ref('');
const select = ref([{ text: 'Title', value: 'title' }, { text: 'Year', value: 'year' }]);
const selected = ref(select.value[0].value);

function search($event) {
    $event.preventDefault();

    if (route.name !== 'Home') { 
                
        router.push({
            name: 'Home',
        });
    }
    store.commit('imdb/set_searchStr', searchstr.value);
    store.commit('imdb/set_movies', null);

    store.dispatch('imdb/fetch_movies', { searchby: selected.value, text: searchstr.value, paginationKey: 0 })
        .then(() => { 
            store.commit('imdb/set_sectionIndex', 0);
        });
}

function onHomeClick() { 
    store.commit('imdb/set_movies', []);

    router.push({
        name: 'Home',
    });
}
        
</script>
<style scoped>
    nav {
        padding-left:  var(--bs-gutter-x);
        padding-right: var(--bs-gutter-x);
    }

    ul {
        align-content: center;
        display: flex;
        flex-flow: wrap;
        flex: 1;
        height: 100%;
        list-style: none;
        margin: 0;
        padding: 0;
    }

    ul li {
        display: block;
        padding: 0 16px;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    form {
        white-space: nowrap;
    }

    .inp-search {
        width: auto;
        display: inline-block;
    }

    .inp-button {
        display: inline-block;
        vertical-align: top;
    }
</style>
