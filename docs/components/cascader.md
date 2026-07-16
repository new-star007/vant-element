# Cascader 级联选择器

级联选择器用于在具有清晰层级关系的数据集合中逐级导航并选择最终值，是处理树形结构数据的标准交互组件。它通过多级面板的逐层展开，让用户直观地从父级分类定位到目标选项，非常适合省市区选择、商品分类、组织架构等场景。组件支持多选模式、可搜索过滤、懒加载子节点等高级能力，并可通过 `checkStrictly` 打破层级限制实现任意一级选择。

## 基础用法

```vue
<template>
  <el-cascader v-model="value" :options="options" placeholder="请选择地区" clearable @change="handleChange" />
</template>

<script>
export default {
  data() {
    return {
      value: '',
      options: [
        {
          value: 'zhejiang',
          label: '浙江',
          children: [
            {
              value: 'hangzhou',
              label: '杭州',
              children: [
                { value: 'xihu', label: '西湖区' },
                { value: 'yuhang', label: '余杭区' },
                { value: 'binjiang', label: '滨江区' },
              ],
            },
            {
              value: 'ningbo',
              label: '宁波',
              children: [
                { value: 'haishu', label: '海曙区' },
                { value: 'jiangbei', label: '江北区' },
              ],
            },
          ],
        },
        {
          value: 'jiangsu',
          label: '江苏',
          children: [
            {
              value: 'nanjing',
              label: '南京',
              children: [
                { value: 'xuanwu', label: '玄武区' },
                { value: 'gulou', label: '鼓楼区' },
              ],
            },
          ],
        },
      ],
    }
  },
  methods: {
    handleChange(val) {
      console.log('cascader change:', val)
    },
  },
}
</script>
```

## 显示完整路径

```vue
<template>
  <el-cascader v-model="value1" :options="options" show-all-levels separator=" / " />
  <el-cascader v-model="value2" :options="options" :show-all-levels="false" />
</template>

<script>
export default {
  data() {
    return {
      value1: '',
      value2: '',
      options: [
        {
          value: 'zhejiang',
          label: '浙江',
          children: [
            {
              value: 'hangzhou',
              label: '杭州',
              children: [
                { value: 'xihu', label: '西湖区' },
                { value: 'yuhang', label: '余杭区' },
                { value: 'binjiang', label: '滨江区' },
              ],
            },
            {
              value: 'ningbo',
              label: '宁波',
              children: [
                { value: 'haishu', label: '海曙区' },
                { value: 'jiangbei', label: '江北区' },
              ],
            },
            {
              value: 'wenzhou',
              label: '温州',
              children: [
                { value: 'lucheng', label: '鹿城区' },
                { value: 'ouhai', label: '瓯海区' },
              ],
            },
          ],
        },
        {
          value: 'jiangsu',
          label: '江苏',
          children: [
            {
              value: 'nanjing',
              label: '南京',
              children: [
                { value: 'xuanwu', label: '玄武区' },
                { value: 'gulou', label: '鼓楼区' },
              ],
            },
            {
              value: 'suzhou',
              label: '苏州',
              children: [
                { value: 'gusu', label: '姑苏区' },
                { value: 'wuzhong', label: '吴中区' },
              ],
            },
          ],
        },
        {
          value: 'guangdong',
          label: '广东',
          children: [
            {
              value: 'guangzhou',
              label: '广州',
              children: [
                { value: 'tianhe', label: '天河区' },
                { value: 'yuexiu', label: '越秀区' },
              ],
            },
            {
              value: 'shenzhen',
              label: '深圳',
              children: [
                { value: 'nanshan', label: '南山区' },
                { value: 'futian', label: '福田区' },
              ],
            },
          ],
        },
      ],
    }
  },
}
</script>
```

## 多选模式

```vue
<template>
  <el-cascader v-model="value" :options="options" :props="{ multiple: true }" placeholder="请选择地区（可多选）" clearable />
</template>

<script>
export default {
  data() {
    return {
      value: [],
      options: [
        {
          value: 'zhejiang',
          label: '浙江',
          children: [
            { value: 'hangzhou', label: '杭州', children: [
              { value: 'xihu', label: '西湖区' },
              { value: 'yuhang', label: '余杭区' },
            ]},
            { value: 'ningbo', label: '宁波', children: [
              { value: 'haishu', label: '海曙区' },
              { value: 'jiangbei', label: '江北区' },
            ]},
          ],
        },
        {
          value: 'jiangsu',
          label: '江苏',
          children: [
            { value: 'nanjing', label: '南京', children: [
              { value: 'xuanwu', label: '玄武区' },
              { value: 'gulou', label: '鼓楼区' },
            ]},
          ],
        },
      ],
    }
  },
}
</script>
```

