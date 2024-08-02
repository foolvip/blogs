# h5微应用
## 页面title ios无效
```js
// router.beforeEach(async function (to, from, next) {}
if (to.meta && to.meta.title) {
    document.title = to.meta.title
    dd.ready(() => {
        dd.setNavigationTitle({
            title: document.title,
            success: () => {},
            fail: () => {},
            complete: () => {},
            });
    })
    
}

```
## [免登录](https://open.dingtalk.com/document/orgapp/logon-free-process)

```js
// ---------------     1. npm i dingtalk-jsapi -S   ----------------------------------------
// ---------------      2. 写'@/utils/auth.js'文件  ----------------------------------------
import api from '@/api/index'
import store from '@/store'
import * as dd from 'dingtalk-jsapi';
import router from '@/router'
// 是否已授权，如果已授权则不需要重复授权
let isAuth = false

/**
 * 微信公众号授权
 * @param {string} appId 微信公众号Appid
 * @returns {Boolean} 是否授权成功
 * 返回值说明：true：表示'授权成功'或'无需授权'（即：通过）；不通过则会跳转到微信授权页面授权。
 */
export const dingdingAuth = () => {
    console.log('钉钉免登录')
    return new Promise((resolve) => {
        // 已授权直接返回true
        if (isAuth) {
            resolve(true)
            return
        }

        dd.ready(() => {
            //获取免登授权码
            dd.runtime.permission.requestAuthCode({
              corpId: "",
              onSuccess: (info) => {
                // 根据钉钉提供的api 获得code后,再次调用这个callback方法
                // 由于是钉钉获取code是异步操作,不知道什么时候执行完毕
                // callback 函数会等他执行完毕后在自己调用自己
                // callback(info.code)
                console.log(info.code)
                api.boardDingdingLogin({ authCode: info.code },{codeAllPass: true}).then((res) => {
                    if (res.result && res.result.userid) {
                      isAuth=true
                      store.commit("setUserInfo", res.result);
                      resolve(true)
                        // result.token && localStorage.setItem('token', result.token || '')
                    }else{
                        // this.$dialog.alert({
                        //     message: res.message,
                        // });
                        isAuth=false
                        router.push({ path: '/NoPermission' }).catch(() => console.log('没有项目别名，跳转至404页面'))
                    }
                    
                })
              },
              onFail: (err) => {
                alert('fail');
                alert(JSON.stringify(err));
              },
            });
          });
        
    })
}

// --------------------------------------- 3. 修改路由配置 router-----------------------------
import * as dd from 'dingtalk-jsapi';
import { dingdingAuth } from '@/utils/auth.js'

router.beforeEach(async function (to, from, next) {
    console.log('to', to)
    // 动态设置页面的标题(以上自定义页面不使用mata中的标题设置)
    if (to.meta && to.meta.title) {
        document.title = to.meta.title
    }
    if (to.path == '/NotFound' || to.path == 'WxAuthRedirect' || to.path == '/noPC') {
        next()
        return
    }
    if(!isMobile()){
        next('/noPC')
        return
    }
    if (to.meta.auth) {  //  ---------------------------------------------------- 钉钉免登录-------------------------------
        // 如果对应环境有appId，则先进行授权
        if (dd.env.platform !== "notInDingTalk" && await dingdingAuth()) {
            next()
        }else{
            next()
        }
        
    } else {
        next()
    }

    
})
```

**注意：**
code -> AccessToken -> userid -> 用户详细信息；
建议**用户信息**保存在前端缓存中（dd.setStorage）或者cookie中，避免每次进入应用都调用钉钉接口进行免登。


## [添加监控](https://open.dingtalk.com/document/orgapp/access-the-monitoring-center?spm=a2q3p.21071111.0.0.10085Jpq5JpqHJ)

- 按照说明直接粘贴代码即可

