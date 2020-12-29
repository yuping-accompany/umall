import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
export let secMenu = [
  {
    path:"menu",
    name:"菜单管理",
    component:()=>import("../pages/menu/menu.vue")
  }, 
  {
    path:"role",
    name:"角色管理",
    component:()=>import("../pages/role/role.vue")
  },
  {
    path:"manage",
    name:"管理员管理",
    component:()=>import("../pages/manage/manage.vue")
  },
  {
    path:"banner",
    name:"轮播图管理",
    component:()=>import("../pages/banner/banner.vue")
  },
  {
    path:"cate",
    name:"商品分类",
    component:()=>import("../pages/cate/cate.vue")
  },
  {
    path:"goods",
    name:"商品管理",
    component:()=>import("../pages/goods/goods.vue")
  },
  
  {
    path:"member",
    name:"会员管理",
    component:()=>import("../pages/member/member.vue")
  },
 
  {
    path:"seckill",
    name:"秒杀活动",
    component:()=>import("../pages/seckill/seckill.vue")
  },
  {
    path:"specs",
    name:"商品规格",
    component:()=>import("../pages/specs/specs.vue")
  }
]

export default new Router({
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
