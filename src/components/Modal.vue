<template>
    <div class="lightbox" @click="close">
        <div class="lightbox-container">
            <button class="close-button" @click="emit('close')"></button>
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
.close-button {
    align-items: center;
    background-color: #010440;
    border-radius: 50%;
    border: none;
    display: flex;
    font-size: 50px;
    height: 40px;
    justify-content: center;
    outline: none;
    padding: 0;
    position: absolute;
    right: 40px;
    top: 50px;
    width: 40px;
    z-index: 1;
}

.close-button::before,
.close-button::after {
    background-color: #0BB3D9;
    border-radius: 2px;
    content: '';
    height: 25px;
    position: absolute;
    width: 4px;
}
.close-button::before {
    transform: rotate(-45deg);
}
.close-button::after {
    transform: rotate(45deg);
}

.lightbox{
    align-items: center;
    backdrop-filter: blur(4px);
    background-color:rgba(0, 0, 0, .75) ;
    color: #fff;
    display: flex;
    height: 100vh;
    isolation: isolate;
    justify-content: center;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;
}
.lightbox-container {
    position: relative;
    max-width: 800px;
    padding: 20px;
    width: 100%;
}

.lightbox-content {
    background-color: #010440;
    border-radius: 20px;
    box-shadow: 0 0 10px 10px rgba(0, 0, 0, .25);
    min-height: 800px;
    overflow: hidden auto;
    position: relative;
    max-height: calc(100vh - 40px);
}

</style>