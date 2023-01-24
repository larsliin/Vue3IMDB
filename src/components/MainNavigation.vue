<template>
    <nav class="navbar navbar-light bg-light">
        <div class="container">
            <router-link class="nav-link" to="/">Home</router-link>
            <div class="navbar" id="navbarSupportedContent">
                
                <form
                    class="form-inline my-2"
                    @submit.prevent="search">
                    <input
                        v-model="searchstr"
                        class="form-control mr-sm-2 inp-search"
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

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'MainNavigation',
    components: {},
    setup() {
        const store = useStore();
        const searchstr = ref('');

        function search($event) {
            $event.preventDefault();

            store.dispatch('imdb/fetch_movies', { text: searchstr.value });
        }

        return {
            search,
            searchstr,
        }
    },
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
        margin-right:  var(--bs-gutter-x);
    }

    .inp-button {
        display: inline-block;
        vertical-align: top;
    }
</style>
