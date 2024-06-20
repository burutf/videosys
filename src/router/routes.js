// meta属性解释
// aside 为true表示这个路由会动态渲染到侧边栏导航
//      shownav 表示是否要进行渲染
//      isadmin 表示是否需要权限才能访问

export default [
    //这一块会动态渲染到侧边导航栏
    {
        path: '/', redirect: 'videomanagement', name: 'layout', meta: { aside: true }, component: () => import('@/layout'),
        children: [
            //上传的路由
            {
                path: 'video-upload', name: '上传', redirect: 'video-upload/upload', name: 'video-upload', meta: { shownav: false,isadmin:false }, component: () => import('@/views/Uploadsys'),
                children: [
                    { path: 'upload', name: '视频上传', pathname: '视频上传', component: () => import('@/views/chidren/uploadsys//Uploadnew') },
                    { path: 'status', name: '上传状态', pathname: '上传状态', component: () => import('@/views/chidren/uploadsys/UploadStatus') }
                ]
            },
            {
                path: 'videomanagement', name: '视频管理', pathname: '视频管理', iconClass: 'el-icon-video-camera-solid',meta: { shownav: true,isadmin:false }, component: () => import('@/views/Videosys')
            },
            {
                path: 'usersys', name: '人员管理', pathname: '人员管理', iconClass: 'el-icon-user',meta:{shownav: true,isadmin:true}, component: () => import('@/views/Usersys')
            }
        ]
    },
    {
        path:'/login',name:'登陆',meta: { aside: false },component:()=>import('@/views/Login')
    },
    {
        path: '*', redirect: '/',meta: { aside: false }
    }
]