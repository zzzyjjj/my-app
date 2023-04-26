<!-- 展示界面 -->
<template>
  <div id="app">
    <!-- component matched by the route will render here -->
    <!-- 路由出口：路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  // components: {
  // }
}
</script>

<style lang="less">
// 去除默认样式
  html,body,h3,p{
    margin: 0;
    padding: 0;
    .el-table--scrollable-x .el-table__body-wrapper {
    overflow-x: hidden;
}
}
</style>