## 多选 + 折叠标签

```vue
<template>
  <el-cascader v-model="value" :options="options" :props="{ multiple: true }" collapse-tags />
</template>

<script>
export default {
  data() {
    return {
      value: [],
      options: [
        {
          value: 'zhejiang',
          label: '浙江',
          children: [
            { value: 'hangzhou', label: '杭州', children: [
              { value: 'xihu', label: '西湖区' },
              { value: 'yuhang', label: '余杭区' },
            ]},
            { value: 'ningbo', label: '宁波', children: [
              { value: 'haishu', label: '海曙区' },
              { value: 'jiangbei', label: '江北区' },
            ]},
          ],
        },
        {
          value: 'jiangsu',
          label: '江苏',
          children: [
            { value: 'nanjing', label: '南京', children: [
              { value: 'xuanwu', label: '玄武区' },
              { value: 'gulou', label: '鼓楼区' },
            ]},
          ],
        },
      ],
    }
  },
}
</script>
```

## 选择任意一级 (checkStrictly)

```vue
<template>
  <el-cascader v-model="value" :options="options" :props="{ checkStrictly: true }" placeholder="可选中任意层级" clearable />
</template>

<script>
export default {
  data() {
    return {
      value: '',
      options: [
        {
          value: 'zhejiang',
          label: '浙江',
          children: [
            { value: 'hangzhou', label: '杭州', children: [
              { value: 'xihu', label: '西湖区' },
              { value: 'yuhang', label: '余杭区' },
            ]},
            { value: 'ningbo', label: '宁波', children: [
              { value: 'haishu', label: '海曙区' },
              { value: 'jiangbei', label: '江北区' },
            ]},
          ],
        },
        {
          value: 'jiangsu',
          label: '江苏',
          children: [
            { value: 'nanjing', label: '南京', children: [
              { value: 'xuanwu', label: '玄武区' },
              { value: 'gulou', label: '鼓楼区' },
            ]},
          ],
        },
      ],
    }
  },
}
</script>
```

## 禁用状态

```vue
<template>
  <el-cascader v-model="value" :options="options" disabled placeholder="已禁用" />
</template>

<script>
export default {
  data() {
    return {
      value: ['zhejiang', 'hangzhou'],
      options: [
        {
          value: 'zhejiang',
          label: '浙江',
          children: [
            { value: 'hangzhou', label: '杭州', children: [
              { value: 'xihu', label: '西湖区' },
            ]},
          ],
        },
      ],
    }
  },
}
</script>
```

## 可搜索

```vue
<template>
  <el-cascader v-model="value" :options="options" filterable placeholder="输入关键词搜索" clearable />
</template>

<script>
export default {
  data() {
    return {
      value: '',
      options: [
        {
          value: 'zhejiang',
          label: '浙江',
          children: [
            { value: 'hangzhou', label: '杭州', children: [
              { value: 'xihu', label: '西湖区' },
              { value: 'yuhang', label: '余杭区' },
            ]},
            { value: 'ningbo', label: '宁波', children: [
              { value: 'haishu', label: '海曙区' },
              { value: 'jiangbei', label: '江北区' },
            ]},
          ],
        },
        {
          value: 'jiangsu',
          label: '江苏',
          children: [
            { value: 'nanjing', label: '南京', children: [
              { value: 'xuanwu', label: '玄武区' },
              { value: 'gulou', label: '鼓楼区' },
            ]},
          ],
        },
      ],
    }
  },
}
</script>
```

## 多选 + 可搜索

```vue
<template>
  <el-cascader v-model="value" :options="options" :props="{ multiple: true }" filterable placeholder="搜索并多选" />
</template>

<script>
export default {
  data() {
    return {
      value: [],
      options: [
        {
          value: 'zhejiang',
          label: '浙江',
          children: [
            { value: 'hangzhou', label: '杭州', children: [
              { value: 'xihu', label: '西湖区' },
              { value: 'yuhang', label: '余杭区' },
            ]},
            { value: 'ningbo', label: '宁波', children: [
              { value: 'haishu', label: '海曙区' },
              { value: 'jiangbei', label: '江北区' },
            ]},
          ],
        },
        {
          value: 'jiangsu',
          label: '江苏',
          children: [
            { value: 'nanjing', label: '南京', children: [
              { value: 'xuanwu', label: '玄武区' },
              { value: 'gulou', label: '鼓楼区' },
            ]},
          ],
        },
      ],
    }
  },
}
</script>
```

