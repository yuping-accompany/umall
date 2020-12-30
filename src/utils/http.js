import axios from "axios"
import qs from "qs"
import Vue from "vue"
import store from "../store/index"
import router from "../router/index"

import { errAlert } from "./alert"

//开发环境
let baseUrl = "/api"
Vue.prototype.$pre = "http://localhost:3000"

//上线环境
// let baseUrl=""
// Vue.prototype.$pre=""

//请求拦截
axios.interceptors.request.use(req=>{
    if(req.url!==baseUrl+"/api/userlogin"){
        req.headers.authorization=store.state.userInfo.token
    }
    return req
})


//响应拦截
axios.interceptors.response.use(res => {
    if (res.data.code != 200) {
        errAlert(res.data.msg)
    }
    //如果list为null的话就转成空数组
    if(!res.data.list){
        res.data.list=[]
    }
     //掉线处理
     if(res.data.msg==="登录已过期或访问权限受限"){
        store.dispatch("changuser",{})
        router.path("/login")
    }
    console.group("本次请求的地址是" + res.config.url)
    console.log(res);
    console.groupEnd()
    return res
})

//post 带文件上传

function updateFile(user){
    let data =new FormData()
    for(let i in user){
        data.append(i,user[i])
    }
    return data
}

//登录
export let login =(user)=>{
    return axios({
        url:baseUrl+"/api/userlogin",
        method:"post",
        data:qs.stringify(user)
    })
}
//菜单管理 start

//菜单添加

export let addMenu = (user) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(user)
    })
}

//菜单列表
export let menuList = () => {
    return axios({
        url: baseUrl + "/api/menulist",
        method: "get",
        params: {
            istree: true
        }
    })
}
//删除
export let delMenu = (obj) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: qs.stringify(obj)
    })
}

//编辑（菜单获取（一条））
export let editMenu = (id) => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        method: "get",
        params: id
    })
}

//菜单修改
export let updateMenu = (obj) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(obj)
    })
}

//菜单管理 end

//角色管理start
// 角色添加
export let roleAdd = (obj) => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: "post",
        data: qs.stringify(obj)
    })
}

//角色列表
export let roleList = () => {
    return axios({
        url: baseUrl + "/api/rolelist"
    })
}
//角色删除
export let roleDel=(id)=>{
   return axios({
    url: baseUrl + "/api/roledelete",
    method:"post",
    data:qs.stringify(id)
   })
}
//角色获取（一条）
export let roleEdit=(id)=>{
    return axios({
        url:baseUrl + "/api/roleinfo",
        params:id
    })
}

//角色修改
export let roleUpdate=(obj)=>{
    return axios({
        url:baseUrl + "/api/roleedit",
        method:"post",
        data:qs.stringify(obj)
    })
}

//角色管理 end


//管理员管理start
//管理员添加

export let manageAdd = (user)=>{
    return axios({
        url:baseUrl + "/api/useradd",
        method:"post",
        data:qs.stringify(user)
    })
}

//管理员总数（用于计算分页）
export let page =()=>{
    return axios({
        url:baseUrl + "/api/usercount",
        method:"get",
    })
}

//管理员列表（分页）
export let manageList =(obj)=>{
    return axios({
        url:baseUrl + "/api/userlist",
        method:"get",
        params:obj
    })
}

//管理员获取一条（编辑）{uid:}
export let manageEdit=(obj)=>{
    return axios({
        url:baseUrl + "/api/userinfo",
        method:"get",
        params:obj
    })
}

//管理员修改 {uid:用户编号}
export let manageUpdate=(obj)=>{
    return axios({
        url:baseUrl + "/api/useredit",
        method:"post",
        data:qs.stringify(obj)
    })
}

//.管理员删除{uid: }
export let manageDel=(obj)=>{
    return axios({
        url:baseUrl + "/api/userdelete",
        method:"post",
        data:qs.stringify(obj)
    })
}
//管理员管理 end

//商品分类start
//商品分类添加 {pid catename img status}
 export let cateAdd=(user)=>{
     return axios({
         url:baseUrl +"/api/cateadd",
         method:"post",
         data:updateFile(user)
     })
 }

//商品分类列表 {istree:true pid}
export let cateList=(user)=>{
    return axios({
        url:baseUrl +"/api/catelist",
        method:"get",
        params:user
    })
}
//商品分类获取（一条）(编辑){id:id}

export let cateEdit=(user)=>{
    return axios({
        url:baseUrl +"/api/cateinfo",
        method:"get",
        params:user
    })
}

//商品分类修改{id pid catename img status}
export let cateUpdate=(user)=>{
    return axios({
        url:baseUrl +"/api/cateedit",
        method:"post",
        data:updateFile(user)
    })
}

//商品分类删除{id}
export let cateDel=(user)=>{
    return axios({
        url:baseUrl +"/api/catedelete",
        method:"post",
        data:qs.stringify(user)
    })
}

