# ButtonGroup 按钮组

按钮组用于将多个相关的按钮组合为一个整体，使界面操作更加紧凑和有条理。

当页面上存在多个并列操作（如「上一步 / 下一步」、「增 / 减」）时，按钮组能让用户直观感知这些操作属于同一逻辑单元。Vant Element 的按钮组支持胶囊样式和块级布局，并可混合不同类型的按钮，适用于分页导航、工具栏、表单操作区等场景。

## 基础组合

```vue
<template>
  <el-button-group>
    <el-button>左</el-button>
    <el-button>中</el-button>
    <el-button>右</el-button>
  </el-button-group>
</template>
```

## 胶囊组合

```vue
<template>
  <el-button-group capsule>
    <el-button>左</el-button>
    <el-button>中</el-button>
    <el-button>右</el-button>
  </el-button-group>
</template>
```

## 块级组合

```vue
<template>
  <el-button-group block>
    <el-button>块级左</el-button>
    <el-button>块级中</el-button>
    <el-button>块级右</el-button>
  </el-button-group>
</template>
```

## 混合类型

```vue
<template>
  <el-button-group capsule>
    <el-button type="primary">主要</el-button>
    <el-button type="success">成功</el-button>
    <el-button type="warning">警告</el-button>
  </el-button-group>
</template>
```

## 何时使用

- **分页导航**：将「上一页」「下一页」等分页按钮组合在一起，形成紧凑的导航控件。
- **操作切换**：当多个操作互斥或按顺序执行时（如「增 / 减」、「左 / 右」），使用按钮组传达操作的整体性。
- **工具栏**：将一组功能按钮横向排列在工具栏中，保持界面整洁。

## API

### Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| size | 按钮组内所有按钮的统一尺寸，会覆盖子按钮的 size 属性 | string | — |
| capsule | 胶囊样式，相邻按钮之间无间隔且首尾呈圆弧形 | boolean | `false` |
| block | 块级按钮组，按钮组宽度撑满父容器 | boolean | `false` |
