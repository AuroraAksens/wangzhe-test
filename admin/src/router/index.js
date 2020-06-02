import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main'
import Login from '../views/Login'
import CategoryCreate from '../views/category/CategoryCreate'
import CategoryList from '../views/category/CategoryList'
import ItemCreate from '../views/item/ItemCreate'
import ItemList from '../views/item/ItemList'
import HeroCreate from '../views/hero/HeroCreate'
import HeroList from '../views/hero/HeroList'
import ArticleCreate from '../views/article/ArticleCreate'
import ArticleList from '../views/article/ArticleList'
import AdCreate from '../views/ad/AdCreate'
import AdList from '../views/ad/AdList'
import AdminCreate from '../views/admin/AdminCreate'
import AdminList from '../views/admin/AdminList'

Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name: 'Login',
    component: Login,
    meta: {isPublic:true}
  },
  {
    path:'/',
    redirect: '/category/list',
    component: Main
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children:[

      // category
      {
        path:'/category/create',
        name:'CategoryCreate',
        component:CategoryCreate
      },
      {
        path:'/category/create/:id',
        name:'CategoryCreate',
        component:CategoryCreate,
        props:true,
        // props  父组件传递数据给子组件
      },
      {
        path:'/category/list',
        name:'CategoryList',
        component:CategoryList
      },

      // item
      {
        path:'/item/create/',
        name:'ItemCreate',
        component:ItemCreate,
        props:true,
      },
      {
        path:'/item/create/:id',
        name:'ItemCreate',
        component:ItemCreate,
        props:true,
      },
      {
        path:'/item/list',
        name:'ItemList',
        component:ItemList
      },

      // hero
      {
        path:'/hero/create/',
        name:'HeroCreate',
        component:HeroCreate,
        props:true,
      },
      {
        path:'/hero/create/:id',
        name:'HeroCreate',
        component:HeroCreate,
        props:true,
      },
      {
        path:'/hero/list',
        name:'HeroList',
        component:HeroList
      },

      // article
      {
        path:'/article/create/',
        name:'ArticleCreate',
        component:ArticleCreate,
        props:true,
      },
      {
        path:'/article/create/:id',
        name:'ArticleCreate',
        component:ArticleCreate,
        props:true,
      },
      {
        path:'/article/list',
        name:'ArticleList',
        component:ArticleList
      },

      // ad
      {
        path:'/ad/create/',
        name:'AdCreate',
        component:AdCreate,
        props:true,
      },
      {
        path:'/ad/create/:id',
        name:'AdCreate',
        component:AdCreate,
        props:true,
      },
      {
        path:'/ad/list',
        name:'AdList',
        component:AdList
      },

      // admin
      {
        path:'/admin/create/',
        name:'AdminCreate',
        component:AdminCreate,
        props:true,
      },
      {
        path:'/admin/create/:id',
        name:'AdminCreate',
        component:AdminCreate,
        props:true,
      },
      {
        path:'/admin/list',
        name:'AdminList',
        component:AdminList
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

//beforeEach路由守卫  to表示你要去哪个页面  from表示你来自哪个页面  next表示接下来要怎么处理
router.beforeEach((to,from,next)=>{
  if(!to.meta.isPublic && !localStorage.token){
    return next('/login')
  }
  next()
})

export default router
