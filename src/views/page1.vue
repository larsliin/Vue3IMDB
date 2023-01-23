<template>
    <div>
        <h1>List selected countries</h1>
        <ul>
            <li v-for="item in selected" :key="item.id">
                <country :country="item"></country>
            </li>
        </ul>
    </div>
</template>

<script>

import { computed } from 'vue';
import { useStore } from 'vuex';
import Country from '../components/Country.vue'
export default {
    name: 'Page1',
    components: {
        Country
    },
    setup() {
        const store = useStore();
        const selected = computed(() => store.getters['list/get_selected']);

        return {
            selected
        };
    },
}
</script>
<style scoped>
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    li {
        margin: 5px 0;
    }
</style>
