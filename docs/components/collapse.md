# Collapse 折叠面板

折叠面板用于将内容区域折叠或展开，节省页面空间的同时保留信息的可访问性。支持手风琴模式、自定义标题、禁用状态等配置，适合展示大量信息的场景。

折叠面板通过 v-model 绑定当前展开的面板，支持多个面板同时展开或手风琴模式（一次只能展开一个）。适用于FAQ问答、设置分组、信息分层展示等场景。

## 何时使用

- 当内容较多，需要折叠隐藏次要信息以节省页面空间时
- 当需要构建FAQ问答、帮助中心等场景时
- 当需要将相关信息分组展示，且希望用户可以按需展开查看时

## 基础用法

```vue
<template>
  <el-collapse v-model="activeNames" accordion>
    <el-collapse-item title="面板一" name="1">
      <div>内容一：这是折叠面板的内容区域</div>
    </el-collapse-item>
    <el-collapse-item title="面板二" name="2">
      <div>内容二：展示更多信息</div>
    </el-collapse-item>
    <el-collapse-item title="面板三" name="3">
      <div>内容三：可以放置任意内容</div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
export default {
  data() {
    return {
      activeNames: '1'
    }
  }
}
</script>
```

## 手风琴模式

```vue
<template>
  <el-collapse v-model="active" accordion>
    <el-collapse-item title="标题 A" name="a">
      <div>手风琴模式每次只展开一个面板</div>
    </el-collapse-item>
    <el-collapse-item title="标题 B" name="b">
      <div>点击其他面板会自动关闭当前面板</div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
export default {
  data() {
    return {
      active: 'a'
    }
  }
}
</script>
```

## 自定义标题

```vue
<template>
  <el-collapse v-model="active" accordion>
    <el-collapse-item name="x">
      <template slot="title">
        <span style="color:#409eff">自定义标题 <el-tag size="mini" type="primary">NEW</el-tag></span>
      </template>
      <div>使用 slot="title" 可以自定义标题区域</div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
export default {
  data() {
    return {
      active: 'x'
    }
  }
}
</script>
```

## 禁用

```vue
<template>
  <el-collapse v-model="active" accordion>
    <el-collapse-item title="可用的面板" name="a">
      <div>此面板可正常展开</div>
    </el-collapse-item>
    <el-collapse-item title="禁用的面板" name="b" disabled>
      <div>此面板已被禁用</div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
export default {
  data() {
    return {
      active: 'a'
    }
  }
}
</script>
```

## API

### Collapse Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| value / v-model | 当前展开的面板 name，支持字符串或数组，支持双向绑定 | string / array | — |
| accordion | 是否开启手风琴模式，开启后一次只能展开一个面板 | boolean | `false` |

### CollapseItem Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| title | 面板标题，显示在折叠头部的文本 | string | — |
| name | 面板的唯一标识符，用于 v-model 绑定和事件参数 | string / number | — |
| disabled | 是否禁用该面板，禁用后无法展开或折叠 | boolean | `false` |

### Events

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| change | 激活面板改变时触发，返回当前所有展开面板的 name | 当前展开面板的 name 数组 |
