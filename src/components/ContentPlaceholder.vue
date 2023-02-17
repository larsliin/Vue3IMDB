<template>
    <div class="wrapper">
        <div class="placeholder" v-for="index in 3" :key="index"></div>
    </div>
</template>

<script setup>

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
        height: 10px;
        line-height: 0;
        margin-bottom: 5px;
        margin-top: 5px;
        width: 100%;
    }

    .placeholder:last-child {
        width: 33%;
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
