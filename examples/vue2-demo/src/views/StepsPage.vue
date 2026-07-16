<template>
  <div class="page-steps">
    <van-nav-bar title="el-steps / el-step 步骤条" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础步骤</div>
        <el-steps :active="active" align-center>
          <el-step title="步骤一" description="填写信息" />
          <el-step title="步骤二" description="确认订单" />
          <el-step title="步骤三" description="完成" />
        </el-steps>
        <div style="margin-top:8px;text-align:center">
          <el-button size="mini" :disabled="active <= 0" @click="active--">上一步</el-button>
          <el-button size="mini" :disabled="active >= 3" type="primary" @click="active++">下一步</el-button>
        </div>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">不同状态</div>
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
      </el-card>

      <el-card class="demo-card">
        <div slot="header">简洁模式</div>
        <el-steps :active="1" simple>
          <el-step title="步骤一" />
          <el-step title="步骤二" />
          <el-step title="步骤三" />
        </el-steps>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">纵向步骤条</div>
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
      </el-card>

      <el-card class="demo-card">
        <div slot="header">自定义图标</div>
        <el-steps :active="1" align-center>
          <el-step title="购物" icon="shop" description="选购商品" />
          <el-step title="支付" icon="cash-back-record" description="确认支付" />
          <el-step title="完成" icon="success" description="交易完成" />
        </el-steps>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">自定义颜色</div>
        <el-steps :active="1" align-center active-color="#ee0a24" inactive-color="#999">
          <el-step title="步骤一" description="进行中" />
          <el-step title="步骤二" description="待处理" />
          <el-step title="步骤三" description="待处理" />
        </el-steps>
        <el-steps :active="2" align-center active-color="#07c160" inactive-color="#c8c9cc" style="margin-top:12px">
          <el-step title="已完成" description="通过" />
          <el-step title="已完成" description="通过" />
          <el-step title="待审核" description="未通过" />
        </el-steps>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">点击切换</div>
        <el-steps :active="clickableActive" align-center @change="onStepChange">
          <el-step title="选择商品" description="浏览并加入购物车" />
          <el-step title="确认订单" description="填写收货信息" />
          <el-step title="支付" description="完成支付" />
        </el-steps>
        <div class="demo-value">当前步骤：{{ clickableActive + 1 }} / 3</div>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  name: 'StepsPage',
  components: { [NavBar.name]: NavBar },
  data() {
    return {
      active: 1,
      clickableActive: 1
    }
  },
  methods: {
    onStepChange(val) {
      this.clickableActive = val
    }
  }
}
</script>

<style scoped>
.page-steps {
  background: #f7f8fa;
  min-height: 100vh;
}
.page-body {
  padding: 16px;
}
.demo-card {
  margin-bottom: 12px;
}
</style>
