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
import MealsEdit from "../views/admin/MealsEdit.vue";
import IngredientsEdit from "../views/admin/IngredientsEdit.vue";

const routes = [

  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: {
      requiresAuth: true
    }
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
    name: 'Ingredients.index',
    component: Ingredients
  },
  {
    path: '/meals',
    name: 'meals.index',
    component: Meals
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
    meta: {
      requiresAuth: true
    }
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
    },
    {
      path: '/ingredients/:IngId/edit',
      name: 'Ingredients.edit',
      component: IngredientsEdit,
      props: true
  },
  {
    path: '/meals/:MealId/edit',
    name: 'meals.edit',
    component: MealsEdit,
    props: true
}
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == ('null' || null) ) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      let user = JSON.parse(localStorage.getItem('user'))
      if (to.matched.some(record => record.meta.is_admin)) {
        if (user.is_admin == 1) {
          next()
        } else {
          next({ name: 'userboard' })
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('jwt') == null) {
      next()
    } else {
      next({ name: 'userboard' })
    }
  } else {
    next()
  }
})
export default router;