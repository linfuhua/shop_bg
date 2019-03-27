import Vue from 'vue'
import Vuex from 'vuex'
import headerTag from './modules/headerTag'
import LeftTag from './modules/LeftTag'
Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    headerTag,LeftTag
  }
})
