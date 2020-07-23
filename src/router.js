import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import Components from "./views/Components.vue";
import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";
import Catalog from "./views/Catalog.vue";
import Admin from "./views/Admin.vue";

Vue.use(Router);

export default new Router({
  linkExactActiveClass: "active",
  mode: 'history',
  hash: false,
  routes: [
    {
      path: "/catalog",
      name: "catalog",
      components: {
        header: AppHeader,
        default: Catalog
      }
    },
    {
      path: "/login",
      name: "login",
      components: {
        header: AppHeader,
        default: Login,
      }
    },
    {
      path: "/admin",
      name: "admin",
      components: {
        header: AppHeader,
        default: Admin,
      }
    },
    { 
      path: '*', 
      redirect: '/catalog' 
    },
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
