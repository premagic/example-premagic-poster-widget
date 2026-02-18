import { createRouter, createWebHistory } from 'vue-router'
import EventPage from '../pages/EventPage.vue'
import RegistrationPage from '../pages/RegistrationPage.vue'
import SuccessPage from '../pages/SuccessPage.vue'
import ProfilePage from '../pages/ProfilePage.vue'

const routes = [
  {
    path: '/',
    redirect: '/register/select',
  },
  {
    path: '/register/select',
    name: 'Event',
    component: EventPage,
  },
  {
    path: '/register/form',
    name: 'Register',
    component: RegistrationPage,
  },
  {
    path: '/register/success',
    name: 'Success',
    component: SuccessPage,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
