import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '../pages/index/index.vue'
import login from '../pages/index/login.vue'
import register from '../pages/index/register.vue'
import rentBook from '../pages/index/rentBook.vue'
import search from '../pages/index/search.vue'
import admin from '../pages/admin/index.vue'

Vue.use(Router)


export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/rentBook',
      name: 'rentBook',
      component: rentBook
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin
    }
  ]
})
