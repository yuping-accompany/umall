import {seckList} from "../../utils/http"
let state={
    list:[]
}
let mutations={
    changeseckill(state,arr){
        state.list=arr
    }
}
let getters={
    list(state){
        return state.list
    }
}
let actions={
    reqSeckill(context){
        seckList().then(res=>{
            if(res.data.code===200){
                context.commit("changeseckill",res.data.list)
            }
        })
    }
}


export default{
    state,
    mutations,
    getters,
    actions,
    namespaced:true
}