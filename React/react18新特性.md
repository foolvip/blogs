2022 年 3 月 29 日，React 18 正式版终于发布了,react 17 的发布时间是 2020 年 10 月 20 号，距离 React 18 发布足足间隔一年半。

**注意**: React 18 已经放弃了对 ie11 的支持，将于 2022年6月15日 停止支持 ie，如需兼容，需要回退到 React 17 版本。

# Render API

## root API

React 18 引入了一个新的 root API，新的 root API 还支持 new concurrent renderer（并发模式的渲染），它允许你进入concurrent mode（并发模式）。

```js
// React 17
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const root = document.getElementById('root')!;

ReactDOM.render(<App />, root);

// React 18
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = document.getElementById('root')!;

ReactDOM.createRoot(root).render(<App />);
```

## 卸载

卸载组件时，也需要将 unmountComponentAtNode 升级为 root.unmount

```ts
// React 17
ReactDOM.unmountComponentAtNode(root);
// React 18
root.unmount();
```

## 删除render的回调函数

React 18 还从 render 方法中删除了回调函数，因为当使用Suspense时，它通常不会有预期的结果。在新版本中，如果需要在 render 方法中使用回调函数，我们可以在组件中通过 useEffect 实现：

```ts
// React 17
const root = document.getElementById('root')!;
ReactDOM.render(<App />, root, () => {
  console.log('渲染完成');
});

// React 18
const AppWithCallback: React.FC = () => {
  useEffect(() => {
    console.log('渲染完成');
  }, []);
  return <App />;
};
const root = document.getElementById('root')!;
ReactDOM.createRoot(root).render(<AppWithCallback />);

```

## ssr

如果项目使用了ssr服务端渲染，需要把hydration升级为hydrateRoot：

```ts
// React 17
import ReactDOM from 'react-dom';
const root = document.getElementById('root');
ReactDOM.hydrate(<App />, root);

// React 18
import ReactDOM from 'react-dom/client';
const root = document.getElementById('root')!;
ReactDOM.hydrateRoot(root, <App />);
```

## TypeScript 类型定义

React 18 还发布了 TypeScript 类型定义，可以直接使用，不需要额外的安装。值得注意的变化是，现在在定义props类型时，如果需要获取子组件children，那么你需要显式的定义它，例如这样：

```ts
// React 17
interface MyButtonProps {
  color: string;
}
const MyButton: React.FC<MyButtonProps> = ({ children }) => {
  // 在 React 17 的 FC 中，默认携带了 children 属性
  return <div>{children}</div>;
};
export default MyButton;

// React 18
interface MyButtonProps {
  color: string;
  children?: React.ReactNode;
}
const MyButton: React.FC<MyButtonProps> = ({ children }) => {
  // 在 React 18 的 FC 中，不存在 children 属性，需要手动申明
  return <div>{children}</div>;
};

export default MyButton;

```

# setState 自动批处理

React 18 通过在默认情况下执行批处理来实现了开箱即用的性能改进。
批处理是指为了获得更好的性能，在数据层，将多个状态更新批量处理，合并成一次更新（在视图层，将多个渲染合并成一次渲染）。

## 1.在 React 18 之前

在React 18 之前，我们只在 React 事件处理函数 中进行批处理更新。默认情况下，在promise、setTimeout、原生事件处理函数中、或任何其它事件内的更新都不会进行批处理：

### 情况一：React 事件处理函数

```js
import React, { useState } from 'react';

// React 18 之前
const App: React.FC = () => {
  console.log('App组件渲染了！');
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  return (
    <button
      onClick={() => {
        setCount1(count => count + 1);
        setCount2(count => count + 1);
        // 在React事件中被批处理
      }}
    >
      {`count1 is ${count1}, count2 is ${count2}`}
    </button>
  );
};

export default App;
```

渲染次数和更新次数是一样的，即使我们更新了两个状态，每次更新组件也只渲染一次。

### 情况二：setTimeout

```js
import React, { useState } from 'react';

// React 18 之前
const App: React.FC = () => {
  console.log('App组件渲染了！');
  const [count, setCount] = useState(0);
  setTimeout(() => {
    setCount(count => count + 1);
    setCount(count => count + 1);
    // 在setTimeout中被批处理
  }, 1000);
  return <div>{`count is ${count}`}</div>;
};


export default App;
```

渲染次数和更新次数是一样的，即使我们更新了两个状态，每次更新组件也只渲染一次。