const state={
  active_index:'1'
};

const getters={

};

const mutations={
  checkIndex(state,index){
    sessionStorage.removeItem("active_index");
    sessionStorage.setItem("active_index",index);
    // console.log(sessionStorage.getItem("active_index")+"hh");
    state.active_index=index;
  }
};
const actions ={
  checkIndexAction(context,index){
    context.commit("checkIndex",index);
  }
};

export default {
  state,getters,mutations,actions
}