//商品分类end

//轮播图start
//轮播图添加{title img status}
export let bannerAdd=(user)=>{
    return axios({
        url:baseUrl +"/api/banneradd",
        method:"post",
        data:updateFile(user)
    })
}
//轮播图列表** 

export let bannerList=()=>{
    return axios({
        url:baseUrl +"/api/bannerlist",
    })
}

//轮播图获取（一条）{id:id}
export let bannerEdit=(user)=>{
    return axios({
        url:baseUrl +"/api/bannerinfo",
        method:"get",
        params:user
    })
}
//轮播图修改{id title img status}
export let bannerUpdate=(user)=>{
    return axios({
        url:baseUrl +"/api/banneredit",
        method:"post",
        data:updateFile(user)
    })
}
//轮播图删除{id}
export let bannerDel=(user)=>{
    return axios({
        url:baseUrl +"/api/bannerdelete",
        method:"post",
        data:qs.stringify(user)
    })
}
//轮播图end

//会员管理start
//会员列表
export let memberList=()=>{
    return axios({
        url:baseUrl +"/api/memberlist",
        method:"get",
    })
}

//会员获取（一条）{uid}
export let memberEdit=(user)=>{
    return axios({
        url:baseUrl +"/api/memberinfo",
        method:"get",
        params:user
    })
}
//会员修改{uid nickname phone password status}
export let memberUpdate=(user)=>{
    return axios({
        url:baseUrl +"/api/memberedit",
        method:"post",
        data:user
    })
}
//会员end

//商品规格start

//商品规格添加{specsname attrs status}

export let specsAdd = (user)=>{
    return axios({
        url:baseUrl + "/api/specsadd",
        method:"post",
        data:qs.stringify(user)
    })
}

//商品规格总数（用于计算分页）
export let specsPage =()=>{
    return axios({
        url:baseUrl + "/api/specscount",
        method:"get",
    })
}

//商品规格列表（分页）{size page}
export let specsList =(obj)=>{
    return axios({
        url:baseUrl + "/api/specslist",
        method:"get",
        params:obj
    })
}

//商品规格获取一条（编辑）{id:}
export let specsEdit=(obj)=>{
    return axios({
        url:baseUrl + "/api/specsinfo",
        method:"get",
        params:obj
    })
}

//商品规格修改 {id specsname attrs status}
export let specsUpdate=(obj)=>{
    return axios({
        url:baseUrl + "/api/specsedit",
        method:"post",
        data:qs.stringify(obj)
    })
}

//.商品规格删除{id: }
export let specsDel=(obj)=>{
    return axios({
        url:baseUrl + "/api/specsdelete",
        method:"post",
        data:qs.stringify(obj)
    })
}

//商品规格end

//商品管理start


//商品管理添加 {}
export let goodsAdd=(user)=>{
    return axios({
        url:baseUrl +"/api/goodsadd",
        method:"post",
        data:updateFile(user)
    })
}
//商品总数（用于计算分页）
export let goodscount=()=>{
    return axios({
        url:baseUrl +"/api/goodscount"
    })
}
//商品管理列表 {size page fid sid }
export let goodsList=(user)=>{
   return axios({
       url:baseUrl +"/api/goodslist",
       method:"get",
       params:user
   })
}
//商品管理获取（一条）(编辑){id:id}

export let goodsEdit=(user)=>{
   return axios({
       url:baseUrl +"/api/goodsinfo",
       method:"get",
       params:user
   })
}

//商品管理修改{}
export let goodsUpdate=(user)=>{
   return axios({
       url:baseUrl +"/api/goodsedit",
       method:"post",
       data:updateFile(user)
   })
}

//商品管理删除{id}
export let goodsDel=(user)=>{
   return axios({
       url:baseUrl +"/api/goodsdelete",
       method:"post",
       data:qs.stringify(user)
   })
}


//商品管理end

//限时秒杀start
//限时秒杀添加 {}
export let seckAdd=(user)=>{
    return axios({
        url:baseUrl +"/api/seckadd",
        method:"post",
        data:qs.stringify(user)
    })
}
//限时秒杀列表 { }
export let seckList=()=>{
   return axios({
       url:baseUrl +"/api/secklist",
       method:"get",
   })
}
//限时秒杀获取（一条）(编辑){id:id}

export let seckEdit=(user)=>{
   return axios({
       url:baseUrl +"/api/seckinfo",
       method:"get",
       params:user
   })
}

//限时秒杀修改{}
export let seckUpdate=(user)=>{
   return axios({
       url:baseUrl +"/api/seckedit",
       method:"post",
       data:qs.stringify(user)
   })
}

//限时秒杀删除{id}
export let seckDel=(user)=>{
   return axios({
       url:baseUrl +"/api/seckdelete",
       method:"post",
       data:qs.stringify(user)
   })
}


//秒杀end