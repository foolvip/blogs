# 问题

## 路由跳转
```js
// 一直跳登录页面，死循环
router.beforeEach((to, from, next) => {
  if(登录){
     next()
  }else{
      next({ name: 'login' }); 
  }
});

// 修改
if(登录 || to.name === 'login'){ next() } // 登录，或者将要前往login页面的时候，就允许进入路由

```
# 总结

## 完整的路由导航解析流程(不包括其他生命周期)：

1. 触发进入其他路由。
2. 调用要离开路由的组件守卫beforeRouteLeave
3. 调用局前置守卫：beforeEach
4. 在重用的组件里调用 beforeRouteUpdate
5. 调用路由独享守卫 beforeEnter。
6. 解析异步路由组件。
7. 在将要进入的路由组件中调用beforeRouteEnter
8. 调用全局解析守卫 beforeResolve
9. 导航被确认。
10. 调用全局后置钩子的 afterEach 钩子。
11. 触发DOM更新(mounted)。
12. 执行beforeRouteEnter 守卫中传给 next 的回调函数

## keep-alive

缓存路由组件：

使用keep-alive可以将所有路径匹配到的路由组件都缓存起来，包括路由组件里面的组件，keep-alive大多数使用场景就是这种

```js
<keep-alive>
    <router-view></router-view>
</keep-alive>
```
在被keep-alive包含的组件/路由中，会多出两个生命周期的钩子:activated 与 deactivated。

activated在组件第一次渲染时会被调用，之后在每次缓存组件被激活时调用。

### activated调用时机:
第一次进入缓存路由/组件，在mounted后面，beforeRouteEnter守卫传给 next 的回调函数之前调用：
```js
beforeMount=> 如果你是从别的路由/组件进来(组件销毁destroyed/或离开缓存deactivated)=> mounted=> activated 进入缓存组件 => 执行 beforeRouteEnter回调
```
因为组件被缓存了，再次进入缓存路由/组件时，不会触发这些钩子：beforeCreate、 created、 beforeMount、 mounted 都不会触发。

所以之后的调用时机是：
组件销毁destroyed/或离开缓存deactivated => activated 进入当前缓存组件 => 执行 beforeRouteEnter回调；

// 组件缓存或销毁，嵌套组件的销毁和缓存也在这里触发

### deactivated：组件被停用(离开路由)时调用

使用了keep-alive就不会调用beforeDestroy(组件销毁前钩子)和destroyed(组件销毁)，因为组件没被销毁，被缓存起来了。

这个钩子可以看作beforeDestroy的替代，如果你缓存了组件，要在组件销毁的的时候做一些事情，你可以放在这个钩子里。

如果你离开了路由，会依次触发：

组件内的离开当前路由钩子beforeRouteLeave => 路由前置守卫 beforeEach => 全局后置钩子afterEach => deactivated 离开缓存组件 => activated 进入缓存组件(如果你进入的也是缓存路由)

// 如果离开的组件没有缓存的话 beforeDestroy会替换deactivated
// 如果进入的路由也没有缓存的话 全局后置钩子afterEach=>销毁 destroyed=> beforeCreate等

那么，如果我只是想缓存其中几个路由/组件，那该怎么做？

## 缓存路由

### Vue2.1.0之前:
通过路由配置字段，判断是否缓存组件
```js
<keep-alive>
    <router-view v-if="$route.meta.keepAlive">
        <!--这里是会被缓存的路由-->
    </router-view>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive">
    <!--因为用的是v-if 所以下面还要创建一个未缓存的路由视图出口-->
</router-view>

//router配置
new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/:id',
      name: 'edit',
      component: Edit,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    }
  ]
});
```

### Vue2.1.0版本之后：

使用路由元信息的方式，要多创建一个router-view标签，并且每个路由都要配置一个元信息，是可以实现我们想要的效果，但是过于繁琐了点。

