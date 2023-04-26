// 主入口
import Vue from "vue";
import App from "./App.vue";
// import { Row,Button } from 'element-ui';
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
//引入router，再挂载L17
import router from "./router";
import store from "./store";
import "./api/mock";
import Cookie from "js-cookie";

Vue.config.productionTip = false;

Vue.use(ElementUI);

// 按需引入
// Vue.use(Row)
// Vue.use(Button)

// 添加全局前置导航守卫
router.beforeEach((to, from, next) => {
  // 判断token存不存在
  const token= Cookie.get("token");
  // 如果token不存在，说明当前用户是未登录，应该跳转至登录页。
  // to.name !=='login' 当前的路由对象 是不是不等于 登录页面
  if(!token && to.name !=='login'){
    // 路由name的名称
    next({name:'login'})
  }else if(token && to.name==='login'){//token存在,说明用户登录，此时跳转至首页
    next({name:'home'})
  }else{//token存在,默认执行生下的逻辑
    next();
  }
})

new Vue({
  router, //挂载
  store,
  render: (h) => h(App),
  created(){
    store.commit('addMenu',router)
  }
}).$mount("#app");