## emitPath 控制输出格式

```vue
<template>
  <el-cascader v-model="value1" :options="options" placeholder="输出路径数组" />
  <el-cascader v-model="value2" :options="options" :props="{ emitPath: false }" placeholder="仅输出叶子值" />
</template>

<script>
export default {
  data() {
    return {
      value1: '',
      value2: '',
      options: [
        {
          value: 'zhejiang',
          label: '浙江',
          children: [
            {
              value: 'hangzhou',
              label: '杭州',
              children: [
                { value: 'xihu', label: '西湖区' },
                { value: 'yuhang', label: '余杭区' },
              ],
            },
          ],
        },
        {
          value: 'jiangsu',
          label: '江苏',
          children: [
            {
              value: 'nanjing',
              label: '南京',
              children: [
                { value: 'xuanwu', label: '玄武区' },
                { value: 'gulou', label: '鼓楼区' },
              ],
            },
          ],
        },
      ],
    }
  },
}
</script>
```

## 不同尺寸

```vue
<template>
  <el-cascader v-model="value" :options="options" size="large" />
  <el-cascader v-model="value" :options="options" />
  <el-cascader v-model="value" :options="options" size="small" />
  <el-cascader v-model="value" :options="options" size="mini" />
</template>

<script>
export default {
  data() {
    return {
      value: '',
      options: [
        {
          value: 'zhejiang',
          label: '浙江',
          children: [
            { value: 'hangzhou', label: '杭州', children: [
              { value: 'xihu', label: '西湖区' },
            ]},
          ],
        },
      ],
    }
  },
}
</script>
```

## 自定义字段名

```vue
<template>
  <el-cascader v-model="value" :options="options" :props="{ value: 'id', label: 'name', children: 'sub' }" placeholder="使用 id/name/sub" />
</template>

<script>
export default {
  data() {
    return {
      value: '',
      options: [
        {
          id: 'frontend',
          name: '前端',
          sub: [
            { id: 'vue', name: 'Vue', sub: [
              { id: 'vue2', name: 'Vue 2' },
              { id: 'vue3', name: 'Vue 3' },
            ]},
            { id: 'react', name: 'React', sub: [
              { id: 'react17', name: 'React 17' },
              { id: 'react18', name: 'React 18' },
            ]},
          ],
        },
        {
          id: 'backend',
          name: '后端',
          sub: [
            { id: 'node', name: 'Node.js', sub: [
              { id: 'express', name: 'Express' },
            ]},
            { id: 'java', name: 'Java', sub: [
              { id: 'spring', name: 'Spring Boot' },
            ]},
          ],
        },
      ],
    }
  },
}
</script>
```

## 懒加载

```vue
<template>
  <el-cascader v-model="value" :options="options" :props="{ lazy: true, lazyLoad: lazyLoadFn }" placeholder="懒加载地区" clearable />
</template>

<script>
export default {
  data() {
    return {
      value: '',
      options: [
        { value: 'beijing', label: '北京', leaf: false },
        { value: 'zhejiang', label: '浙江', leaf: false },
      ],
    }
  },
  methods: {
    lazyLoadFn(node, resolve) {
      setTimeout(() => {
        const { level } = node
        if (level === 0) {
          resolve([
            { value: 'haidian', label: '海淀区', leaf: level >= 1 },
            { value: 'chaoyang', label: '朝阳区', leaf: level >= 1 },
            { value: 'dongcheng', label: '东城区', leaf: true },
          ])
        } else if (level === 1) {
          resolve([
            { value: 'zhongguancun', label: '中关村', leaf: true },
            { value: 'wudaokou', label: '五道口', leaf: true },
          ])
        } else {
          resolve([])
        }
      }, Math.random() * 800 + 200)
    },
  },
}
</script>
```

## 自定义选项内容 (slot)

