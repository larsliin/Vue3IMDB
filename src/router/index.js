import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomeView.vue';
import Modal from '@/components/ModalContainer.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [{
            path: '/details/:id',
            name: 'Modal',
            component: Modal,

        }],
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
