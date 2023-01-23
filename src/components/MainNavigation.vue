<template>
    <div class="container-fluid">
        <div class="row">
            <nav class="navbar navbar-light bg-light">
                <a class="navbar-brand" href="#">Navbar</a>
            
                <div class="navbar" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="/">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/page2">Page</a>
                        </li>
                    </ul>
                    <form class="form-inline my-2">
                        <input
                            ref="input"
                            class="form-control mr-sm-2 inp-search"
                            type="search"
                            placeholder="Search"
                            aria-label="Search">
                        <button
                            class="btn btn-outline-success my-2 my-sm-0 inp-button"
                            type="submit"
                            @click="onSearchClick">Search</button>
                    </form>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';

export default {
    name: 'MainNavigation',
    components: {},
    setup() {
        // eslint-disable-next-line
        const store = useStore();

        function onSearchClick($event) {
            $event.preventDefault();
            
            console.log('click');
        }

        return {
            onSearchClick,
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
