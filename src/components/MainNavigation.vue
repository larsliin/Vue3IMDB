<template>
    <nav class="navbar navbar-light bg-light">
        <div class="container">
            <a class="nav-link" role="button" @click="onHomeClick">HOME</a>
            <div class="navbar" id="navbarSupportedContent">
                <form
                    class="form-inline my-2"
                    @submit.prevent="search">
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
import { useImdbStore } from '@/store/imdbStore';

const route = useRoute();
const router = useRouter();
const searchstr = ref('');
const imdb = useImdbStore();

function search(event) {
    event.preventDefault();

    if (route.name !== 'Home') { 
        router.push({
            name: 'Home',
        });
    }

    imdb.searchStr = searchstr.value;
    imdb.sectionIndex = 0;
    imdb.fetch_movies(searchstr.value, 0);
}

function onHomeClick() { 
    imdb.movies = [];
    imdb.noresults = false;

    router.push({
        name: 'Home',
    });
}

</script>
<style scoped>
    nav {
        padding-left:  var(--bs-gutter-x);
        padding-right: var(--bs-gutter-x);
        box-shadow: 0 0 10px 6px rgba(0, 0, 0, 0.1);
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
