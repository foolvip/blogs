# 定义

SVG 是 Scalable Vector Graphics （可缩放矢量图形）的缩写。它是一种用于描述二维矢量图形的 XML 标记语言。与传统的基于像素的图像格式（如 JPEG、PNG 和 GIF 等）不同，SVG 使用数学描述图形，因此可以在不失真的情况下进行任意缩放。

- 基于 XML 的格式
- 可伸缩性
- 无像素限制： 传统图像格式受限于图像创建时存在的像素。SVG 则基于数学描述，不受此限制。它可以无限缩放，非常适合各种显示尺寸和分辨率。
- 数学表示： SVG 图形本质上是描述形状、路径和颜色的数学方程。这使得可以在不失去质量的情况下进行平滑缩放和操作。

# SVG 的发展历程

- 1999年，最初的讨论草案由W3C在1999年2月11日发布。
- 2001年，SVG 1.0正式成为W3C推荐标准。
- SVG 在 HTML5（2008年至今） ： 随着 HTML5 的发展，SVG 重新受到关注。HTML5 引入了对 SVG 的原生支持，使其成为 Web 开发中的重要组成部分。现代浏览器广泛支持内联 SVG，使开发人员能够直接在 HTML 文档中使用 SVG 代码
- SVG 2.0 的概念 （2010年后） ： 随着技术的不断发展， SVG 1.x 系列逐渐显露出一些局限性。因此，W3C 提出了 SVG 2.0的概念，旨在通过引入新特性、改进语言的可用性等方式，进一步推动 SVG 的发展。SVG 2.0 仍处于草案阶段，但显示了 W3C 对 SVG 未来的关注。

# SVG 的基本结构

- 根元素 <svg> ：SVG 文件的根元素是 <svg>，用于包裹所有的 SVG 内容，有点类似于 HTML 中的 <html> 元素。它可以包含用于设置 SVG 画布属性的命名空间和其他属性。
- 图形元素：SVG 支持多种图形元素，例如 <rect>（矩形）、 <circle>（圆形）、 <line>（直线）、 <path>（路径）等。这些元素用于创建各种形状，并可以通过设置属性来调整它们的大小、位置、颜色等。
- 文本元素 <text> ：使用 <text> 元素可以在 SVG 中添加文本。可以设置文本的位置、字体、大小等属性。
- 分组元素 <g> ：<g> 元素用于将多个图形元素组合在一起，形成一个组。这对于对组内的元素进行整体变换或样式设置很有用。
- 样式元素 <style> ：<style> 元素允许在 SVG 文件中嵌入样式，类似于 HTML 中的样式表。这使得可以使用 CSS 来定义 SVG 元素的外观。
- 属性：每个图形元素可以有一些属性，用于定义其外观和行为。例如，width 和 height 是矩形元素的属性，cx、cy 和 r 是圆形元素的属性。
- 其他元素和属性：除了上述元素外，SVG 还支持许多其他属性和元素，如 <line>、<polygon>、<ellipse>等。可以使用这些属性和元素创建更复杂的图形。

```xml
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="80" stroke-width="4" stroke="#f36" fill="#0cf" />
</svg>
```
# 优点

- 像素缩放
- 分辨率独立性：SVG 图形可以无限缩放，因此可以适应各种显示尺寸和分辨率。
- 可编程性和互动性：可以直接嵌入到 HTML 中，也可以通过 CSS 或 （和）JavaScript 进行操作
- SEO 友好：SVG 基于 XML 的特性为元数据提供了远远超越大多数图像类型提供的 title 和 alt 属性的机会。关键词、描述和链接都可以嵌入到 SVG 文件中，使内容更容易被搜索引擎识别，即它对搜索引擎友好的特性。
- 在可访问性方面同样具有多方面的优势：文本基础、元数据和描述、结构化图形、CSS 和 JavaScript互动、可嵌入性

# 缺点

- 复杂图像处理
- 文件大小： 尽管相对于位图图像，SVG 文件通常更小，但在某些情况下，它们可能比高度压缩的位图格式稍大。这可能在需要大量颜色或复杂图形的情况下成为问题。
- 复杂性和学习曲线： 对于初学者来说，理解和创建复杂的 SVG 可能需要一些时间。SVG 的标记语言可能对不熟悉 XML 的人来说具有一定的学习曲线。
- 不适合处理大量的实时数据： 如果需要处理大量实时生成的数据或像素级的图像，SVG 可能不是最佳选择。它更适用于静态或相对简单的图形。
- 浏览器兼容性： 尽管现代浏览器对 SVG 有很好的支持，但在一些旧版本的浏览器中可能存在兼容性问题。在这些情况下，需要考虑提供替代方案或进行降级处理。
- 动态图像： SVG 可以包含动画，但在处理复杂的动画效果时，可能会对性能产生影响。对于需要高度优化的动态内容，可能需要考虑其他技术，如Canvas或WebGL。
- 适用场景限制： SVG 适用于许多图形场景，但并非对所有类型的图像都是理想的选择。对于高度复杂或需要特定效果的图像，可能需要结合使用其他图像格式。

