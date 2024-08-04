import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "@/store";
Vue.use(VueRouter);

const vuepush = VueRouter.prototype.push;
//重写push方法，阻止报错
VueRouter.prototype.push = function push(location) {
  return vuepush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  mode: "history",
  routes,
  //滚动事件，跳转到顶部，刷新不跳转
  scrollBehavior(to, from, savedPosition) {
    if (to.name === from.name) {
      return {};
    } else {
      return { x: 0, y: 0 };
    }
  },
});
//全局前置守卫
router.beforeEach((to, from, next) => {
  //进行token登陆校验
  const token = store.state.token;
  //如果没有token的话，代表没有登陆
  if (!token) {
    //没有登陆要调到login界面直接进
    if (to.path === "/login") {
      next();
    } else {
      //没有登陆要跳到别的界面，给我去登录
      next("login");
    }
    //如果有token的话，代表登录了
  } else {
    //有token的话，不能进登陆页
    if (to.path === "/login") {
      next("/");
    } else {
      //进的别的界面不一定让进，得先鉴权，鉴权通过才可以进
      //开始进行鉴权
      const authentication = store.state.userinfo.isadmin;
      //判断路由是否需要权限
      if (to.meta.isadmin) {
        //路由需要鉴权的话，判断用户是不是有权限
        if (authentication) {
          //有权限直接放行
          next();
        } else {
          //没有权限阻止跳转
          next("/404");
        }
      } else {
        //不需要鉴权的路由直接放行
        next();
      }
    }
  }
});

//全局后置钩子（进行标题更换）
router.afterEach((to, from) => {
  //拿到标题
  const {
    meta: { title },
  } = to;
  document.title = title + " | 视频后台";
});

export default router;
