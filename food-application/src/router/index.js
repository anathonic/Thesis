import { createWebHistory, createRouter } from "vue-router";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import MainPage from "../views/website/MainPage.vue";
import Contact from "../views/website/Contact.vue";
import AboutUs from "../views/website/AboutUs.vue";
import Menu from "../views/website/Menu.vue";
import Ingredients from "../views/admin/Ingredients.vue";


const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/aboutus',
    name: 'AboutUs',
    component: AboutUs
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/ingredients',
    name: 'Ingredients',
    component: Ingredients
  },


];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;