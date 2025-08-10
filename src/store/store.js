import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./modules/auth";
import notification from "./modules/notification";
import loader from "./modules/loader";
import breadcrumb from "./modules/breadcrumb";
import orders from "./modules/orders"
import transaction from  './modules/transaction';

Vue.use(Vuex)

const store = new Vuex.Store({

  modules: {
    auth,
    notification,
    loader,
    breadcrumb,
    orders,
    transaction

  },
  // Enable strict mode in development to get a warning
  // when mutating state outside of a mutation.
  // https://vuex.vuejs.org/guide/strict.html
  strict: process.env.NODE_ENV !== 'production',
})

export default store

