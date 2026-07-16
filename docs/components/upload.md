# Upload 上传

上传组件用于将本地文件发送到服务器，是文件采集场景的核心交互组件。它支持多种上传方式，包括点击上传、拖拽上传、图片列表上传以及头像裁剪等，可满足从单文件上传到多文件批量上传的各种需求。组件内置了文件数量限制、文件大小校验、上传预览等能力，并通过 `v-model` 管理文件列表状态，方便与表单数据联动。

## 基础上传

```vue
<template>
  <el-upload v-model="fileList" action="#" />
</template>

<script>
export default {
  data() {
    return {
      fileList: []
    }
  }
}
</script>
```

## 限制数量

```vue
<template>
  <el-upload v-model="fileList" action="#" :limit="3" />
</template>

<script>
export default {
  data() {
    return {
      fileList: []
    }
  }
}
</script>
```

## 限制大小

```vue
<template>
  <el-upload v-model="fileList" action="#" :max-size="1" />
</template>

<script>
export default {
  data() {
    return {
      fileList: []
    }
  }
}
</script>
```

## 禁用

```vue
<template>
  <el-upload v-model="fileList" action="#" disabled />
</template>

<script>
export default {
  data() {
    return {
      fileList: []
    }
  }
}
</script>
```

## 预览大小

```vue
<template>
  <el-upload v-model="fileList" action="#" :preview-size="60" />
</template>

<script>
export default {
  data() {
    return {
      fileList: []
    }
  }
}
</script>
```

## 何时使用

- **表单附件采集**：需要用户上传证明材料、合同文档等文件时使用，配合 `maxCount` 和 `maxSize` 限制上传规格。
- **图片列表展示**：需要用户上传多张图片（如商品轮播图、相册照片）时使用，可设置 `previewSize` 控制缩略图大小。
- **头像上传**：需要用户上传并裁剪头像时使用，配合裁剪弹窗可实现图片裁剪预览。

## API

### Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| value / v-model | 已上传的文件列表，支持双向绑定 | array | — |
| action | 文件上传的目标服务器地址 | string | — |
| limit | 最大允许上传的文件数量，超出后隐藏上传按钮（别名 maxCount） | number | — |
| maxSize | 单个文件的最大体积（单位 MB），超出时拦截并提示 | number / string | — |
| disabled | 是否禁用上传，禁用后不可选择和拖拽文件 | boolean | `false` |
| previewSize | 上传文件缩略图的尺寸（单位 px），影响预览区域大小 | number | — |

### Events

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| change | 文件状态改变时触发（添加或移除文件），可用于同步表单数据 | 当前文件列表 |
