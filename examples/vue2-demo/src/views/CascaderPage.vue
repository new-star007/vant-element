<template>
  <div class="cascader-page">
    <van-nav-bar title="el-cascader 级联选择器" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="cascader-body">

    <!-- 1. 基础用法 -->
    <el-card class="demo-card">
      <div slot="header">基础单选 - 选择最后一级</div>
      <el-cascader
        v-model="basicValue"
        :options="regionOptions"
        placeholder="请选择地区"
        clearable
        @change="handleChange"
      />
      <div class="demo-value">选中值: {{ basicValue }}</div>
    </el-card>

    <!-- 2. 显示完整路径 -->
    <el-card class="demo-card">
      <div slot="header">显示完整路径 / 仅最后一级</div>
      <el-form label-width="110px">
        <el-form-item label="完整路径 (默认)">
          <el-cascader
            v-model="pathValue1"
            :options="regionOptions"
            show-all-levels
            separator=" / "
          />
        </el-form-item>
        <el-form-item label="仅最后一级">
          <el-cascader
            v-model="pathValue2"
            :options="regionOptions"
            :show-all-levels="false"
          />
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 3. 多选模式 -->
    <el-card class="demo-card">
      <div slot="header">多选模式 (multiple)</div>
      <el-cascader
        v-model="multipleValue"
        :options="regionOptions"
        :props="{ multiple: true }"
        placeholder="请选择地区（可多选）"
        clearable
        @change="handleMultipleChange"
      />
      <div class="demo-value">选中值: {{ multipleValue }}</div>
    </el-card>

    <!-- 4. 多选 + 折叠标签 -->
    <el-card class="demo-card">
      <div slot="header">多选 + 折叠标签 (collapseTags)</div>
      <el-cascader
        v-model="collapseValue"
        :options="regionOptions"
        :props="{ multiple: true }"
        collapse-tags
        placeholder="选择多个地区"
      />
    </el-card>

    <!-- 5. 选择任意一级 (checkStrictly) -->
    <el-card class="demo-card">
      <div slot="header">选择任意一级 (checkStrictly)</div>
      <el-cascader
        v-model="strictValue"
        :options="regionOptions"
        :props="{ checkStrictly: true }"
        placeholder="可选中任意层级"
        clearable
      />
      <div class="demo-value">选中值: {{ strictValue }}</div>
    </el-card>

    <!-- 6. 禁用状态 -->
    <el-card class="demo-card">
      <div slot="header">禁用状态</div>
      <el-cascader
        v-model="disabledValue"
        :options="regionOptions"
        disabled
        placeholder="已禁用"
      />
    </el-card>

    <!-- 7. 可搜索 -->
    <el-card class="demo-card">
      <div slot="header">可搜索 (filterable)</div>
      <el-cascader
        v-model="searchValue"
        :options="regionOptions"
        filterable
        placeholder="输入关键词搜索"
        clearable
      />
    </el-card>

    <!-- 8. 多选 + 可搜索 -->
    <el-card class="demo-card">
      <div slot="header">多选 + 可搜索</div>
      <el-cascader
        v-model="multiSearchValue"
        :options="regionOptions"
        :props="{ multiple: true }"
        filterable
        placeholder="搜索并多选"
      />
    </el-card>

    <!-- 9. emitPath 控制输出 -->
    <el-card class="demo-card">
      <div slot="header">emitPath 控制输出格式</div>
      <el-form label-width="140px">
        <el-form-item label="emitPath=true (默认)">
          <el-cascader
            v-model="emitPathValue"
            :options="regionOptions"
            placeholder="输出路径数组"
          />
          <div class="demo-value">值: {{ JSON.stringify(emitPathValue) }}</div>
        </el-form-item>
        <el-form-item label="emitPath=false">
          <el-cascader
            v-model="noEmitPathValue"
            :options="regionOptions"
            :props="{ emitPath: false }"
            placeholder="仅输出叶子值"
          />
          <div class="demo-value">值: {{ noEmitPathValue }}</div>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 10. 尺寸 -->
    <el-card class="demo-card">
      <div slot="header">不同尺寸</div>
      <el-form label-width="80px">
        <el-form-item label="large">
          <el-cascader
            v-model="sizeValue"
            :options="regionOptions"
            size="large"
          />
        </el-form-item>
        <el-form-item label="default">
          <el-cascader
            v-model="sizeValue"
            :options="regionOptions"
          />
        </el-form-item>
        <el-form-item label="small">
          <el-cascader
            v-model="sizeValue"
            :options="regionOptions"
            size="small"
          />
        </el-form-item>
        <el-form-item label="mini">
          <el-cascader
            v-model="sizeValue"
            :options="regionOptions"
            size="mini"
          />
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 11. 自定义字段名 -->
    <el-card class="demo-card">
      <div slot="header">自定义字段名 (props.value/label/children)</div>
      <el-cascader
        v-model="customFieldValue"
        :options="customFieldOptions"
        :props="{ value: 'id', label: 'name', children: 'sub' }"
        placeholder="使用 id/name/sub"
      />
      <div class="demo-value">值: {{ customFieldValue }}</div>
    </el-card>

    <!-- 12. 懒加载 -->
    <el-card class="demo-card">
      <div slot="header">懒加载 (lazy + lazyLoad)</div>
      <el-cascader
        v-model="lazyValue"
        :options="lazyOptions"
        :props="{ lazy: true, lazyLoad: lazyLoadFn }"
        placeholder="懒加载地区"
        clearable
      />
      <div class="demo-value">值: {{ lazyValue }}</div>
    </el-card>

    <!-- 13. 自定义选项内容 (slot) -->
    <el-card class="demo-card">
      <div slot="header">自定义选项内容 (slot)</div>
      <el-cascader
        v-model="slotValue"
        :options="slotOptions"
        placeholder="带图标的选项"
        clearable
      >
        <template slot-scope="{ node, data }">
          <span :style="{ color: data.color || '#333' }">{{ node.label }}</span>
        </template>
      </el-cascader>
    </el-card>

    <!-- 14. el-form 集成 -->
    <el-card class="demo-card">
      <div slot="header">el-form 集成</div>
      <el-form ref="form" :model="formModel" label-width="80px">
        <el-form-item label="城市" prop="city" required>
          <el-cascader
            v-model="formModel.city"
            :options="regionOptions"
            placeholder="请选择城市"
            clearable
          />
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <el-cascader
            v-model="formModel.tags"
            :options="regionOptions"
            :props="{ multiple: true }"
            placeholder="多选标签"
          />
        </el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </el-form>
      <div class="demo-value">表单数据: {{ formModel }}</div>
    </el-card>

    <!-- el-cascader-panel 独立使用 -->
    <el-divider content-position="left">el-cascader-panel 独立使用</el-divider>

    <el-card class="demo-card">
      <div slot="header">Panel 基础用法</div>
      <el-cascader-panel :options="regionOptions" v-model="panelValue" @change="onPanelChange" />
      <div class="demo-value">选中值: {{ panelValue }}</div>
    </el-card>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'CascaderPage',
  components: { [NavBar.name]: NavBar },
  data() {
    return {
      // 基础
      basicValue: '',
      // 路径显示
      pathValue1: '',
      pathValue2: '',
      // 多选
      multipleValue: [],
      collapseValue: [],
      // checkStrictly
      strictValue: '',
      // 禁用
      disabledValue: ['zhejiang', 'hangzhou'],
      // 搜索
      searchValue: '',
      multiSearchValue: [],
      // emitPath
      emitPathValue: '',
      noEmitPathValue: '',
      // 尺寸
      sizeValue: '',
      // 自定义字段
      customFieldValue: '',
      // 懒加载
      lazyValue: '',
      lazyOptions: [
        {
          value: 'beijing',
          label: '北京',
          leaf: false,
        },
        {
          value: 'zhejiang',
          label: '浙江',
          leaf: false,
        },
      ],
      // slot
      slotValue: '',
      slotOptions: [
        { value: 'hot', label: '🔥 热门', children: [
          { value: 'beijing', label: '🔥 北京' },
          { value: 'shanghai', label: '🔥 上海' },
        ]},
        { value: 'normal', label: '📍 普通', children: [
          { value: 'guangzhou', label: '📍 广州' },
          { value: 'shenzhen', label: '📍 深圳' },
        ]},
      ],
      // form
      formModel: {
        city: '',
        tags: [],
      },
      // panel
      panelValue: [],
    }
  },

  computed: {
    regionOptions() {
      return [
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
      ]
    },

    customFieldOptions() {
      return [
        {
          id: 'frontend',
          name: '前端',
          sub: [
            { id: 'vue', name: 'Vue',
              sub: [
                { id: 'vue2', name: 'Vue 2' },
                { id: 'vue3', name: 'Vue 3' },
              ],
            },
            { id: 'react', name: 'React',
              sub: [
                { id: 'react17', name: 'React 17' },
                { id: 'react18', name: 'React 18' },
              ],
            },
          ],
        },
        {
          id: 'backend',
          name: '后端',
          sub: [
            { id: 'node', name: 'Node.js',
              sub: [
                { id: 'express', name: 'Express' },
              ],
            },
            { id: 'java', name: 'Java',
              sub: [
                { id: 'spring', name: 'Spring Boot' },
              ],
            },
          ],
        },
      ]
    },
  },

  methods: {
    handleChange(val) {
      console.log('cascader change:', val)
    },

    onPanelChange(val) {
      console.log('panel change:', val)
    },

    handleMultipleChange(val) {
      console.log('multiple change:', val)
    },

    lazyLoadFn(node, resolve) {
      const delay = Math.random() * 800 + 200
      setTimeout(() => {
        const level = node.level
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
      }, delay)
    },

    handleSubmit() {
      alert('表单提交：' + JSON.stringify(this.formModel))
    },
  },
}
</script>

<style scoped>
.cascader-page {
  background: #f7f8fa;
  min-height: 100vh;
}
.cascader-body {
  padding: 16px;
}
.demo-card {
  margin-bottom: 12px;
}
.demo-value {
  margin-top: 8px;
  font-size: 12px;
  color: #969799;
  word-break: break-all;
}
</style>
