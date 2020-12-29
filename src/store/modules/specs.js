
import {specsList,specsPage} from "../../utils/http"
let state={
    list:[],
    total:0,
    size:2,
    page:1
}
let mutations={
    changelist(state,arr){
        state.list=arr
    },
    changetotal(state,num){
        state.total=num
    },
    changePage(state,num){
        state.page=num
    }
}
let getters={
    list(state){
        return state.list
    },
    total(state){
        return state.total
    },
    size(state){
        return state.size
    }
}
let actions={
    reqList(context,bool){
        let params=bool?{}:{page:context.state.page,size:context.state.size}
        specsList(params).then(res=>{
            if(res.data.code===200){
                if(res.data.list.length===0 && context.state.page>1){
                    context.commit("changePage",context.state.page-1)
                    context.dispatch("reqList")
                    return
                }

                let list=res.data.list
                list.forEach(item=>{
                    item.attrs=JSON.parse(item.attrs)
                })
                context.commit("changelist",list)
            }
        })
    },

    //总页数
    reqTotal(context){
        specsPage().then(res=>{
           if(res.data.code==200){
            context.commit("changetotal",res.data.list[0].total)
           }
        })
    },
    //修改页码
    changePage(context,num){
        //修改页码
        context.commit("changePage",num)
        //重新请求list
        context.dispatch("reqList")
    }
}





export default{
    state,
    mutations,
    getters,
    actions,
    namespaced:true
}