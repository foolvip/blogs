# 添加移动端调试

```html
<head>
    <script src="https://cdn.bootcdn.net/ajax/libs/vConsole/3.9.0/vconsole.min.js"></script>
    <script>
        var vConsole = new VConsole();
    </script>
</head>
    
```

# 适配字体屏幕宽高
```html
<script>

    // rem定义
    /*720代表设计师给的设计稿的宽度，你的设计稿是多少，就写多少;100代表换算比例，这里写100是
    为了以后好算,比如，你测量的一个宽度是100px,就可以写为1rem,以及1px=0.01rem等等*/
    getRem(375, 100)

    window.onresize = function () {
        getRem(375, 100)
    }

    function getRem(pwidth, prem) {
        var html = document.getElementsByTagName('html')[0]
        var oWidth = document.documentElement.clientWidth || document.body.clientWidth
        html.style.fontSize = (oWidth / pwidth) * prem + 'px'
    }

    // 安卓机中，默认字体大小不让用户修改
    ;(function () {
        if (typeof WeixinJSBridge == 'object' && typeof WeixinJSBridge.invoke == 'function') {
            handleFontSize()
        } else {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', handleFontSize, false)
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', handleFontSize)
                document.attachEvent('onWeixinJSBridgeReady', handleFontSize)
            }
        }

        function handleFontSize() {
            // 设置网页字体为默认大小
            WeixinJSBridge.invoke('setFontSizeCallback', {
                fontSize: 0
            })
            // 重写设置网页字体大小的事件
            WeixinJSBridge.on('menu:setfont', function () {
                WeixinJSBridge.invoke('setFontSizeCallback', {
                    fontSize: 0
                })
            })
        }
    })()
</script>
```

# 监听页面报错刷新页面
```html
<script>
    // 监听资源加载失败后，刷新页面
    window.addEventListener(
        'error',
        function (e) {
            console.log('error', e)

            const targetInfo = e.target
            const tagName = targetInfo.localName

            let lastReloadTs = new Date(
                localStorage.getItem('lastReload')
            ).getTime()
            let timeDiff = new Date().getTime() - lastReloadTs

            console.log('timeDiff', tagName, lastReloadTs, timeDiff)

            // js加载错误，则刷新页面（不重复刷新）
            if ((tagName === 'script' || tagName === 'link') && timeDiff > 5000) {
                console.log('设置最后时间')
                localStorage.setItem('lastReload', new Date().toString())
                // 刷新
                window.location.reload()
            }
        },
        true
    )
</script>
```