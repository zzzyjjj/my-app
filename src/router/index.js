import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main.vue'
import Mall from '../views/Mall.vue'
import PageOne from '../views/PageOne.vue'
import PageTwo from '../views/PageTwo.vue'
import Login from '../views/Login.vue'
Vue.use(VueRouter)

// 1.创建路由组件   Home.vue,User.vue

// 2.将组件和路由进行映射
const routes =[
    // 主路由 
    {path:'/',
    component:Main,
    name:'Main',
    redirect:'/home',
    children:[
        // 子路由
        // {path:'home',name:'home',component:Home},//首页
        // {path:'user',name:'user',component:User},//用户管理
        // {path:'mall',name:'mall',component:Mall}, //商品管理
        // {path:'page1',name:'page1',component:PageOne}, //页面1
        // {path:'page2',name:'page2',component:PageTwo}//页面2
    ] 
    },
    {
        path:'/login',
        // name是路由名称
        name:'login',
        component:Login
    }
]

// 3.创建router实例
const router =new VueRouter({
    routes//缩写：相当于routes: routes
})

// 4.router实例对外暴露
export default router

// 5.创建和挂在根实例,main.js就是根实例