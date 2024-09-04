# SVG坐标系

Web 坐标系统的默认原点位于给定上下文的左上角，即元素盒子的左上角。它包括 x 轴（也称为水平轴或内联轴），正值表示向右，负值表示向左；y 轴（也称为垂直轴或块轴），正值表示向下，负值表示向上。与传统的笛卡尔坐标系统有所不同：
[坐标系区分](./imgs/zuobiaoxi.awebp) 

SVG 坐标系的单位可以是像素（px）、百分比（%）或其它 CSS 支持的长度单位，这使得 SVG 具有更大的灵活性，可以更好地适应不同的设备和屏幕分辨率。

SVG 将使用不同的坐标系来描述元素的位置和方向。
- 用户坐标系是画布的坐标系，也称为原始坐标系。所有绘制操作都是基于这个坐标系进行的。
- 参考坐标系是在绘制和操作特定图形元素时用来观察和测量的坐标系。它可以帮助我们理解某个元素相对于某个特定参考点的位置和尺寸。
- 通常情况下，一个图形元素会继承其父元素的坐标系，称为前驱坐标系。

这些不同的坐标系在 SVG 中发挥着重要的作用，可以更好地组织和控制图形的布局和样式。可以通过设置元素的 x 和 y 属性来控制元素的位置。

## SVG 坐标系的概念
### svg画布
 SVG 内容绘制的空间或区域。
### 视口（Viewport）
视口又被称为视窗。通常指的是当前可见的计算机图形区域。
### viewBox 属性
作用是在告诉 SVG 画布，一组图形拉伸或缩小以便它们能够完美适应到特定的容器中。  

在 viewBox 属性的四个值中，<min-x> 和 <min-y> 就像是控制位移的魔术师，类似于 CSS 变换中的 translate，可以让相片在相框中轻松上下左右移动；而 <width> 和 <height> 充当了缩放的调节器，就像是 CSS 变换中的 scale。
但是， 它的视觉效果与我们熟知的 CSS 变换中的位移和缩放完全相反。

当你将 <min-x> 和 <min-y> 设置为**正值**时，相片会往相框的**左上方**移动，反之，设为负值则往右下方移动。同样，**增大** <width> 和 <height> 的值实际上导致了**缩小**的效果，而减小则呈现放大的效果。这样的设计或许有些反直觉，但也为 SVG 创造了更丰富的变换可能性。

造成这种影响，都是因为 viewBox 实际上影响的是 SVG 中的用户坐标系统，所以才会和你的直觉有相反的效果。

### preserveAspectRatio 属性
主要用来确保图形在缩放时能够保持宽高比一致
```xml
preserveAspectRatio = <align> <meetOrSlice>?

<align> = none | xMinYMin | xMidYMin | xMaxYMin | xMinYMid | xMidYMid | xMaxYMid | xMinYMax | xMidYMax | xMaxYMax
<meetOrSlice> = meet | slice

```
preserveAspectRatio 属性的 <align> 值决定了是否进行统一缩放以及如何对齐 viewBox 的轴和视口的轴，当 viewBox 的宽高比与视口的宽高比不匹配时。它的值可以是 none、xMinYMin、xMidYMin、xMaxYMin、xMinYMid、xMidYMid、xMaxYMid、xMinYMax、xMidYMax 或 xMaxYMax 中的一个。除了 none 之外的所有值都用于均匀缩放图像，保持其宽高比，并对齐 viewBox 在视口内。

<align> 的工作原理类似于 CSS 的 background-position 属性取百分比值的方式。你可以将 viewBox 想象成背景图像。不同于 background-position 的是，它不是将 viewBox 的特定点定位到视口的相应点，而是将 viewBox 的特定“轴”与视口相应“轴”对齐。


要理解 <align> 值的含义，首先需要了解 viewBox 和视口中的每个“轴”。简单来说，SVG 视口和 viewBox 在横纵两个方向上各有三条特定“轴”：

- 横向三条“轴”：min-x、mid-x 和 max-x

- 纵向三条“轴”：min-y、mid-y 和 max-y

这些轴的位置（或定义）与 viewBox 属性的值（<min-x> <min-y> <width> <height>）紧密相关。其中，min-x 和 min-y 两个轴分别对应着 viewBox 属性的 <min-x> 和 <min-y> 值。而 max-x 和 max-y 两个“轴”分别位于：  
- max-x 轴位于 <min-x> + <width>
- max-y 轴位于 <min-y> + <height>

剩下的 mid-x 和 mid-y 分别位于：  
- mid-x 轴位于 <min-x> 和 <max-x> 轴中间，即 <min-x> + (<width> / 2)
- mid-y 轴位于 <min-y> 和 <max-y> 轴中间，即 <min-y> + (<height> / 2)



### 用户单位
在SVG中，用户单位是一种抽象的长度度量，表示图形中相对长度的标准。用户单位是相对于用户坐标系统的，该坐标系统定义了 SVG 图形的绘制空间。引入用户单位的主要目的是为了解决在不同输出格式和设备上显示图形时的尺寸问题。与具体的物理长度单位（如 px、mm 等）不直接相关，而是相对于当前SVG文档和环境而言。









