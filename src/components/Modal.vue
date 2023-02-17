<template>
    <div class="lightbox" @click="close">
        <div class="lightbox-container">
            <div class="lightbox-content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>

const emit = defineEmits(['close']);

function close(event) { 
    const {classList} = event.target;
    if (classList.contains('lightbox') || classList.contains('lightbox-container')) {
        emit('close');
    }
}
</script>
<style scoped>
.lightbox{
    backdrop-filter: blur(4px);
    background-color:rgba(0, 0, 0, .75) ;
    color: #fff;
    display: block;
    height: 100vh;
    isolation: isolate;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;
}
.lightbox-container {
    width: 100%;
    max-width: 800px;
    padding: 20px;
    margin: 0 auto;
}

.lightbox-content {
    overflow: hidden;
    position: relative;
    background-color: #010440;
    border-radius: 20px;
    min-height: calc(100vh - 40px);
    box-shadow: 0 0 10px 10px rgba(0, 0, 0, .25);
}

</style>