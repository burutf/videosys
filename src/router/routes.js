

export default [
    //这一块会动态渲染到侧边导航栏
    {
        path: '/', redirect: 'videosys', name: 'layout', component: () => import('@/layout'),
        children: [
            //上传的路由
            {
                path: 'video-upload', name: '视频上传', pathname: '视频上传', meta: { shownav: false }, component: () => import('@/views/Uploadsys')
            },
            {
                path: 'videosys', name: '视频管理', pathname: '视频管理', iconClass: 'el-icon-video-camera-solid', component: () => import('@/views/Videosys')
            },
            {
                path: 'usersys', name: '人员管理', pathname: '人员管理', iconClass: 'el-icon-user', component: () => import('@/views/Usersys')
            }
        ]
    },


    {
        path: '*', redirect: '/'
    }
]