<template>
  <!-- 小屏显示 -->
  <ul class="headlist" @click="navfn">
    <li
      v-for="e of navdatatwo"
      :key="e.path"
      :id="e.meta.id"
      :data-name="e.name"
    >
      <!-- <i :class="e.iconClass" style="margin-right: 5px"></i> -->
      {{ e.name }}
    </li>
    <div
      :style="{ left: actleft + 'px', width: actlong + 'px' }"
      class="actcl"
    ></div>
  </ul>
</template>

<script>
//引入导航栏数组
import { navroutes } from "@/router/routes";
//引入用户权限
import { mapState } from "vuex";
export default {
  name: "Pageheadersmall",
  data() {
    return {
      //路由数组
      navdata: [],
      //小屏显示时列表底下的线条
      //位置左
      actleft: 10,
      //长度
      actlong: 0,
    };
  },
  mounted() {
    this.navdata = navroutes;
    this.navactrouter();
  },
  methods: {
    //开始时拿到当前的路由，根据路由激活现在的导航
    navactrouter() {
      this.$nextTick(() => {
        const ever = document.getElementById(this.$route.meta.id);
        this.actlong = ever.clientWidth * 0.8;
        this.actleft = ever.offsetLeft + ever.clientWidth * 0.1;
      });
    },
    //选中跳转处理
    navfn(e) {
      const { target } = e;
      //处理选择条的位置
      //   this.actlong = target.clientWidth * 0.8;
      //   this.actleft = target.offsetLeft + target.clientWidth * 0.1;
      //跳转
      if (this.$route.name === target.dataset.name ) return
      this.$router.push({ name: target.dataset.name });
    },
  },
  computed: {
    ...mapState(["userinfo"]),
    // 对路由数组进行二次筛选
    navdatatwo() {
      const arrroutes = this.navdata.filter((e) => {
        //auth 表示权限级别 数字越大越牛
        //看当前用户属于哪个级别，级别够就可以访问
        if (this.userinfo.auth >= e.meta.auth) {
          return true;
        }
      });
      return arrroutes;
    },
  },
  watch: {
    $route() {
      this.navactrouter();
    },
  },
};
</script>

<style lang="less" scoped>


.headlist {
  flex-wrap: nowrap;
  position: absolute;
  display: flex;
  width: 0;
  overflow-x: hidden;
  text-wrap: nowrap;
  li {
    padding: 0 10px;
    cursor: pointer;
  }
  .activate {
    border-bottom: 1px solid black;
  }
  .actcl {
    position: absolute;
    bottom: 15px;
    width: 10px;
    height: 2px;
    background-color: red;
    transition: all 0.3s;
  }
}
.headlist::-webkit-scrollbar {
  display: none;
}


@media (max-width: 560px) {
  .headlist {
    display: flex;
    position: relative;
    overflow: auto;
    width: unset;
  }
}
</style>
