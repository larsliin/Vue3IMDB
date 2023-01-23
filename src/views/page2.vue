<template>
    <div>
        <h1>PAGE 2</h1>
        
    </div>
</template>

<script>

import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
    name: 'Page2',
    components: {
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
