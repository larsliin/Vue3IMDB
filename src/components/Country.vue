<template>
    <div>
        <span class="loader"></span>
        <img :src="`https://flagcdn.com/48x36/${country.code.toLowerCase()}.png`" @load="loaded = true"/><span>{{ country.name }}</span>
    </div>
</template>
<script>
import { ref } from 'vue';

export default {
    name: 'Country',
    props: ['country'],
    setup() {
        let loaded = ref(false);
        console.log(loaded.value);

        return {
            loaded
        }
    }
}
</script>
<style scoped>
    div {
        align-items: center;
        display: flex;
    }

    img {
        margin-right: 10px;
    }
</style>
