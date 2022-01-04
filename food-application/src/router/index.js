import { createWebHistory, createRouter } from "vue-router";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import MainPage from "../views/website/MainPage.vue";
import Contact from "../views/website/Contact.vue";
import AboutUs from "../views/website/AboutUs.vue";
import Menu from "../views/website/Menu.vue";
import Ingredients from "../views/admin/Ingredients.vue";
import Meals from "../views/admin/Meals.vue";
import Order from "../views/website/Order.vue"


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
  {
    path: '/meals',
    name: 'Meals',
    component: Meals
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  },


];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;