幸运的是在Vue2.1.0之后，Vue新增了两个属性配合keep-alive来有条件地缓存 路由/组件。

新增属性：

include：匹配的 路由/组件 会被缓存
exclude：匹配的 路由/组件 不会被缓存
include和exclude支持三种方式来有条件的缓存路由：采用逗号分隔的字符串形式，正则形式，数组形式。

正则和数组形式，必须采用v-bind形式来使用。

缓存组件的使用方式：

```js
<!-- 逗号分隔字符串 -->
<keep-alive include="a,b">
  <component :is="view"></component>
</keep-alive>

<!-- 正则表达式 (使用 `v-bind`) -->
<keep-alive :include="/a|b/">
  <component :is="view"></component>
</keep-alive>

<!-- 数组 (使用 `v-bind`) -->
<keep-alive :include="['a', 'b']">
  <component :is="view"></component>
</keep-alive>
```
但更多场景中，我们会使用keep-alive来缓存路由：
```js
<keep-alive include='a'>
    <router-view></router-view>
</keep-alive>
```
匹配规则：

首先匹配组件的name选项，如果name选项不可用。
则匹配它的局部注册名称。 (父组件 components 选项的键值)
匿名组件，不可匹配。
比如路由组件没有name选项，并且没有注册的组件名。

只能匹配当前被包裹的组件，不能匹配更下面嵌套的子组件。
比如用在路由上，只能匹配路由组件的name选项，不能匹配路由组件里面的嵌套组件的name选项。

文档：<keep-alive>不会在函数式组件中正常工作，因为它们没有缓存实例。
exclude的优先级大于include
也就是说：当include和exclude同时存在时，exclude生效，include不生效。
```js
<keep-alive include="a,b" exclude="a">
  <!--只有a不被缓存-->
  <router-view></router-view>
</keep-alive>
```
当组件被exclude匹配，该组件将不会被缓存，不会调用activated 和 deactivate

### 组件生命周期
[生命周期](./imgs/lifeCircle.jpg)

大部分生命周期并不会用到, **注意**：

- ajax请求最好放在created里面，因为此时已经可以访问this了，请求到数据就可以直接放在data里面。
- 关于dom的操作要放在mounted里面，在mounted前面访问dom会是undefined。
- 每次进入/离开组件都要做一些事情，用什么钩子：
    1. 不缓存：  
        进入的时候可以用created和mounted钩子，离开的时候用beforeDestory和destroyed钩子,beforeDestory可以访问this，destroyed不可以访问this。
    2. 缓存了组件：  
        缓存了组件之后，再次进入组件不会触发`beforeCreate`、`created` 、`beforeMount`、 `mounted`，**如果你想每次进入组件都做一些事情的话，你可以放在`activated`进入缓存组件的钩子中**。

同理：离开缓存组件的时候，`beforeDestroy`和`destroyed`并不会触发，可以使用`deactivated`离开缓存组件的钩子来代替。

#### 触发钩子的完整顺序：

将路由导航、keep-alive、和组件生命周期钩子结合起来的，触发顺序，假设是从a组件离开，第一次进入b组件：

- beforeRouteLeave:路由组件的组件离开路由前钩子，可取消路由离开。
- beforeEach: 路由全局前置守卫，可用于登录验证、全局路由loading等。
- beforeEnter: 路由独享守卫
- beforeRouteEnter: 路由组件的组件进入路由前钩子。
- beforeResolve:路由全局解析守卫
- afterEach:路由全局后置钩子
- beforeCreate:组件生命周期，不能访问this。
- created:组件生命周期，可以访问this，不能访问dom。
- beforeMount:组件生命周期
- deactivated: 离开缓存组件a，或者触发a的beforeDestroy和destroyed组件销毁钩子。
- mounted:访问/操作dom。
- activated:进入缓存组件，进入a的嵌套子组件(如果有的话)。
- 执行beforeRouteEnter回调函数next。













# 引用
- https://juejin.cn/post/6844903641866829838