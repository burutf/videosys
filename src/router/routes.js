

export default [
    //这一块会动态渲染到侧边导航栏,固定在下标0的位置，不要动
    {
        path:'/',redirect:'videosys',name:'layout',component:()=> import('@/layout'),
        children:[
            //上传的路由
            {
                path:'video-upload',name:'video-upload',meta:{shownav:false},component:()=>import('@/components/UploadFile.vue')
            },
            {path:'videosys',name:'videosys',title:'视频管理',iconClass:'el-icon-video-camera-solid',component:()=>import('@/views/Videosys')},
            {path:'usersys',name:'usersys',title:'人员管理',iconClass:'el-icon-user',component:()=>import('@/views/Usersys')}
        ]
    },
    
    
    {
        path:'*',redirect:'/'
    }
]