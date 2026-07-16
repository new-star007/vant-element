# Tabs 标签页

标签页用于在同一个区域内切换展示不同类型的内容，是组织和管理相关但独立信息的有效方式。支持多种样式、位置、关闭等配置，可以轻松构建复杂的标签页交互。

标签页通过 v-model 绑定当前激活的标签，支持卡片风格、可关闭、禁用等特性。适用于设置页面、多标签内容切换、编辑器分栏等场景。

## 何时使用

- 当需要在同一个页面区域切换展示不同类型的内容时
- 当需要组织多个相关但独立的信息模块时
- 当需要构建可关闭的多标签页界面时

## 基础用法

```vue
<template>
  <el-tabs v-model="activeTab">
    <el-tab-pane label="用户管理" name="first">用户管理内容</el-tab-pane>
    <el-tab-pane label="角色管理" name="second">角色管理内容</el-tab-pane>
    <el-tab-pane label="权限管理" name="third">权限管理内容</el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'first'
    }
  }
}
</script>
```

## 卡片风格

```vue
<template>
  <el-tabs v-model="activeTab" type="card">
    <el-tab-pane label="Tab A" name="a">卡片风格内容 A</el-tab-pane>
    <el-tab-pane label="Tab B" name="b">卡片风格内容 B</el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'a'
    }
  }
}
</script>
```

## 可关闭

```vue
<template>
  <el-tabs v-model="activeTab" closable @tab-remove="handleRemove">
    <el-tab-pane v-for="tab in tabs" :key="tab.name" :label="tab.label" :name="tab.name">
      {{ tab.content }}
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'tab1',
      tabs: [
        { name: 'tab1', label: '标签一', content: '内容一' },
        { name: 'tab2', label: '标签二', content: '内容二' },
        { name: 'tab3', label: '标签三', content: '内容三' }
      ]
    }
  },
  methods: {
    handleRemove(targetName) {
      this.tabs = this.tabs.filter(tab => tab.name !== targetName)
      if (this.activeTab === targetName) {
        this.activeTab = this.tabs[0]?.name || ''
      }
    }
  }
}
</script>
```

## 禁用

```vue
<template>
  <el-tabs v-model="activeTab">
    <el-tab-pane label="可用标签" name="a">可用</el-tab-pane>
    <el-tab-pane label="禁用标签" name="b" disabled>已禁用</el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'a'
    }
  }
}
</script>
```

## 不同位置

```vue
<template>
  <el-tabs v-model="activeTab" tab-position="left" style="height:100px">
    <el-tab-pane label="左侧 A" name="a">内容 A</el-tab-pane>
    <el-tab-pane label="左侧 B" name="b">内容 B</el-tab-pane>
  </el-tabs>
  <el-tabs v-model="activeTab" tab-position="bottom">
    <el-tab-pane label="底部 A" name="a">内容 A</el-tab-pane>
    <el-tab-pane label="底部 B" name="b">内容 B</el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'a'
    }
  }
}
</script>
```

## API

### Tabs Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| value / v-model | 当前激活标签的 name 值，支持双向绑定 | string | — |
| type | 标签页风格，`card` 为卡片风格，不设置则为线条风格 | `card` | — |
| closable | 是否显示关闭按钮，开启后每个标签都可关闭 | boolean | `false` |
| tab-position | 标签位置，支持上下左右四个方向 | `left` / `right` / `top` / `bottom` | `top` |

### TabPane Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| label | 标签标题，显示在标签栏中的文本 | string | — |
| name | 标签的唯一标识符，用于 v-model 绑定和事件参数 | string / number | — |
| disabled | 是否禁用该标签，禁用后无法点击切换 | boolean | `false` |

### Events

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| tab-click | 点击标签时触发，可用于执行切换前的验证逻辑 | 被点击标签的实例 |
| tab-remove | 关闭标签时触发，可用于更新标签列表数据 | 被关闭标签的 name 值 |
