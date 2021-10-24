import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/:dialogId?',
    name: 'Messenger',
    props(route) {
      return {
        dialogId: parseInt(route.params.dialogId, 10) || undefined,
      };
    },
    component: () => import(/* webpackChunkName: "messenger" */ '../views/Messenger.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
