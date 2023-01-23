<template>
    <header>
        <ul>
            <li>
                <router-link to="/">HOME</router-link>
            </li>
            <li>
                <router-link to="/page1">Favourite Contries</router-link>
            </li>
        </ul>
        <div><input type="button" value="Clear list" @click="onClearClick" /></div>
    </header>
</template>
<script>
import { useStore } from 'vuex';

export default {
    name: 'MainNavigation',
    components: {},
    setup() {
        const store = useStore();

        function onClearClick() {
            store.commit('list/set_selected', [])
        }

        return {
            onClearClick,
        }
    },
}
</script>
<style scoped>
    header {
        align-items: center;
        background-color: #333;
        color: #fff;
        display: flex;
        height: 50px;
        padding: 0 16px;
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
</style>
