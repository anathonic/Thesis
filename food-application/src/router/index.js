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
import UsersManagement from "../views/admin/UsersManagement.vue";
import UserCreate from "../views/admin/UserCreate.vue";


const routes = [

  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,

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
    component: Login,
  //     beforeEnter: (to, from, next) => {
  //       if(localStorage.getItem('role') == 'user'){
  //         next({
  //           path: '/dashboard',
  //           params: { nextUrl: to.fullPath }
  //         })

  //       }else{
  //        next();
  //       }
 
  // },
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
    component: Ingredients,
    meta: {
      requiresAuth: true,
      permission: true
    },  
  },
  {
    path: '/meals',
    name: 'meals.index',
    component: Meals,
    meta: {
      requiresAuth: true,
      permission: true
    },  
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
  component: Panel,
  meta: {
    requiresAuth: true,
    permission: true
  },

  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
    meta: {
      requiresAuth: true,
      permission: true
    },  
  },
    
    {
      path: '/ingredients/:IngId/edit',
      name: 'Ingredients.edit',
      component: IngredientsEdit,
      props: true,
      meta: {
        requiresAuth: true,
        permission: true
      },  
  },
  {
    path: '/meals/:MealId/edit',
    name: 'meals.edit',
    component: MealsEdit,
    props: true,
    meta: {
      requiresAuth: true,
      permission: true
    },  
},
{
  path: '/usersmanagement',
  name: 'UsersManagement',
  component: UsersManagement,
  props: true,
  meta: {
    requiresAuth: true,
    permission: true
  },  
},
{
  path: '/usercreate',
  name: 'UserCreate',
  component: UserCreate,
  props: true,
  meta: {
    requiresAuth: true,
    permission: true
  },  
}
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});



router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log('tets');
    if ((localStorage.getItem('jwt') == null) || (localStorage.getItem('jwt') == 'null')) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      if (to.matched.some(record => record.meta.permission)) {
        console.log(localStorage.getItem('role'))
        if(localStorage.getItem('role') != 'admin'){
          next({
            path: '/',
            params: { nextUrl: to.fullPath }
          })
        }else{
         next();
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