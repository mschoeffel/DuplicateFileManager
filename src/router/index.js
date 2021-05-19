import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/analyze',
    name: 'Analyze',
    component: () => import('../views/Analyze.vue'),
  },
  {
    path: '/result',
    name: 'Result',
    component: () => import('../views/Result.vue'),
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('../views/Help.vue'),
  },
  {
    path: '/support',
    name: 'Support',
    component: () => import('../views/Support.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue'),
  },
];

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
