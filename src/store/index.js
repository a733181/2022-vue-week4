import { createStore } from 'vuex';
import AxiosModules from './modules/axios/index';
import AuthModules from './modules/auth/index';
import ProductsModules from './modules/products/index';
import PaginationModules from './modules/pagination/index';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    axios: AxiosModules,
    auth: AuthModules,
    product: ProductsModules,
    pagination: PaginationModules,
  },
});
