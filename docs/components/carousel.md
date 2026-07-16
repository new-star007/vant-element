# Carousel 走马灯

走马灯组件在有限空间内循环轮播展示多组内容，是首页 Banner、图片画廊和广告位的标准交互模式。它支持自动播放、手动切换、横向与纵向滚动等多种播放方式，并提供指示器和箭头两种导航控件。组件还内置了触控拖拽、懒加载等能力，既能满足 PC 端的鼠标操作，也能适配移动端的滑动交互。

## 基础用法

```vue
<template>
  <el-carousel height="150px">
    <el-carousel-item v-for="i in 4" :key="i">
      <div>Slide {{ i }}</div>
    </el-carousel-item>
  </el-carousel>
</template>
```

## 自动轮播

```vue
<template>
  <el-carousel height="150px" autoplay>
    <el-carousel-item v-for="i in 4" :key="i">
      <div>Slide {{ i }}</div>
    </el-carousel-item>
  </el-carousel>
</template>
```

## 指示器位置

```vue
<template>
  <el-carousel height="120px" indicator-position="outside">
    <el-carousel-item v-for="i in 4" :key="i">{{ i }}</el-carousel-item>
  </el-carousel>
  <el-carousel height="120px" indicator-position="none">
    <el-carousel-item v-for="i in 3" :key="i">{{ i }}</el-carousel-item>
  </el-carousel>
</template>
```

## 切换间隔

```vue
<template>
  <el-carousel height="150px" :interval="2000" autoplay>
    <el-carousel-item v-for="i in 4" :key="i">间隔 2s</el-carousel-item>
  </el-carousel>
</template>
```

## 纵向

```vue
<template>
  <el-carousel height="200px" direction="vertical" autoplay>
    <el-carousel-item v-for="i in 4" :key="i">纵向 {{ i }}</el-carousel-item>
  </el-carousel>
</template>
```

## 何时使用

- **首页 Banner/轮播图**：需要在首页或活动页循环展示多张广告图、宣传图时使用，配合自动播放和指示器引导用户浏览。
- **图片画廊**：需要在有限区域内展示一组图片（如商品详情页的多角度展示）时使用，支持触控拖拽切换。
- **信息滚动播报**：需要在侧边栏或公告区域竖向滚动展示多条信息时使用，设置 `direction="vertical"` 即可实现纵向轮播。

## API

### Carousel Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| height | 走马灯容器高度，必须设置以确定各幻灯片的显示区域 | string | `200px` |
| initialIndex | 初始状态激活的幻灯片索引，从 0 开始 | number | `0` |
| autoplay | 是否开启自动播放，鼠标悬停时自动暂停 | boolean | `true` |
| interval | 自动播放的间隔时间（单位 ms），需配合 `autoplay` 使用 | number | `3000` |
| indicator | 是否显示底部指示器圆点 | boolean | `true` |
| arrow | 切换箭头的显示时机：`always` 始终显示，`hover` 悬停显示，`never` 不显示 | string | `hover` |
| loop | 是否循环播放，关闭后到达首尾时停止 | boolean | `true` |
| direction | 播放方向，`horizontal` 横向滚动，`vertical` 纵向滚动 | `horizontal` / `vertical` | `horizontal` |
| duration | 幻灯片切换动画时长（单位 ms） | number | `300` |
| indicatorPosition | 指示器位置：`outside` 显示在走马灯外部，`none` 不显示 | `outside` / `none` | — |
| touchable | 是否支持触控拖拽切换，适用于移动端 | boolean | `true` |
| lazyRender | 是否开启懒加载，只渲染当前及相邻幻灯片以提升性能 | boolean | `false` |
| indicatorColor | 指示器圆点的激活颜色 | string | — |

### Events

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| input | 幻灯片切换时触发，用于 v-model 同步当前索引 | 当前幻灯片索引 |
| change | 幻灯片切换时触发 | 当前幻灯片索引 |

### Methods

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| setActiveItem | 手动切换至指定索引的幻灯片 | 目标幻灯片索引 |
| prev | 切换至上一张幻灯片 | — |
| next | 切换至下一张幻灯片 | — |
