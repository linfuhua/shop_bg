const state={
  activeIndex2:'1'
};

const getters={

};

const mutations={
  checkIndex2(state,index){
    sessionStorage.removeItem("active_index2");
    sessionStorage.setItem("active_index2",index);
    // console.log(sessionStorage.getItem("active_index")+"hh");
    state.activeIndex2=index;
  }
};

const actions={
  checkIndex2Action(context,index){
    context.commit("checkIndex2",index);
  }
};

export default {
  state,getters,mutations,actions
}
