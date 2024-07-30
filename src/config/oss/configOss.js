import { stsOSS,gettimenow } from '@/api/extra'
import OSS from 'ali-oss'

let token = null;

//判断令牌是否过期
const isCredentialsExpired = async (tokend) => {
    if (!tokend) {
        return true;
    }
    //拿到ststoken的出产时间
    const expireDate = new Date(tokend.Expiration);
    //拿到现在的时间戳
    const now = await gettimenow();
    // 对比，如果有效期不足一分钟，视为过期。
    return expireDate.getTime() - now.time <= 60000;
}

export const configOss = async () => {
    try {
        //进行懒处理，防着频繁获取sts。
        if (await isCredentialsExpired(token)) {
            const response = await stsOSS();
            if (response.code !== 200) {
                // 处理错误的HTTP状态码。
                throw new Error(
                    `获取STS令牌失败`
                );
            }
            //拿到sts临时秘钥
            token = response.data;
        }
        
        //配置OSS
        const client = new OSS({
            //自定义的域名
            // endpoint: process.env.VUE_APP_CN,
            // cname: true,
            // yourRegion填写Bucket所在地域。以华东1（杭州）为例，yourRegion填写为oss-cn-hangzhou。
            region: process.env.VUE_APP_REGION,
            accessKeyId: token.AccessKeyId,
            accessKeySecret: token.AccessKeySecret,
            stsToken: token.SecurityToken,
            // 填写Bucket名称。
            bucket: process.env.VUE_APP_BUCKET,
            //响应超时时间
            timeout:1000 * 120,
            // 刷新临时访问凭证，过期时会自动刷新
            refreshSTSToken: async () => {
                const {data} = await stsOSS();
                return {
                    accessKeyId: data.AccessKeyId,
                    accessKeySecret: data.AccessKeySecret,
                    stsToken: data.SecurityToken,
                };
            },
        })
        return client
    } catch (error) {
        throw new Error("sts出错:" + error)
    }
}


