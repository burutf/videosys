import { stsOSS } from '@/api'
import OSS from 'ali-oss'

let token = null;

//判断令牌是否过期
const isCredentialsExpired = (token) => {
    if (!token) {
        
        return true;
    }
    //拿到ststoken的出产时间
    const expireDate = new Date(token.Expiration);
    //拿到现在的时间
    const now = new Date();
    // 对比，如果有效期不足一分钟，视为过期。
    return expireDate.getTime() - now.getTime() <= 60000;
}

export const configOss = async () => {
    try {
        //进行懒处理，防着频繁获取sts。
        if (isCredentialsExpired(token)) {
            const response = await stsOSS();
            if (response.code !== 200) {
                // 处理错误的HTTP状态码。
                throw new Error(
                    `获取STS令牌失败`
                );
            }
            //拿到sts临时秘钥
            token = response;
        }
        
        //配置OSS
        const client = new OSS({
            //自定义的域名
            endpoint: process.env.VUE_APP_CN,
            cname: true,
            // yourRegion填写Bucket所在地域。以华东1（杭州）为例，yourRegion填写为oss-cn-hangzhou。
            region: process.env.VUE_APP_REGION,
            accessKeyId: token.data.AccessKeyId,
            accessKeySecret: token.data.AccessKeySecret,
            stsToken: token.data.SecurityToken,
            // 填写Bucket名称。
            bucket: process.env.VUE_APP_BUCKET,
            // 刷新临时访问凭证，过期时会自动刷新
            refreshSTSToken: async () => {
                const refreshToken = await stsOSS();
                return {
                    accessKeyId: refreshToken.AccessKeyId,
                    accessKeySecret: refreshToken.AccessKeySecret,
                    stsToken: refreshToken.SecurityToken,
                };
            },
        })
        return client
    } catch (error) {
        return "sts出错:" + error
    }
}


