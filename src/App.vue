<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',

}
</script>


<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
  background-color: rgb(250, 250, 250);
  // scrollbar-gutter: stable;
}

* {
  box-sizing: border-box;
}

h1,h2,h3,h4,h5,h6{
  margin: 0;
}

a{
  text-decoration: none;
}
</style>
