import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'VueQuillEditor',
    component: () => import(/* webpackChunkName: "about" */ '../views/VueQuillEditor.vue')
  },
  {
    path: '/tinymce',
    name: 'TinyMCE',
    component: () => import(/* webpackChunkName: "about" */ '../views/TinyMCE.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
