import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/home.vue';
import Page1 from '../views/page2.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/page2',
        name: 'Page2',
        component: Page1,
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
