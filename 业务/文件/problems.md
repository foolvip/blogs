# 问题

## 非本地环境，a标签下载本地静态资源文件(excel)后，无法查看文件内容

### 问题描述

```html
<a href="/public/static/excel.xlsx" download>下载excel</a>
```

vue项目的public文件夹下新建static文件夹，将需要下载的excel文件放入static文件夹中，在html中通过a标签下载该文件，但是下载到本地后，打开文件显示无法查看文件内容。

### 原因

因为public文件夹中的文件资源，打包后是存放在dist/static文件夹中的，下载资源路径不存在，所以无法查看文件内容。

### 解决方案

将public文件夹下的static文件夹移动到dist文件夹下，这样下载资源路径就存在了，就可以正常查看文件内容。

```html
<a href="/static/excel.xlsx" download>下载excel</a>
```

这样就可以正常下载文件并查看文件内容

## 滚动到可视范围内
```js
document.getElementById('baseLayoutBg').scrollIntoView()
```
# 总结

## 模拟a标签下载文件

```js
// html
// <el-button type="primary" plain @click="frontDownload">本地下载</el-button>

//js
frontDownload() {
  var a = document.createElement("a");
  a.href = "/static/模板.xlsx"; // 绝对路径.
  a.download = "下载啦.xlsx"; 
  a.style.display = "none"; 
  document.body.appendChild(a); 
  a.click(); // 模拟点击了a标签
  a.remove(); // 删除a标签
}

```