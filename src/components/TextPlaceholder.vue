<template>
    <div class="wrapper">
        <div class="placeholder" v-for="index in lines" :key="index" :style="{width: index === lines ? width: ''}"></div>
    </div>
</template>

<script setup>
    // eslint-disable-next-line no-unused-vars
    const props = defineProps({
        width: String,
        lines: {
            type: Number,
            default: 3,
        },
    });
</script>
<style scoped>
    .wrapper {
        line-height: 0;
    }
    .placeholder {
        animation: pulse 1.5s infinite;
        background-color: #fff;
        border-radius: 6px;
        font-size: 0;
        height: 8px;
        line-height: 0;
        margin-bottom: 5px;
        margin-top: 5px;
        width: 100%;
    }

    @keyframes pulse {
        0% {
            opacity:.5;
        }
        50% {
             opacity:.25;
        }
        100% {
             opacity:.5;
        }
    }
</style>
