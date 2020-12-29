import {cateList} from "../../utils/http"

let state ={
    list:[]
}
let mutations={
    changelist(state,arr){
        state.list=arr
    }
}
let getters={
    list(state){
        return state.list
    }
}
let actions={
    reqList(context){
        cateList({ istree: true }).then((res) => {
            if (res.data.code == 200) {
              context.commit("changelist",res.data.list)
            }
          });
    }
}



export default {
    state,
    mutations,
    getters,
    actions,
    //命名空间
    namespaced:true

}