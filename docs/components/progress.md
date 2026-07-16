# Progress 进度条

进度条组件用于直观地展示某个操作或任务的完成进度，帮助用户了解当前状态并预期剩余时间。它支持条形和环形两种展示形态，可通过 `status` 属性快速切换成功、警告、异常等状态颜色，也支持自定义颜色以匹配品牌视觉。组件适用于文件上传进度、任务完成度、数据加载等多种需要反馈进度的场景。

## 基础用法

```vue
<template>
  <el-progress :percentage="20" />
  <el-progress :percentage="40" />
  <el-progress :percentage="60" />
  <el-progress :percentage="80" />
  <el-progress :percentage="100" />
</template>
```

## 不同状态

```vue
<template>
  <el-progress :percentage="100" status="success" />
  <el-progress :percentage="80" status="warning" />
  <el-progress :percentage="40" status="exception" />
  <el-progress :percentage="60" inactive />
</template>
```

## 自定义颜色

```vue
<template>
  <el-progress :percentage="30" color="#f56c6c" />
  <el-progress :percentage="60" color="#e6a23c" />
  <el-progress :percentage="100" color="#67c23a" />
</template>
```

## 环形进度

```vue
<template>
  <el-progress type="circle" :percentage="25" />
  <el-progress type="circle" :percentage="50" color="#67c23a" />
  <el-progress type="circle" :percentage="75" color="#e6a23c" />
  <el-progress type="circle" :percentage="100" color="#f56c6c" />
</template>
```

## 何时使用

- **操作进度反馈**：当用户执行耗时操作（如文件上传、数据导出）时，使用条形进度条实时展示完成百分比，减少用户等待焦虑。
- **任务完成度展示**：需要在仪表盘或统计面板中展示某项指标的完成情况时，使用环形进度条更节省空间且视觉更突出。
- **状态标识**：通过 `status` 属性设置成功（绿）、警告（黄）、异常（红）等状态色，让进度结果一目了然。

## API

### Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| percentage | 进度百分比，取值范围 0-100 | number | `0` |
| type | 进度条形态，`line` 为条形，`circle` 为环形 | `line` / `circle` | `line` |
| status | 进度条状态，影响颜色和图标：`success` 成功绿色，`warning` 警告黄色，`exception` 异常红色 | `success` / `warning` / `exception` | — |
| color | 自定义进度条颜色，支持颜色字符串或返回颜色的函数 | string / function | — |
| showText | 是否在进度条旁显示百分比文字 | boolean | `true` |
| strokeWidth | 进度条的线条宽度（单位 px），条形为轨道高度，环形为圆环粗细 | number | — |
| inactive | 是否置灰，用于表示未激活或等待中的进度 | boolean | `false` |
