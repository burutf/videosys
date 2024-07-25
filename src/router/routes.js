// meta属性解释
//      shownav 表示是否要进行渲染
//      auth 表示权限级别 1-10数字越大需要的权限越大


//这里是导航栏需要的
export const navroutes = [
    //上传的路由
    {
        path: 'video-upload', name: '上传', iconClass: 'el-icon-upload',redirect: 'video-upload/upload', meta: { shownav: false, auth: 1 ,id:'update'}, component: () => import('@/views/Uploadsys'),
        children: [
            { path: 'upload', name: '视频上传',meta:{title: '视频上传',id:'update'},  component: () => import('@/views/chidren/uploadsys//Uploadnew') },
            { path: 'status', name: '上传状态',meta:{title: '上传状态',id:'update'},  component: () => import('@/views/chidren/uploadsys/UploadStatus') }
        ]
    },
    {
        path: 'overview', name: '总览',  iconClass: 'el-icon-s-data', meta: { title: '总览',shownav: true, auth: 1,id:'overview' }, component: () => import('@/views/Overview')
    },
    {
        path: 'videomanagement', name: '视频管理',  iconClass: 'el-icon-video-camera-solid', meta: { title: '视频管理',shownav: true, auth: 1 ,id:'videomanagement'}, component: () => import('@/views/Videosys')
    },
    {
        path: 'slideshow', name: '轮播图',  iconClass: 'el-icon-picture-outline-round', meta: { title: '轮播图',shownav: true, auth: 9 ,id:'slideshow'}, component: () => import('@/views/Slideshow')
    },
    {
        path: 'usersys', name: '人员管理',  iconClass: 'el-icon-user-solid', meta: { title: '人员管理',shownav: true, auth: 9 ,id:'usersys'}, component: () => import('@/views/Usersys')
    }
]


export default [
    //这一块会动态渲染到侧边导航栏
    {
        path: '/', redirect: 'overview', name: 'layout', component: () => import('@/layout'),
        children: navroutes
    },
    {
        path: '/login', name: '登陆', meta:{title:'登陆'},component: () => import('@/views/Login')
    },
    {
        path: '/404', name: 'error',meta:{title:'404'}, component: () => import('@/error')
    },
    {
        path: '*', redirect: '/404'
    }
]