```vue
<template>
  <el-cascader v-model="value" :options="options" placeholder="带图标的选项" clearable>
    <template slot-scope="{ node, data }">
      <span :style="{ color: data.color || '#333' }">{{ node.label }}</span>
    </template>
  </el-cascader>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      options: [
        {
          value: 'hot', label: '🔥 热门', children: [
            { value: 'beijing', label: '🔥 北京' },
            { value: 'shanghai', label: '🔥 上海' },
          ],
        },
        {
          value: 'normal', label: '📍 普通', children: [
            { value: 'guangzhou', label: '📍 广州' },
            { value: 'shenzhen', label: '📍 深圳' },
          ],
        },
      ],
    }
  },
}
</script>
```

## el-form 集成

```vue
<template>
  <el-form ref="form" :model="formModel" label-width="80px">
    <el-form-item label="城市" prop="city" required>
      <el-cascader v-model="formModel.city" :options="options" placeholder="请选择城市" clearable />
    </el-form-item>
    <el-form-item label="标签" prop="tags">
      <el-cascader v-model="formModel.tags" :options="options" :props="{ multiple: true }" placeholder="多选标签" />
    </el-form-item>
    <el-button type="primary" @click="handleSubmit">提交</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      formModel: { city: '', tags: [] },
      options: [
        {
          value: 'zhejiang', label: '浙江', children: [
            { value: 'hangzhou', label: '杭州', children: [
              { value: 'xihu', label: '西湖区' },
            ]},
          ],
        },
      ],
    }
  },
  methods: {
    handleSubmit() {
      alert('提交：' + JSON.stringify(this.formModel))
    },
  },
}
</script>
```

## el-cascader-panel 独立使用

```vue
<template>
  <el-cascader-panel :options="options" v-model="value" @change="handleChange" />
</template>

<script>
export default {
  data() {
    return {
      value: [],
      options: [
        {
          value: 'zhejiang', label: '浙江', children: [
            { value: 'hangzhou', label: '杭州', children: [
              { value: 'xihu', label: '西湖区' },
              { value: 'yuhang', label: '余杭区' },
            ]},
          ],
        },
        {
          value: 'jiangsu', label: '江苏', children: [
            { value: 'nanjing', label: '南京', children: [
              { value: 'xuanwu', label: '玄武区' },
              { value: 'gulou', label: '鼓楼区' },
            ]},
          ],
        },
      ],
    }
  },
  methods: {
    handleChange(val) {
      console.log('panel change:', val)
    },
  },
}
</script>
```

## 何时使用

- **层级数据选择**：当数据天然具有树形结构（如省市区、部门层级、商品分类）且需要逐级选择时，级联选择器是最直观的方案。
- **大数据量懒加载**：当层级数据量大、无法一次性加载时，可通过 `lazy` + `lazyLoad` 实现按需加载子节点，避免首屏性能问题。
- **快速定位选项**：当选项层级较深、逐级浏览效率低时，开启 `filterable` 搜索功能可直接通过关键词跳过中间层级定位目标。

## API

### Attributes

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| value / v-model | 选中值，单选时为值或值数组，多选时为二维数组 | array / string / number | — |
| options | 可选项数据源，每项包含 `value`、`label`、`children` 等字段 | array | — |
| props | 配置选项，可自定义字段名、启用懒加载、多选等行为 | object | — |
| placeholder | 未选择时输入框的占位文本 | string | `请选择` |
| disabled | 是否禁用整个选择器 | boolean | `false` |
| clearable | 是否支持一键清空已选值 | boolean | `false` |
| showAllLevels | 输入框中是否显示从根节点到选中项的完整路径 | boolean | `true` |
| separator | 选项路径中各级标签之间的分隔符 | string | ` / ` |
| filterable | 是否开启搜索过滤，输入关键词即可匹配任意层级的选项 | boolean | `false` |
| collapseTags | 多选模式下是否将超出数量的选中项折叠为 `+N` 标签 | boolean | `false` |
| size | 选择器尺寸，影响输入框和面板的高度 | `large` / `default` / `small` / `mini` | — |
| title | 弹出层标题 | string | — |
| activeColor | 主题色 | string | `#1989fa` |
| checkStrictly | 是否允许选中任意一级（非叶子节点），优先级高于 props.checkStrictly | boolean | `false` |

### Events

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| change | 选中值发生变化时触发 | 当前选中的值 |
| expand-change | 面板展开层级变化时触发 | 当前展开路径各层级选中项的 value 数组 |
