<template>
    <div>
        <h1>Country selector</h1>
        <input type="text" v-model="filterTxt" placeholder="Filter" />
        <div class="wrapper">
            <div>
                <ul>
                    <li v-for="item in filteredCountries" :key="item.id">
                        <label>
                            <input type="checkbox" @change="onChange(item.id)" :checked="selected.find(e => e.id === item.id)" />{{ item.name }}
                        </label>
                    </li>
                </ul>
            </div>
            <div>
                <ul class="sticky">
                    <li v-for="item in selected" :key="item.id">
                        <country :country="item"></country>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
// import ref from 'vue';
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import Country from '../components/Country.vue';

export default {
    name: 'Home',
    components: {
        Country
    },
    setup() {
        const store = useStore();
        const filterTxt = ref();
        const countries = computed(() => store.getters['list/get_countries']);
        const selected = computed(() => store.getters['list/get_selected']);

        function onChange(id) {
            if (selected.value.find(e => e.id === id)) {
                selected.value.splice(selected.value.findIndex(e => e.id === id), 1)
            } else {
                const country = countries.value[id];
                selected.value.unshift(country);
            }
        }

        const filteredCountries = computed(() => {
            if (filterTxt.value) {
                return countries.value.filter(e => e.name.toLowerCase().indexOf(filterTxt.value.toLowerCase()) > -1);
            }
            return countries.value;
        });

        onMounted(() => {
            store.dispatch('list/fetch_countries');
        });

        return {
            countries,
            filterTxt,
            onChange,
            selected,
            store,
            filteredCountries,
        };
    },
};
</script>
<style scoped>
    .wrapper {
        display: flex;
    }

    .wrapper > div {
        flex: 1;
    }

    ul {
        list-style: none;
        margin: 0;
        padding: 24px 0 0;
    }

    li {
        margin: 5px 0;
    }

    input[type="checkbox"] {
        margin-right: 8px;
    }

    .sticky {
        position: sticky;
        top: 0;
    }
</style>
