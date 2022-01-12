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
import Panel from "../views/admin/Panel.vue";
import Dashboard from "../views/user/Dashboard.vue";
import Account from "../views/user/Account.vue";
import Settings from "../views/user/Settings.vue";
import Orders from "../views/admin/Orders.vue";

const routes = [

  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  
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
  
  {
  path: '/panel',
  name: 'Panel',
  component: Panel
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders
    }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;