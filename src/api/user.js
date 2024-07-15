import http from "@/config/axios";

//登陆接口
export const login = (data) => {
  return http.post("/login", data);
};

//获取用户信息
export const getuserinfo = () => {
  return http.get("/getuserinfo");
};

//获取所有用户列表
export const getmongodbusers = (options) => {
  return http.get("/getmongodbusers",{
    params:{options}
  });
};

//新增用户
export const adduser = ({ username, password, auth }) => {
  return http.post("/adduser", {
    username,
    password,
    auth,
  });
};

//修改用户
export const updateuser = (form,uptype) => {
  return http.post("/updateuser",{
    form,uptype
  });
};

//删除用户
export const deluser = (deluserid) =>{
    return http.delete('/deluser',{
        params:{uuid:deluserid}
    })
}

//获取权限列表
export const getauthlist = () => {
  return http.get("/getauthlist");
};

//获取用户总条数
export const getusersum = ()=>{
  return http.get("/getusersum")
}
