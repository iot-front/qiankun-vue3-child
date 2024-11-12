import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/childEntering/home',
    name: 'enteringHome',
    component: () => import(/* webpackChunkName: "enteringHome" */ '@/views/entering/home.vue'),
    meta: {
      title: '数据录入',
    }
  },
  
  // {
  //   path: '/:pathMatch(.*)',
  //   redirect: '/service/home'
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// router.beforeEach((to, from, next) => {
//   const title = to.meta && to.meta.title;
//   if (title) {
//     console.log(from)
//     document.title = title;
//   }
//   next();
// });
export default router
