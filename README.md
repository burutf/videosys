# 视频后台

用到的技术:Vue2全家桶、Element-ui

后台管理系统：https://github.com/burutf/videoadmin

后台：https://github.com/burutf/videosys

前台：https://github.com/burutf/videoindex

暂不支持注册功能

## 目前实现的功能

### 登陆

使用JWT技术，有三个级别权限，root、admin、普通用户，可以管理和获取的数据不同

### 上传

​	通过oss进行视频上传，实时获取进度；

​	支持多条任务同时进行。

### 总览

​	使用Echarts进行数据展示

 ### 轮播图管理

​	使用了Swiper进行轮播图的可视化管理，实现了排序和历史记录功能

### 视频管理

​	对已经上传视频的删改查

### 用户管理

​	对用户的删改、可以创建权限低于自身的下级用户
