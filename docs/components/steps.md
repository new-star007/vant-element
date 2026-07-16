# Steps 步骤条

步骤条用于展示任务执行的进度和当前状态，引导用户按照既定流程完成操作。支持多种状态、布局方向、简洁模式等配置，是构建向导流程的核心组件。

步骤条通过 active 属性指定当前步骤，自动计算其他步骤的状态（已完成、进行中、待处理）。适用于注册流程、订单提交、配置向导等需要分步引导的场景。

## 何时使用

- 当需要引导用户按步骤完成复杂操作时
- 当需要展示任务进度和当前状态时
- 当需要构建注册流程、订单提交、配置向导等场景时

## 基础步骤

```vue
<template>
  <el-steps :active="active" align-center>
    <el-step title="步骤一" description="填写信息" />
    <el-step title="步骤二" description="确认订单" />
    <el-step title="步骤三" description="完成" />
  </el-steps>
  <div style="margin-top:8px;text-align:center">
    <el-button size="mini" :disabled="active <= 0" @click="active--">上一步</el-button>
    <el-button size="mini" :disabled="active >= 3" type="primary" @click="active++">下一步</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 1
    }
  }
}
</script>
```

## 不同状态

```vue
<template>
  <el-steps :active="2" align-center>
    <el-step title="已完成" status="finish" />
    <el-step title="进行中" status="process" />
    <el-step title="待处理" status="waiting" />
  </el-steps>
  <el-steps :active="2" align-center style="margin-top:12px">
    <el-step title="成功" status="success" />
    <el-step title="进行中" status="process" />
    <el-step title="错误" status="error" />
  </el-steps>
</template>
```

## 简洁模式

```vue
<template>
  <el-steps :active="1" simple>
    <el-step title="步骤一" />
    <el-step title="步骤二" />
    <el-step title="步骤三" />
  </el-steps>
</template>
```

## 纵向步骤条

```vue
<template>
  <el-steps :active="1" direction="vertical">
    <el-step title="注册账号">
      <template slot="description">
        <span style="color:#409eff">创建您的个人账户</span>
      </template>
    </el-step>
    <el-step title="完善信息">
      <template slot="description">
        <span style="color:#67c23a">填写个人资料和偏好</span>
      </template>
    </el-step>
    <el-step title="开始使用">
      <template slot="description">
        <span style="color:#909399">配置完成开始体验</span>
      </template>
    </el-step>
  </el-steps>
</template>
```

## 自定义图标

通过 `el-step` 的 `icon` 属性为每个步骤设置独立图标：

```vue
<template>
  <el-steps :active="1" align-center>
    <el-step title="购物" icon="shop" />
    <el-step title="支付" icon="cash-back-record" />
    <el-step title="完成" icon="success" />
  </el-steps>
</template>
```

## 自定义颜色

```vue
<template>
  <el-steps :active="1" align-center active-color="#ee0a24" inactive-color="#999">
    <el-step title="步骤一" />
    <el-step title="步骤二" />
    <el-step title="步骤三" />
  </el-steps>
</template>
```

## 点击切换

```vue
<template>
  <el-steps :active="active" align-center @change="onStepChange">
    <el-step title="选择商品" />
    <el-step title="确认订单" />
    <el-step title="支付" />
  </el-steps>
  <div>当前步骤：{{ active + 1 }} / 3</div>
</template>

<script>
export default {
  data() {
    return {
      active: 1
    }
  },
  methods: {
    onStepChange(val) {
      this.active = val
    }
  }
}
</script>
```

## API

### Steps Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| active / v-model | 当前激活步骤的索引（从0开始），自动计算其他步骤状态 | number | `0` |
| direction | 步骤条方向，支持水平和垂直两种布局 | `horizontal` / `vertical` | `horizontal` |
| align-center | 是否居中对齐，开启后步骤标题会居中显示 | boolean | `false` |
| simple | 是否使用简洁模式，开启后会隐藏步骤图标和连接线 | boolean | `false` |
| active-color | 激活状态的颜色 | string | — |
| inactive-color | 非激活状态的颜色 | string | — |
| space | 步骤间距，支持 px 单位 | number / string | — |
| icon-prefix | 图标类名前缀 | string | — |
| finish-icon | 已完成步骤的图标名称 | string | — |
| active-icon | 当前步骤的图标名称 | string | — |
| inactive-icon | 未完成步骤的图标名称 | string | — |

### Step Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| title | 步骤标题，显示在步骤图标旁的主文本 | string | — |
| description | 步骤描述，仅在纵向模式 (`direction="vertical"`) 下显示 | string | — |
| status | 步骤状态，可手动覆盖自动计算的状态 | `finish` / `process` / `waiting` / `success` / `error` | — |
| icon | 自定义图标名称 | string | — |
| icon-prefix | 图标类名前缀 | string | — |
| active-icon | 激活状态的图标名称 | string | — |
| inactive-icon | 非激活状态的图标名称 | string | — |

### Slots

| Name | Description |
| ---- | ----------- |
| title | 自定义标题内容 |
| description | 自定义描述内容 |

### Events

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| change | 步骤改变时触发（点击步骤或 v-model 更新均可触发） | 当前步骤索引 |
| input | v-model 更新时触发 | 当前步骤索引 |
