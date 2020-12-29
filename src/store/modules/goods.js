
import { goodsList, goodscount } from "../../utils/http"
let state = {
    list: [],
    //总页数
    total: 0,
    //一页的数量
    size:2,
    //总页数
    page:1
}
let mutations = {
    changelist(state, arr) {
        state.list = arr
    },
    changetotal(state, num) {
        state.total = num
    },
    changePage(state,num){
        state.page=num
    }
}
let getters = {
    list(state) {
        return state.list
    },
    total(state) {
        return state.total
    },
    size(state){
        return state.size
    }
}
let actions = {
    reqgoodslist(context,bool) {
        let params=bool?{}:{page:context.state.page,size:context.state.size}
        goodsList(params).then(res => {
            if (res.data.code === 200) {
                //删除最后一条
                if(res.data.list.length==0 &&context.state.page>1){
                    context.commit("changePage",context.state.page-1)
                    context.dispatch("reqgoodslist")
                    return
                }
                context.commit("changelist", res.data.list)
            }
        })
    },
    //总页数
    reqTotal(context) {
        goodscount().then(res => {
            if (res.data.code === 200) {
                context.commit("changetotal", res.data.list[0].total)
            }
        })
    },
    //修改页码
    changePage(context,num){
        context.commit("changePage",num)
        context.dispatch("reqgoodslist")
    }
}



export default {
    state,
    mutations,
    getters,
    actions,
    namespaced: true
}