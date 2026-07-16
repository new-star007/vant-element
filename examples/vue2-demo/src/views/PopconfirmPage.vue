<template>
  <div class="page-popconfirm">
    <van-nav-bar title="el-popconfirm 气泡确认框" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础用法</div>
        <el-popconfirm title="确定要删除吗？" @confirm="onConfirm" @cancel="onCancel">
          <el-button slot="reference" type="danger">删除</el-button>
        </el-popconfirm>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">自定义按钮文案</div>
        <el-popconfirm
          title="确定要提交吗？"
          confirm-button-text="好的"
          cancel-button-text="算了"
        >
          <el-button slot="reference" type="primary">提交</el-button>
        </el-popconfirm>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">自定义图标</div>
        <el-popconfirm title="确定要继续吗？" icon="question-o" icon-color="#f90">
          <el-button slot="reference" type="success">继续</el-button>
        </el-popconfirm>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">隐藏图标</div>
        <el-popconfirm title="确定要退出吗？" :hide-icon="true">
          <el-button slot="reference" type="warning">退出</el-button>
        </el-popconfirm>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">隐藏取消按钮</div>
        <el-popconfirm title="确定吗？" :show-cancel="false">
          <el-button slot="reference">只有确认</el-button>
        </el-popconfirm>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">自定义按钮类型</div>
        <el-popconfirm
          title="确认操作？"
          confirm-button-type="danger"
          cancel-button-type="primary"
        >
          <el-button slot="reference" type="danger">危险操作</el-button>
        </el-popconfirm>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">不同弹出位置</div>
        <div class="placement-group">
          <el-popconfirm title="顶部弹出" placement="top">
            <el-button slot="reference" size="small">top</el-button>
          </el-popconfirm>
          <el-popconfirm title="底部弹出" placement="bottom">
            <el-button slot="reference" size="small">bottom</el-button>
          </el-popconfirm>
          <el-popconfirm title="左侧弹出" placement="left">
            <el-button slot="reference" size="small">left</el-button>
          </el-popconfirm>
          <el-popconfirm title="右侧弹出" placement="right">
            <el-button slot="reference" size="small">right</el-button>
          </el-popconfirm>
        </div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">禁用状态</div>
        <el-popconfirm title="触发不了" disabled>
          <el-button slot="reference" disabled>已禁用</el-button>
        </el-popconfirm>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">控制弹窗 (v-model)</div>
        <el-popconfirm
          title="通过 v-model 控制"
          :value="popoverVisible"
          @input="popoverVisible = $event"
        >
          <el-button slot="reference" @click="popoverVisible = !popoverVisible">
            {{ popoverVisible ? '关闭' : '打开' }}
          </el-button>
        </el-popconfirm>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">不自动关闭</div>
        <el-popconfirm title="点击按钮后不会自动关闭" :hide-after-click="false" @confirm="onConfirmNoClose">
          <el-button slot="reference" type="info">不会关闭</el-button>
        </el-popconfirm>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'PopconfirmPage',
  components: { [NavBar.name]: NavBar },
  data() {
    return {
      popoverVisible: false,
    }
  },
  methods: {
    onConfirm() {
      this.$toast('已确认')
    },
    onCancel() {
      this.$toast('已取消')
    },
    onConfirmNoClose() {
      this.$toast('已确认（面板未关闭）')
    },
  }
}
</script>

<style scoped>
.page-popconfirm {
  background: #f7f8fa;
  min-height: 100vh;
}
.page-body {
  padding: 16px;
}
.demo-card {
  margin-bottom: 12px;
}
.placement-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
