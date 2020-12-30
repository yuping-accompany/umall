import Vue from 'vue'
import Router from 'vue-router'
import store from "../store/index"


Vue.use(Router)

function checkenter(path,next){
  if(store.state.userInfo.menus_url.includes(path)){
    next()
  }else{
    next("/")
  }
}
export let secMenu = [
  {
    path:"menu",
    name:"菜单管理",
    component:()=>import("../pages/menu/menu.vue"),
    beforeEnter(to,from,next){
      checkenter("/menu",next)
    }
  }, 
  {
    path:"role",
    name:"角色管理",
    component:()=>import("../pages/role/role.vue"),
    beforeEnter(to,from,next){
      checkenter("/role",next)
    }
  },
  {
    path:"manage",
    name:"管理员管理",
    component:()=>import("../pages/manage/manage.vue"),
    beforeEnter(to,from,next){
      checkenter("/manage",next)
    }
  },
  {
    path:"banner",
    name:"轮播图管理",
    component:()=>import("../pages/banner/banner.vue"),
    beforeEnter(to,from,next){
      checkenter("/banner",next)
    }
  },
  {
    path:"cate",
    name:"商品分类",
    component:()=>import("../pages/cate/cate.vue"),
    beforeEnter(to,from,next){
      checkenter("/cate",next)
    }
  },
  {
    path:"goods",
    name:"商品管理",
    component:()=>import("../pages/goods/goods.vue"),
    beforeEnter(to,from,next){
      checkenter("/goods",next)
    }
  },
  
  {
    path:"member",
    name:"会员管理",
    component:()=>import("../pages/member/member.vue"),
    beforeEnter(to,from,next){
      checkenter("/member",next)
    }
  },
 
  {
    path:"seckill",
    name:"秒杀活动",
    component:()=>import("../pages/seckill/seckill.vue"),
    beforeEnter(to,from,next){
      checkenter("/seckill",next)
    }
  },
  {
    path:"specs",
    name:"商品规格",
    component:()=>import("../pages/specs/specs.vue"),
    beforeEnter(to,from,next){
      checkenter("/specs",next)
    }
  }
]

 let router= new Router({
  routes: [
    {
      path:"/",
      component:()=>import("../pages/index/index.vue"),
      children:[
        {
          path:"",
          component:()=>import("../pages/home/home.vue")
        },
        ...secMenu
      ]
    },
    {
      path:"/login",
      name:"登录",
      component:()=>import("../pages/login/login.vue")
    },
  ]
})

//登陆拦截
router.beforeEach((to,from,next)=>{
  //去登录 直接去
  if(to.path==='/login'){
    next()
    return
  }
    //去其他界面 看看是否登录了 登陆了就可以去
  if(store.state.userInfo.id){
    next()
    return
  }
  next('/login')
})

export default router
