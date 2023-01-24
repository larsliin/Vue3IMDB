<template>
    <div>
        <div class="container">
            DETAILS
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
    name: 'Details',
    components: {
    },
    setup() {
        const store = useStore();
        
        const selected = computed(() => store.getters['imdb/get_selected']);

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
