import { createRouter, createWebHistory } from 'vue-router'
import EventPage from '../pages/EventPage.vue'
import RegistrationPage from '../pages/RegistrationPage.vue'
import SuccessPage from '../pages/SuccessPage.vue'
import ProfilePage from '../pages/ProfilePage.vue'

const routes = [
  {
    path: '/',
    name: 'Event',
    component: EventPage,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegistrationPage,
  },
  {
    path: '/success',
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
