import Vue from 'vue'
import VueRouter from 'vue-router'
import Filter from '../views/Filter.vue'
import TestAxios from '../views/TestAxios.vue'
import NotFound from '../views/NotFound.vue'
import User from '../views/User.vue'
import Profile from '../views/Profile.vue'
import Home from '../views/Home.vue'
import VuelidatePage from '../views/VuelidatePage'
import Edit from '../views/Edit.vue'
import Details from '../views/Details.vue'
import VeeValidatePage from '../views/VeeValidatePage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/filter',
    name: 'Filter',
    component: Filter
  },
  {
    path: '/axios',
    name: 'Axios',
    component: TestAxios
  },
  {
    path: '/vuelidate',
    name: 'Vuelidate',
    component: VuelidatePage
  },
  {
    path: '/vee-validate',
    name: 'VeeValidate',
    component: VeeValidatePage
  },
  {
    path: '/user/details/:id',
    component: Details,
    name: 'Details',
    props: true
  },
  {
    path: '/user',
    component: User,
    name: 'User',
    children: [
      {
        path: 'profile',
        name: 'Profile',
        component: Profile,
        children: [
          {
            path: 'edit',
            name: 'Edit',
            component: Edit,
          }
        ]
      }
    ]
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