# SVG 与 Web 浏览器的兼容性

- [SVG兼容性](https://caniuse.com/svg)

SVG 部分子特性的浏览器兼容性的简要概述：

- SVG滤镜： Chrome、Firefox、Safari 和 Edge 等主流浏览器对 SVG 滤镜提供较好的支持，但在旧版本浏览器中可能存在一些差异。
- SVG 对 HTML 的效果（例如在 <div> 上应用 SVG 滤镜）： Chrome、Firefox、Safari 和 Edge 支持在 HTML 元素上应用 SVG 效果。
- SVG字体： SVG 字体在现代浏览器中得到广泛支持，但不同浏览器可能存在一些细微的差异。
- SVG片段标识符： 大多数主流浏览器支持SVG片段标识符的使用，但在一些旧版本浏览器和移动设备上可能存在局限。

# SVG 的应用领域

- ICON 图标的应用
- 数据可视化的应用
- 用户界面（UI）设计
- SVG 插画
- 文本效果的应用
- SVG 蒙板的应用
- SVG 动画的应用
- SVG 滤镜的应用
- 地图制图
- 矢量插画
- 图表制作
- 多媒体制作

# SVG 语法

SVG 使用 XML 语法，并定义了一系列标签来描述图形。SVG 图形由多个元素组成，这些元素可以是路径、形状、文本、图像、渐变、蒙版、滤镜等。

SVG 图形的基本结构如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <!-- SVG 元素 -->
</svg>
```

- `width` 和 `height` 属性定义了 SVG 图形的宽度和高度。
- `viewBox` 属性定义了 SVG 图形的可视化区域。
- `xmlns` 属性定义了 SVG 文档的命名空间。

## 呈现形式
- 一个 SVG 文档可以是空的。即，在 <svg> 元素内没有任何内容，例如：

```xml
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" height="300" class="graph">
    <!-- 我是一个空的 SVG 文档 -->
</svg>

<style>
.graph {
    display: block;
    border: 1px dashed #fff;
}
</style>
```
- 一个非常简单的 SVG 文档
- 一个复杂、嵌套深度较深的元素和图形元素的集合。
- 一个 SVG 文档可以独立存在，作为一个自包含的文件或资源
- 可以作为一个片段内嵌在另一个 XML 文档中




# 命名空间(xmlns)

在 SVG 中，命名空间是一种机制。使用命名空间是为了解决在 XML 文档中的元素冲突问题，以及为了支持模块化、扩展性和跨平台的标准化。
## 使用命名空间的一些原因
- 避免命名冲突：SVG 元素和属性的命名可能与其他 XML 标准或用户定义的元素名称相冲突。通过使用命名空间，SVG 可以确保其元素和属性的名称在文档中不会与其他命名空间中的相同名称发生冲突，避免混淆和解析错误。
- 模块化设计：命名空间支持 SVG 的模块化设计，使得 SVG 规范可以被扩展和修改而不破坏现有标准。开发者能够定义和使用自己的 SVG 元素或属性，而不必担心与 SVG 规范中的元素发生冲突。
- 标准扩展：命名空间允许 SVG 标准进行扩展，从而支持新的特性和功能。通过在不同的命名空间中引入新的元素和属性，SVG 规范可以在不同版本之间演进，并为未来的发展提供灵活性。
- 互操作性：命名空间确保 SVG 文档在不同的上下文和应用程序中能够被正确解析和处理。它促使标准的互操作性，允许不同的软件和系统之间共享和交换 SVG 文档而不损失信息。
- XML 规范兼容性：SVG 作为 XML 的一种，使用命名空间是符合 XML 规范的。这有助于确保 SVG 文档可以与其他 XML 文档一起使用，并在 XML 处理工具中正确解析。
- 语义清晰：命名空间使 SVG 文档中的元素有明确的语义，开发者可以清晰地了解元素的来源和用途。有助于提高文档的可读性和维护性。

使用命名空间是**确保 SVG 文档正确解析和渲染**的关键。就这一点来说，个人建议你在编写 SVG 代码时，请务必给 <svg> 元素声明命名空间。

如果你的 SVG 文档嵌套在 HTML 中，那么 HTML 解析器会自动为 <svg> 元素提供命名空间，你无需显式声明。
```html
<html>
    <body>
        <svg width="100" height="100">
            <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
        </svg>
    </body>
</html>

<!-- <svg> 元素会被自动置于正确的命名空间，无需手动添加 xmlns 属性。 -->

```

## xmlns:xlink

xmlns:xlink 是 SVG 中的一个命名空间声明，用于指定 XLink 命名空间（XML Linking Language）。XLink 是一种用于在 XML 文档中创建超链接的标准，它提供了在文档之间和文档内部创建链接的机制。

具体来说，xmlns:xlink 的作用是声明 xlink 命名空间，以便在 SVG 文档中使用 XLink 相关的属性，如 href，来定义超链接和链接行为。xmlns:xlink 帮助**定义 SVG 中与超链接相关的属性**，使得开发者可以在 SVG 文档中使用 XLink 标准来创建链接、引用外部资源等。这提供了在矢量图形中嵌入超链接的能力，使得 SVG 文档能够更灵活和交互性。

## 命名空间的前缀

在 <svg> 根元素上的 xmlns 属性通常不需要前缀，但在 XML 文档的其他位置，尤其是当文档中同时包含多个命名空间时，可能需要使用前缀。这样可以明确指定某个元素属于哪个命名空间。

```html
<svg:svg xmlns:svg="http://www.w3.org/2000/svg" width="100" height="100">
    <svg:circle cx="50" cy="50" r="40" fill="red" />
</svg:svg>
```


# svg元素

SVG 元素是构成 SVG 图形的基本单元。它们可以创建各种形状、文本、图像和动画，使你能够在 Web 页面上呈现出丰富而灵活的图形内容。从简单的矩形到复杂的路径，SVG 元素提供了丰富的选择，使你能够以无损失的方式调整图形的大小。

SVG 中包括多种不同类型的 SVG 元素：大致分为基本形状元素、路径元素、文本元素、容器元素（文本结构元素）、动画元素等，每个分类都有其独特的用途和特性。

SVG 元素分类体系理解SVG元素的用途和功能：
[svg元素](./imgs/svg元素.awebp)

上图中的很多元素又可以划分为“可渲染元素”（会在 SVG 画布中呈现）和“不可渲染元素”（在 SVG 画布中不会呈现）：  
[svg渲染分类](./imgs/svg渲染分类.awebp)

在 SVG 中，元素的堆叠顺序（显示顺序）是由它们在文档流中的位置和层次关系决定的。元素的渲染顺序取决于其在 DOM（文档对象模型）中的位置和父元素关系。通常，后面出现的元素会覆盖在前面出现的元素之上。

在 SVG 中，图层是通过元素的顺序来定义的。位于后面（出现在源码后面）的元素在图层中（Z 轴层又级）会显示在较前面（出现在源码前面）的元素之上。另外，到目前为止，我们是无法通过 CSS 的 z-index 属性来调整 SVG 元素的堆叠顺序[（据说在 SVG 2.0 中将会得到支持）](https://github.com/w3c/svgwg/wiki/SVG-2-new-features#new-style-properties)。

在实际使用中，具体的情况可能受到 SVG 元素类型、属性、CSS 样式的影响。因此，需要根据具体的 SVG 结构和样式来理解和控制元素的显示顺序。 [SVG 2.0 规范中的渲染模块中的渲染顺序](https://svgwg.org/svg-next/render.html#RenderingOrder)

# SVG 属性

SVG 和 HTML 还有一个共同的特征，那就是 SVG 元素也具有多种属性，这些属性用于定义元素的外观、行为和其他特征。以下是一些常见的 [SVG 元素属性](https://www.w3.org/TR/SVG/attindex.html)，具体属性的可用性和效果可能取决于元素类型和上下文。

[SVG元素属性URL](https://www.w3.org/TR/SVG/attindex.html)

SVG 属性可分为：通用属性和特定元素属性两类。通用属性适用于所有 SVG 元素，而特定元素属性则用于特定的 SVG 元素。

## 通用属性

## 特定元素属性

与 HTML 元素的属性一样，有很多属性是可以通用的，可以应用于所有 SVG 元素。
- id ：为元素定义唯一标识符
- class ：为元素定义一个或多个类名
- style ：为元素定义内联 CSS 样式
- fill： 定义元素的填充颜色
- stroke： 定义元素的边框颜色
- stroke-width： 定义元素的边框宽度
- transform： 定义元素的变换，如平移、旋转、缩放等
- 等等

## 特定元素属性
- SVG 有些属性只能应用于特定的元素上。例如 d 属性只适用于 <path> 元素
- x1 、y1 、x2 和 y2 只适用于 <line> 元素
- 有些属性也适用多个元素。例如用于 <circle> 元素上的 cx 和 cy 属性，也适用于 <ellipse>、<rect> 元素

```svg
<svg xmlns="http://www.w3.org/2000/svg">
    <path d="M10 80 Q 95 10 180 80" />
    <line x1="10" y1="10" x2="50" y2="50"  />
    <ellipse cx="10" cy="10" rx="50" ry="50"  />
    <rect x="10" y="10" width="200" height="200" rx="50" ry="50"  />
</svg>
```
[SVG2规范即将推出的新功能](https://github.com/w3c/svgwg/wiki/SVG-2-new-features)

使用 CSS 可以做一些更复杂的事情。例如在 SVG 的 <pattern> 元素中，通过 CSS 给图形添加动画效果：

```SVG
<svg xmlns="http://www.w3.org/2000/svg" width="100vw" height="100vh" class="pattern">
  <defs>
    <pattern id="blocks" patternUnits="userSpaceOnUse" width="240" height="240">
      <rect width="120" height="120" class="topleft black" />
      <rect width="120" height="120" class="topright white" x="120" />
      <rect width="120" height="120" class="bottomleft white" y="120" />
      <rect width="120" height="120" x="120" y="120" class="bottomright black" />
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#blocks)" />
</svg>
```
```CSS
@layer demo {
  /* @keyframes backgroundshift {
    49.99% {
      background: white;
    }
    50% {
      background: black;
    }
    100% {
      background: black;
    }
  } */

  @keyframes scaleshift {
    0% {
      scale:0.001;
      rx: 60;
    }
    35% {
      rx: 30;
    }
    50% {
      scale:1;
      rx: 0;
    }
    100% {
      scale:1;
      rx: 0;
    }
  }
  .pattern {
    display: block;
    min-height: 100vh;
    mix-blend-mode: overlay;
  }

  pattern rect {
    animation: scaleshift 3s infinite cubic-bezier(0.36, 0.17, 0.86, 0.67);
  }

  .black {
    fill: black;
    animation-direction: alternate;
  }
  .white {
    fill: white;
    animation-direction: alternate-reverse;
  }
  .topleft {
    transform-origin: 60px 60px;
  }
  .bottomleft {
    transform-origin: 60px 180px;
  }
  .topright {
    transform-origin: 180px 60px;
  }
  .bottomright {
    transform-origin: 180px 180px;
  }
}

```

# SVG 绘制流程
## 步骤一：创建 SVG 元素
```SVG
<!-- Step 01: 创建 SVG 元素 -->
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="400" height="400" class="bear">
    <!--  SVG 元素都在这里 -->
</svg>

```
## 步骤二：组织文档结构

使用 SVG 绘制图形，这一步不是必须的。但为了更好的组织 SVG 文档，或者你编写的 SVG 代码结构更清晰，更易于阅读和维护，那么可以根据需要，使用 <g> 元素或其他类似的结构合理的组织文档。
```SVG
<!-- Step 01: 创建 SVG 元素 -->
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="400" height="400" class="bear">
    <!--  Step 02: 使用 g 元素来分组 -->
    
    <!-- 熊的耳朵 -->
    <g class="bear__ears">
        <!-- 左耳朵 -->
        <g class="bear__ear--left">
            <!-- 绘制左耳朵 -->
        </g>
  
        <!-- 右耳朵 -->
        <g class="bear__ear--right">
            <!-- 绘制右耳朵 -->
        </g>
    </g>
    
    <!-- 熊的脸 -->
    <g class="bear__face">
        <!-- 绘制脸 -->
    </g>
    
    <!-- 熊的眼睛 -->
    <g class="bear__eyes">
        <!-- 绘制眼睛 -->
    </g>    
</svg>
```
## 步骤三：添加图形元素

图形要想在 SVG 画布上呈现，你必须得在 <svg> 元素中添加各种图形元素或可渲染的元素，例如线条（<line>）、圆（<circle>）、椭圆（<ellips>）、矩形（<rect>）和路径（<path>）等。每个图形元素都有相应的属性用于定义其外观和位置。

```SVG
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="400" height="400" class="bear">
    <!-- 熊的耳朵 -->
    <g class="bear__ears">
        <!-- 左耳朵 -->
        <g class="bear__ear--left">
            <!-- 绘制左耳朵 -->
            <circle cx="126" cy="118" r="32" fill="#8C6239" />
            <circle cx="126" cy="118" r="16" fill="#42210B" />
        </g>
    
        <!-- 右耳朵 -->
        <g class="bear__ear--right">
            <!-- 绘制右耳朵 -->
            <circle cx="290" cy="118" r="32" fill="#8C6239" />
            <circle cx="290" cy="118" r="16" fill="#42210B" />
        </g>
    </g>

    <!-- 熊的脸 -->
    <g class="bear__face">
        <!-- 绘制脸 -->
        <circle cx="208" cy="190" r="98" fill="#8C6239" />
        <!-- 绘制胡子 -->
        <path d="M263.4,217.4c0,34.4-24.7,62.3-55.1,62.3s-55.1-27.9-55.1-62.3s24.1-43.6,54.5-43.6
      S263.4,183,263.4,217.4z" fill="#C69C6D" />
    </g>

    <!-- 熊的眼睛 -->
    <g class="bear__eyes">
        <!-- 左眼睛 -->
        <circle class="bear__eye--left" cx="178" cy="160" r="8" />
    
        <!-- 左眼睛 -->
        <circle class="bear__eye--right" cx="238" cy="160" r="8" />
    </g>
    
    <!--  熊的鼻子  -->
    <ellipse class="bear__snout" cx="208" cy="204" rx="26" ry="10" fill="#42210B" />
  
    <!--  熊的嘴  -->
    <path class="bear__mouth" d="M243.2,234.2c-20.2,19.2-52,18.4-71.2-1.8" fill="none" stroke="#000000" stroke-width="6" stroke-miterlimit="10" />
</svg>

```
## 步骤四：应用样式
通常情况之下，完成第三步之后，小熊的脸就绘制出来了，也达到所要绘制的效果。但你可以做得更好。可以使用 CSS 样式为 SVG 元素设置样式。例如，在 CSS 中为元素设置填充颜色，边框颜色等。这样会使你的 SVG 代码更简洁。

很多图形的填充色是相同的，比如眼睛的填充颜色和嘴的边框色都是黑色，耳朵的外圆和脸是相同的填充颜色，耳朵的内圆和鼻子是应用了相同的填充颜色。可以用几行 CSS 代码就可以替代 SVG 元素中多个应用的 fill 属性。

```SVG
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="400" height="400" class="bear">
    <!-- 熊的耳朵 -->
    <g class="bear__ears">
        <!-- 左耳朵 -->
        <g class="bear__ear--left">
            <!-- 绘制左耳朵 -->
            <circle class="ear--out" cx="126" cy="118" r="32" />
            <circle class="ear--inner" cx="126" cy="118" r="16" />
        </g>
    
        <!-- 右耳朵 -->
        <g class="bear__ear--right">
            <!-- 绘制右耳朵 -->
            <circle class="ear--out" cx="290" cy="118" r="32" />
            <circle class="ear--inner" cx="290" cy="118" r="16" />
        </g>
    </g>

    <!-- 熊的脸 -->
    <g class="bear__face">
        <!-- 绘制脸 -->
        <circle cx="208" cy="190" r="98" />
        <!-- 绘制胡子 -->
        <path d="M263.4,217.4c0,34.4-24.7,62.3-55.1,62.3s-55.1-27.9-55.1-62.3s24.1-43.6,54.5-43.6
      S263.4,183,263.4,217.4z" />
    </g>

    <!-- 熊的眼睛 -->
    <g class="bear__eyes">
        <!-- 左眼睛 -->
        <circle class="bear__eye--left" cx="178" cy="160" r="8" />
    
        <!-- 左眼睛 -->
        <circle class="bear__eye--right" cx="238" cy="160" r="8" />
    </g>
    
    <!--  熊的鼻子  -->
    <ellipse class="bear__snout" cx="208" cy="204" rx="26" ry="10" />
  
    <!--  熊的嘴  -->
    <path class="bear__mouth" d="M243.2,234.2c-20.2,19.2-52,18.4-71.2-1.8" />
</svg>

```
```CSS
@layer demo {
    :root {
        --color-1: #8C6239;
        --color-2: #42210B;
        --color-3: #000;
        --color-4: #C69C6D;
    }
  
    .ear--out,
    .bear__face circle {
        fill: var(--color-1);
    }
  
    .ear--inner,
    .bear__snout{
        fill: var(--color-2);
    }
  
    .bear__eyes circle {
        fill: var(--color-3);
    }
  
    .bear__mouth {
        stroke: var(--color-3);
        stroke-width:6;
        fill:none;
        stroke-miterlimit: 10; 
    }
  
    .bear__face path {
        fill: var(--color-4);
    }
}

```
# 获取 SVG图形

## 在线工具
- [SVGEdit](https://svgedit.netlify.app/editor/index.html)
- [Vectr](https://vectr.com/editor/6c473d33-3650-483f-aeae-a400bca2c344)
- [MethodDraw ](https://editor.method.ac/)
- [BoxySVG](https://boxy-svg.com/app)
- [SVGator](https://www.svgator.com/)
- 等等

## JavaScript 动态生成 SVG
```html
<div id="svg-container">
    <!-- JavaScript 动态创建的 SVG 将放在这里 -->
</div>

<script>
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100");
    svg.setAttribute("height", "100");

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", "50");
    circle.setAttribute("cy", "50");
    circle.setAttribute("r", "40");
    circle.setAttribute("fill", "lime");
    svg.appendChild(circle);

    document.getElementById("svg-container").appendChild(svg);
</script>
```
- ECharts
- [D3.js](https://d3js.org/)：全名为 Data-Driven Documents，是一款强大的 JavaScript 库，致力于通过数据驱动的方式创建动态而富有交互性的数据可视化。由美国新闻与世界报道（U.S. News & World Report）的可视化专家 Mike Bostock 主导开发，D3.js 成为了前端领域中最受欢迎的数据可视化库之一。
- [SVG.js](https://svgjs.dev/docs/3.2/)：一款专注于创建和操作 SVG 图形的现代 JavaScript 库。它的设计理念强调简单性、可读性和灵活性，使得开发者可以轻松地使用链式调用的方式创建和操纵 SVG 元素。适用于创建简单到复杂的 SVG 图形，包括图标、图表、动画等。由于其轻便和易用的特性，SVG.js 常常成为小型项目或需要轻量级图形库的开发者的首选。
- [Snap.svg](http://snapsvg.io/)：一款由 Adobe 团队开发的现代 JavaScript 库，专注于操作和动画 SVG 图形。Snap.svg 提供了简洁而强大的 API，使得开发者能够轻松创建可交互的 SVG 图形，并实现各种动画效果。适用于各种需要 SVG 图形的项目，包括数据可视化、动画效果、交互式图形等。它的轻量性和强大的功能使得它成为 Web 开发者在处理 SVG 图形时的理想选择。
- [Two.js](https://two.js.org/)：一款轻量级而功能强大的 2D 绘图库，专注于创建各种图形和动画。它的设计注重简单性，使得开发者能够轻松地绘制和操作矢量图形，并实现丰富的动画效果。适用于需要 2D 图形和动画的各种场景，包括数据可视化、图表绘制、创意艺术和交互性设计等。由于其简单性和灵活性，Two.js 成为许多开发者选择的工具，用于实现富有创意和引人注目的图形效果。

# SVG使用方式

## HTML中的SVG
- SVG 作为普通图像应用于 HTML 中
- SVG 以内联方式嵌套在 HTML 中
- SVG 以 Data URIs 方式应用于 HTML 中

### SVG 作为普通图像应用于 HTML 中
使用 SVG 的最直接方式是将其视为图像，类似于我们处理JPG、PNG和GIF等格式的图像。在 HTML 中使用时，我们可以依然信赖我们的老朋友 <img> 标签：

```html
<img src="dog.svg" alt="dog" />
```
通常情况下，如果需要，可以添加 <img> 元素的属性，如宽度（width）、高度（height）和 alt等。
当 SVG 以这种方式应用于 HTML 时，浏览器将其视为任何其他图像。出于安全原因，SVG 文件中的任何脚本、外部样式表、链接和其他 SVG 交互性都将**被禁用**。

### HTML 内联 SVG

可以直接将 SVG 代码嵌入到 HTML 中，这样 SVG 就成为了 DOM 的一部分。可以像其他 HTML 元素一样为其添加类名，并且可以通过使用 CSS 和 JavaScript 进行相应的操作。'

```html
<body>
    <svg xmlns="http://www.w3.org/2000/svg" width="612" height="502.174" viewBox="0 65.326 612 502.174" class="svg">
       <ellipse class="ground" cx="283.5" cy="487.5" fill="#C6C6C6" rx="259" ry="80"/>
       <path class="kiwi" d="M210.333 65.331c-105.966.774-222.682 85.306-209.277 211.118 4.303 40.393 18.533 63.704 52.171 79.03 36.307 16.544 57.022 54.556 50.406 112.954-9.935 4.88-17.405 11.031-19.132 20.015 7.531-.17 14.943-.312 22.59 4.341 20.333 12.375 31.296 27.363 42.979 51.72 1.714 3.572 8.192 2.849 8.312-3.078.17-8.467-1.856-17.454-5.226-26.933-2.955-8.313 3.059-7.985 6.917-6.106 6.399 3.115 16.334 9.43 30.39 13.098 5.392 1.407 5.995-3.877 5.224-6.991-1.864-7.522-11.009-10.862-24.519-19.229-4.82-2.984-.927-9.736 5.168-8.351l20.234 2.415c3.359.763 4.555-6.114.882-7.875-14.198-6.804-28.897-10.098-53.864-7.799-11.617-29.265-29.811-61.617-15.674-81.681 12.639-17.938 31.216-20.74 39.147 43.489-5.002 3.107-11.215 5.031-11.332 13.024 7.201-2.845 11.207-1.399 14.791 0 17.912 6.998 35.462 21.826 52.982 37.309 3.739 3.303 8.413-1.718 6.991-6.034-2.138-6.494-8.053-10.659-14.791-20.016-3.239-4.495 5.03-7.045 10.886-6.876 13.849.396 22.886 8.268 35.177 11.218 4.483 1.076 9.741-1.964 6.917-6.917-3.472-6.085-13.015-9.124-19.18-13.413-4.357-3.029-3.025-7.132 2.697-6.602 3.905.361 8.478 2.271 13.908 1.767 9.946-.925 7.717-7.169-.883-9.566-19.036-5.304-39.891-6.311-61.665-5.225-43.837-8.358-31.554-84.887 0-90.363 29.571-5.132 62.966-13.339 99.928-32.156 32.668-5.429 64.835-12.446 92.939-33.85 48.106-14.469 111.903 16.113 204.241 149.695 3.926 5.681 15.819 9.94 9.524-6.351-15.893-41.125-68.176-93.328-92.13-132.085-24.581-39.774-14.34-61.243-39.957-91.247-21.326-24.978-47.502-25.803-77.339-17.365-23.461 6.634-39.234-7.117-52.98-31.273-29.365-51.617-81.947-74.215-137.452-73.811zM445.731 203.01c6.12 0 11.112 4.919 11.112 11.038 0 6.119-4.994 11.111-11.112 11.111s-11.038-4.994-11.038-11.111a11.01 11.01 0 0 1 11.038-11.038z"/>
    </svg>
</body>
```
在这种情况下，你无需在 <svg> 元素上显式指定宽度（width）或高度（height）属性，因为可以直接在 CSS 中控制 SVG 的尺寸。
```css
.svg {
    display: block;
    width: 80vh;
    height: auto;
}
```
### SVG 作为 Data URIs 用于 HTML

将 SVG 作为 Data URIs 直接嵌入，而不必依赖外部的 .svg 文件。Data URIs 可能不会减小实际文件大小，但因为数据直接存在，它可能更有效率。它不需要额外的 Http 请求。

Data URIs 和 Base64 编码，但这两者并非完全等同，Base64 编码只是 Data URIs 中一种常见形式。 Data URIs 是一种用于在 URL 中嵌入小型数据的方案，而 Base64 编码则是其中一种常用的数据编码方式。因此，可以统一称它们为“数据统一资源标识符”（Data Uniform Resouce Identifirs）或者简称为“数据 URI”。

Data URIs 还可以采用其他编码方式，不一定是 Base64。例如，可以使用纯文本方式（"text/plain"）或其他编码方式，但在实践中，Base64 是最常见的选择。
在线转 URIs的工具 [SVGViewer](https://www.svgviewer.dev/) 和 [encode](https://www.fffuel.co/eeencode/) 都是很不错的工具

## CSS 中的 SVG
在 CSS 中使用内联 SVG 时，通常将 Data URIs 视为在 CSS 中内联 SVG 的用法。换句话说，当希望将内联 SVG 用作 CSS 属性值时，需要指定以下三个部分：
- 作为 CSS 数据类型的 URL 值：url("....")
- 起始字符：data:image/svg+xml,
- 编译后的数据（Data URIs编码的SVG内容）：%3Csvg xmlns='``http://www.w3.org/2000/svg'`` viewBox='0 0 36 36'%3E%3Cpath fill='%23A0041E' d='M1 ...'

将这三部分组合在一起，你就得到了在CSS属性值中内联SVG的方法。

CSS 内联 SVG 还有一个小技巧，在 url() 中巧妙应用反斜杆（\），使其看上去像 JavaScript 模板字面量的功能。例如：

```css
.svg {
    background-image: url('data:image/svg+xml,\
    <svg t="1709991319824" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1522" width="200" height="200">\
    <path d="M607.860021 191.971879c52.992237 0 95.98594-42.993702 95.98594-95.985939S660.852259 0 607.860021 0s-95.98594 42.993702-95.985939 95.98594 42.993702 95.98594 95.985939 95.985939z m188.972319 298.156325l-46.593175-23.596544-19.397159-58.791388c-29.395694-89.186936-111.383684-151.577796-204.370062-151.777767-71.989455-0.199971-111.783625 20.197041-186.572671 50.392619-43.193673 17.397452-78.588488 50.392618-99.385441 92.386467L227.115795 425.937607c-15.597715 31.595372-2.999561 69.989748 28.39584 85.787433 31.19543 15.797686 69.189865 2.999561 84.987551-28.595811L353.897223 455.933213c6.998975-13.99795 18.597276-24.996338 32.995167-30.795489l53.592149-21.596836-30.395547 121.382219c-10.398477 41.593907 0.799883 85.787433 29.795635 117.582776l119.782454 130.780843c14.397891 15.797686 24.596397 34.794903 29.795635 55.391886l36.59464 146.578528c8.59874 34.194991 43.393644 55.191915 77.588634 46.593175 34.194991-8.59874 55.191915-43.393644 46.593175-77.588635l-44.393497-177.973929c-5.199238-20.596983-15.397744-39.794171-29.795635-55.391886l-90.986672-99.385442 34.394961-137.379876 10.998389 32.995167c10.598447 32.195284 33.395108 58.791388 63.390715 73.989162l46.593174 23.596543c31.19543 15.797686 69.189865 2.999561 84.987551-28.595811 15.397744-31.395401 2.79959-70.189718-28.595811-85.987404zM339.099391 771.486989c-6.399063 16.197627-15.997657 30.795489-28.395841 42.993702l-99.985354 100.185325c-24.996338 24.996338-24.996338 65.590392 0 90.58673s65.390421 24.996338 90.38676 0l118.7826-118.7826c12.198213-12.198213 21.796807-26.796075 28.395841-42.993702l26.996045-67.590099c-110.583801-120.582337-77.388664-83.587756-94.786115-107.38427l-41.393936 102.984914z" fill="lime" p-id="1523" />\
    </svg>');
}

```
这种小技巧最大的优势是，SVG 保持相当完整，既可读，又可编辑。这种方式存在的一个**风险**是，代码中的反斜杠（\）会不会受到代码格式化或压缩工具的影响，从而影响最终的结果，这一点无法确认，或许不会有问题。

## SVG 和 JavaScript
使用 JavaScript 直接将 SVG 文件加载到 Web 页面上的图像元素（<img>）的情况，可以有多种不同的方式实现该效果。

```javascript
// 1. new Image()  --------------------------------------------------------------

// 放置 img 的容器
const figureContainer = document.getElementById('figure');

// 需要加载的 kiwi.svg 文件路径
const svgFilePath = `https://assets.codepen.io/3/kiwi.svg`;

// 创建一个 img
const svgImage = new Image();

// 设置 img 的 src 属性的值为 svgFilePath
svgImage.src = `${svgFilePath}`;

// 将加载后的 SVG 图像添加到页面上的 #figure 元素
figureContainer.appendChild(svgImage);

// 2. 使用 DOM 操作创建元素：------------------------------------------------------------
// 放置 img 的容器
const figureContainer = document.getElementById('figure');

// 需要加载的 kiwi.svg 文件路径
const svgFilePath = `https://assets.codepen.io/3/kiwi.svg`;

// 创建 img 元素
const imgElement = document.createElement('img');

// 设置 img 的 src 属性为 SVG 文件的路径
imgElement.src = `${svgFilePath}`;

// 将 <img> 元素添加到页面上的 #figure 元素
figureContainer.appendChild(imgElement);

// 3. 使用 AJAX 请求的方式来创建 -------------------------------------------
// 创建一个新的 XMLHttpRequest 对象
const xhr = new XMLHttpRequest();

// 需要加载的 kiwi.svg 文件路径
const svgFilePath = `https://assets.codepen.io/3/kiwi.svg`

// 放置 img 的容器
const figureContainer = document.getElementById('figure');

// 设置请求方式和 SVG 文件路径
xhr.open("GET", `${svgFilePath}`, true);

// 指定响应类型为 XML，确保获取到 SVG 数据
xhr.overrideMimeType("image/svg+xml");

// 监听加载完成事件
xhr.onload = () => {
    // 创建一个新的 <img> 元素，并将 SVG 数据赋值给 src 属性
    const imgElement = document.createElement("img");
  
    imgElement.src = URL.createObjectURL(
        new Blob([xhr.response], { type: "image/svg+xml" })
    );

    // 将 <img> 元素添加到页面上的某个元素
    figureContainer.appendChild(imgElement);
};

// 发送请求
xhr.send();

```

## 哪种 SVG 技术应该使用？
