<template>
    <div>
        <div class="placeholder" v-for="index in 3" :key="index"></div>
    </div>
</template>

<script setup>

</script>
<style scoped>
    .placeholder {
        animation: pulse 1.5s infinite;
        background-color: #eaeaea;
        border-radius: 6px;
        font-size: 0;
        height: 16px;
        line-height: 0;
        margin-bottom: 5px;
        margin-top: 5px;
        width: 100%;
    }

    .placeholder:last-child {
        width: 50%;
    }

    @keyframes pulse {
        0% { 
            opacity:1; 
        }
        50% {
             opacity:.5;
        }
        100% {
             opacity:1;
        }
    }
</style>
