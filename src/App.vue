<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>

<style lang="less">
@media (max-width: 560px) {
  //当窗口过小时，message的处理
  .el-message-box {
    width: 80vw !important;
  }
}

html,
body {
  margin: 0;
  padding: 0;
  background-color: rgb(250, 250, 250);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}

ul li {
  list-style: none;
}

a {
  text-decoration: none;
}
</style>
