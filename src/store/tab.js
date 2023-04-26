import Cookie from "js-cookie";
export default {
  state: {
    // 控制菜单的展开还是收起
    isCollapse: false,
    tabsList: [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "s-home",
        url: "Home/Home",
      },
    ], //面包屑数据
    menu: [],
  },
  mutations: {
    // 修改菜单展开收起的方法
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse;
    },
    //更新面包屑数据
    selectMenu(state, val) {
      console.log(val, "val");
      // 判断添加的数据是否为首页
      if (val.name !== "home") {
        const index = state.tabsList.findIndex(
          (item) => item.name === val.name
        );
        // 如果不存在
        if (index === -1) {
          state.tabsList.push(val);
        }
      }
    },
    // 删除指定的tag数据
    closeTag(state, item) {
      // console.log(item,'item')
      const index = state.tabsList.findIndex((val) => val.name === item.name);
      //要删除的位置，要删除的个数
      state.tabsList.splice(index, 1);
    },
    // 设置menu的数据
    setMenu(state, val) {
      state.menu = val;
      Cookie.set("menu", JSON.stringify(val));
    },
    // 动态注册路由
    addMenu(state, router) {
      // 判断缓存中是否有数据
      if (!Cookie.get("menu")) return;
      // 如果数据存在
      const menu = JSON.parse(Cookie.get("menu"));
      // shuju更新
      state.menu = menu;
      // 组装动态路由的数据
      const menuArray = [];
      menu.forEach((item) => {
        // 有子菜单,遍历children属性
        if (item.children) {
          item.children =item.children.map((item) => {
            // component 对import的调用
            // 路径拼接
             item.component = () =>
              import(`../views/${item.url}`);
            return item;
          })
          // 将数据展开添加到menuArray中
          menuArray.push(...item.children);
        }else{
          item.component =()=>import(`../views/${item.url}`)
          menuArray.push(item)
        }
      })
      console.log(menuArray,'menuArray')
      // 路由的动态添加 :遍历当前的数据
      menuArray.forEach(item=>{
        // addRoute，zuoyong :动态添加路由
        // 找到主路由的名字
        router.addRoute('Main',item)
      })
    }
  }
};
