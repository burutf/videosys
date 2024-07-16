// meta属性解释
// aside 为true表示这个路由会动态渲染到侧边栏导航
//      shownav 表示是否要进行渲染
//      auth 表示权限级别 1-10数字越大需要的权限越大

export default [
    //这一块会动态渲染到侧边导航栏
    {
        path: '/', redirect: 'overview', name: 'layout', meta: { aside: true }, component: () => import('@/layout'),
        children: [
            //上传的路由
            {
                path: 'video-upload', name: '上传', redirect: 'video-upload/upload', name: 'video-upload', meta: { shownav: false, auth: 1 }, component: () => import('@/views/Uploadsys'),
                children: [
                    { path: 'upload', name: '视频上传',meta:{title: '视频上传'},  component: () => import('@/views/chidren/uploadsys//Uploadnew') },
                    { path: 'status', name: '上传状态',meta:{title: '上传状态'},  component: () => import('@/views/chidren/uploadsys/UploadStatus') }
                ]
            },
            {
                path: 'overview', name: '总览',  iconClass: 'el-icon-s-data', meta: { title: '总览',shownav: true, auth: 1 }, component: () => import('@/views/Overview')
            },
            {
                path: 'videomanagement', name: '视频管理',  iconClass: 'el-icon-video-camera-solid', meta: { title: '视频管理',shownav: true, auth: 1 }, component: () => import('@/views/Videosys')
            },
            {
                path: 'usersys', name: '人员管理',  iconClass: 'el-icon-user', meta: { title: '人员管理',shownav: true, auth: 9 }, component: () => import('@/views/Usersys')
            }
        ]
    },
    {
        path: '/login', name: '登陆', meta: { aside: false }, component: () => import('@/views/Login')
    },
    {
        path: '/404', name: 'error', meta: { aside: false }, component: () => import('@/error')
    },
    {
        path: '*', redirect: '/404', meta: { aside: false }
    }
]