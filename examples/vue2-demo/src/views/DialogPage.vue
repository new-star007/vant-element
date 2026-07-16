<template>
  <div class="page-dialog">
    <van-nav-bar title="el-dialog 对话框" left-arrow fixed placeholder @click-left="$router.push('/home')" />
    <div class="page-body">

      <el-card class="demo-card">
        <div slot="header">基础弹窗</div>
        <el-button type="primary" @click="dialogVisible1 = true">打开弹窗</el-button>
        <el-dialog title="基础弹窗" :visible.sync="dialogVisible1">
          <p>这是弹窗的默认内容</p>
          <p>你可以在这里放置任意内容</p>
        </el-dialog>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">显示关闭按钮</div>
        <el-button type="primary" @click="dialogVisible2a = true">显示关闭按钮</el-button>
        <el-button type="warning" @click="dialogVisible2b = true">隐藏关闭按钮</el-button>
        <el-dialog title="有关闭按钮" :visible.sync="dialogVisible2a" :show-close="true">
          <p>这个弹窗右上角有关闭按钮</p>
        </el-dialog>
        <el-dialog title="无关闭按钮" :visible.sync="dialogVisible2b" :show-close="false">
          <p>这个弹窗没有关闭按钮</p>
        </el-dialog>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">点击遮罩关闭</div>
        <el-button type="primary" @click="dialogVisible3a = true">遮罩可关闭</el-button>
        <el-button type="warning" @click="dialogVisible3b = true">遮罩不可关闭</el-button>
        <el-dialog title="点击遮罩关闭" :visible.sync="dialogVisible3a" :close-on-click-modal="true">
          <p>点击遮罩层可以关闭弹窗</p>
        </el-dialog>
        <el-dialog title="点击遮罩不关闭" :visible.sync="dialogVisible3b" :close-on-click-modal="false">
          <p>点击遮罩层不会关闭，必须点击按钮关闭</p>
          <el-button @click="dialogVisible3b = false">关闭</el-button>
        </el-dialog>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">关闭前确认</div>
        <el-button type="primary" @click="dialogVisible4 = true">打开</el-button>
        <el-dialog title="关闭前确认" :visible.sync="dialogVisible4" :before-close="handleBeforeClose">
          <p>关闭弹窗前会进行确认</p>
        </el-dialog>
      </el-card>

      <el-card class="demo-card">
        <div slot="header">自定义内容</div>
        <el-button type="primary" @click="dialogVisible5 = true">打开表单</el-button>
        <el-dialog title="自定义表单" :visible.sync="dialogVisible5">
          <el-form label-width="80px">
            <el-form-item label="用户名">
              <el-input v-model="formData.name" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="formData.email" placeholder="请输入邮箱" />
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="formData.gender">
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="formData.remark" placeholder="请输入备注" />
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-card>

    </div>
  </div>
</template>

<script>
import { NavBar, Dialog } from 'vant'

export default {
  name: 'DialogPage',
  components: { [NavBar.name]: NavBar },
  data() {
    return {
      dialogVisible1: false,
      dialogVisible2a: false,
      dialogVisible2b: false,
      dialogVisible3a: false,
      dialogVisible3b: false,
      dialogVisible4: false,
      dialogVisible5: false,
      formData: {
        name: '',
        email: '',
        gender: '男',
        remark: '',
      },
    }
  },
  methods: {
    handleBeforeClose(action, done) {
      Dialog.confirm({ title: '确认', message: '确定要关闭弹窗吗？' }).then(() => {
        done()
      }).catch(() => {})
    },
  },
}
</script>

<style scoped>
.page-dialog {
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
