# UserList 用户列表

用户列表示例，展示基于 `el-list-page` 组件实现的完整用户管理功能，包括搜索、筛选、分页、增删改查等操作。

## 在线预览

<MobilePreview src="/#/list" />

## 完整代码

```vue
<template>
  <div class="page-user-list">
    <div class="page-user-list__sticky">
      <van-nav-bar title="用户管理" left-arrow @click-left="$router.push('/home')">
        <template slot="right">
          <el-button type="primary" size="small" @click="handleOpenAdd" style="margin-right:8px">新增用户</el-button>
        </template>
      </van-nav-bar>

      <div class="page-user-list__search">
        <el-input v-model="searchQuery" placeholder="搜索姓名/邮箱" prefix-icon="el-icon-search" clearable />
        <el-select v-model="searchStatus" placeholder="状态筛选" clearable>
          <el-option label="全部" value="" />
          <el-option label="启用" value="active" />
          <el-option label="禁用" value="inactive" />
        </el-select>
        <span class="page-user-list__count">
          <el-tag v-if="filteredList.length" type="primary">共 {{ filteredList.length }} 条</el-tag>
        </span>
      </div>
    </div>

    <div class="page-user-list__body">
      <el-list-page
        ref="listPage"
        :fetch="fetchUsers"
        :page-size="10"
        border
        stripe
        @row-click="handleViewDetail"
      >
        <el-list-item type="selection" />
        <el-list-item type="index" />
        <el-list-item prop="name" label="姓名">
          <template slot-scope="{ row }">
            <div style="display:flex;align-items:center;gap:6px">
              <el-image :src="row.avatar" width="24" height="24" round style="flex-shrink:0" />
              <span>{{ row.name }}</span>
            </div>
          </template>
        </el-list-item>
        <el-list-item prop="email" label="邮箱" show-overflow-tooltip />
        <el-list-item prop="role" label="角色">
          <template slot-scope="{ row }">
            <el-tag :type="row.role === '管理员' ? 'danger' : row.role === '编辑' ? 'warning' : 'info'" size="small">{{ row.role }}</el-tag>
          </template>
        </el-list-item>
        <el-list-item prop="status" label="状态">
          <template slot-scope="{ row }">
            <el-switch :value="row.status === 'active'" size="18px" @change="val => handleToggleStatus(row, val)" />
          </template>
        </el-list-item>
        <el-list-item prop="rate" label="评分">
          <template slot-scope="{ row }">
            <el-rate :value="row.rate" disabled size="16" />
          </template>
        </el-list-item>
        <el-list-item prop="progress" label="进度">
          <template slot-scope="{ row }">
            <el-progress :percentage="row.progress" :stroke-width="6" :color="row.progress > 80 ? '#67c23a' : '#1989fa'" />
          </template>
        </el-list-item>
        <el-list-item prop="createdAt" label="注册时间" />
        <el-list-item type="footer">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" @click.stop="handleEdit(row)">编辑</el-button>
            <el-button type="danger" size="mini" @click.stop="handleDelete(row)">删除</el-button>
            <el-button size="mini" @click.stop="handleViewDetail(row)">详情</el-button>
          </template>
        </el-list-item>
      </el-list-page>
    </div>

    <el-dialog :visible.sync="dialogVisible" :title="isEdit ? '编辑用户' : '新增用户'" :before-close="handleBeforeClose">
      <el-form ref="form" :model="form" :rules="formRules" label-width="80px" style="height:60vh;overflow-y:auto">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名" maxlength="10" show-word-limit />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" prefix-icon="el-icon-message" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="form.role" placeholder="选择角色" style="width:100%">
            <el-option label="管理员" value="管理员" />
            <el-option label="编辑" value="编辑" />
            <el-option label="访客" value="访客" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio label="active">启用</el-radio>
            <el-radio label="inactive">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="密码" show-password />
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker v-model="form.birthday" placeholder="选择生日" />
        </el-form-item>
        <el-form-item label="上班时间" prop="workTime">
          <el-time-picker v-model="form.workTime" placeholder="选择时间" />
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <el-checkbox-group v-model="form.tags">
            <el-checkbox label="后端">后端</el-checkbox>
            <el-checkbox label="前端">前端</el-checkbox>
            <el-checkbox label="设计">设计</el-checkbox>
            <el-checkbox label="产品">产品</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="评分" prop="rate">
          <el-rate v-model="form.rate" :texts="['差','一般','好','很好','极好']" show-text />
        </el-form-item>
        <el-form-item label="完成度" prop="progress">
          <el-slider v-model="form.progress" show-input />
        </el-form-item>
        <el-form-item label="通知" prop="notify">
          <el-switch v-model="form.notify" active-color="#67c23a" inactive-color="#c0c4cc" />
        </el-form-item>
        <el-form-item label="备注" prop="desc">
          <el-input v-model="form.desc" type="textarea" :rows="2" placeholder="备注信息" />
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <el-upload :value="form.avatar ? [{url: form.avatar}] : []" @input="onUploadAvatar" :max-size="2 * 1024 * 1024" accept="image/*" preview-size="60">
            <el-button v-if="!form.avatar" size="small" icon="el-icon-upload">上传头像</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button-group capsule>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleDialogConfirm">确定</el-button>
        </el-button-group>
      </template>
    </el-dialog>

    <el-dialog :visible.sync="detailVisible" title="用户详情" show-close>
      <el-descriptions v-if="detailUser" :column="2">
        <el-descriptions-item label="姓名">{{ detailUser.name }}</el-descriptions-item>
        <el-descriptions-item label="邮箱">{{ detailUser.email }}</el-descriptions-item>
        <el-descriptions-item label="角色">
          <el-tag :type="detailUser.role==='管理员'?'danger':'info'" size="small">{{ detailUser.role }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="detailUser.status==='active'?'success':'danger'" size="small">{{ detailUser.status==='active'?'启用':'禁用' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="评分"><el-rate :value="detailUser.rate" disabled size="16" /></el-descriptions-item>
        <el-descriptions-item label="进度"><el-progress :percentage="detailUser.progress" :stroke-width="6" /></el-descriptions-item>
        <el-descriptions-item label="标签" :span="2">
          <el-tag v-for="tag in detailUser.tags" :key="tag" style="margin-right:4px" size="small">{{ tag }}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script>
import { NavBar } from 'vant'

const AVATARS = [
  'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png',
  'https://img.yzcdn.cn/vant/ipad.jpeg'
]

function randAvatar() { return AVATARS[Math.floor(Math.random() * AVATARS.length)] }

function mockUsers() {
  const first = ['张', '李', '王', '赵', '孙', '周', '吴', '郑', '陈', '刘']
  const last = ['三', '四', '五', '伟', '芳', '强', '敏', '燕', '杰', '军']
  const roles = ['管理员', '编辑', '访客']
  const names = first.flatMap(f => last.map(l => f + l))
  return names.map((name, i) => ({
    id: i + 1,
    name,
    email: name + '@example.com',
    role: roles[i % 3],
    status: i % 3 === 2 ? 'inactive' : 'active',
    rate: Math.ceil(Math.random() * 5),
    progress: Math.floor(Math.random() * 100),
    createdAt: `2025-0${(i % 9) + 1}-${String((i % 28) + 1).padStart(2, '0')}`,
    avatar: randAvatar(),
    tags: i % 2 === 0 ? ['前端', '后端'] : ['设计', '产品'],
    birthday: '1995-0' + ((i % 9) + 1) + '-' + String((i % 28) + 1).padStart(2, '0'),
    workTime: '09:00',
    notify: true,
    desc: ''
  }))
}

export default {
  name: 'UserList',
  components: { [NavBar.name]: NavBar },
  data() {
    return {
      userList: mockUsers(),
      searchQuery: '',
      searchStatus: '',
      dialogVisible: false,
      detailVisible: false,
      isEdit: false,
      editId: null,
      detailUser: null,
      form: this.getEmptyForm(),
      formRules: {
        name: [{ required: true, message: '请输入姓名' }, { min: 2, max: 10, message: '长度2-10' }],
        email: [{ required: true, message: '请输入邮箱' }, { type: 'email', message: '邮箱格式不正确' }],
        role: [{ required: true, message: '请选择角色' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  computed: {
    filteredList() {
      let list = this.userList
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase()
        list = list.filter(u => u.name.includes(q) || u.email.includes(q))
      }
      if (this.searchStatus) {
        list = list.filter(u => u.status === this.searchStatus)
      }
      return list
    }
  },
  watch: {
    searchQuery() {
      this.$refs.listPage && this.$refs.listPage.refresh()
    },
    searchStatus() {
      this.$refs.listPage && this.$refs.listPage.refresh()
    }
  },
  methods: {
    getEmptyForm() {
      return {
        name: '', email: '', role: '', status: 'active', password: '',
        birthday: '', workTime: '', tags: [], rate: 3, progress: 50,
        notify: true, desc: '', avatar: ''
      }
    },
    resetForm() {
      this.form = this.getEmptyForm()
    },
    fetchUsers({ page, pageSize }) {
      return new Promise(resolve => {
        setTimeout(() => {
          const start = (page - 1) * pageSize
          const list = this.filteredList.slice(start, start + pageSize)
          resolve({ list, total: this.filteredList.length })
        }, 300)
      })
    },
    handleOpenAdd() {
      this.isEdit = false
      this.editId = null
      this.resetForm()
      this.dialogVisible = true
    },
    handleEdit(row) {
      this.isEdit = true
      this.editId = row.id
      this.form = { ...row }
      this.dialogVisible = true
    },
    handleDelete(row) {
      this.$confirm('确定删除用户 "' + row.name + '" 吗？', '删除确认', { confirmButtonText: '删除', cancelButtonText: '取消' })
        .then(() => {
          const idx = this.userList.findIndex(u => u.id === row.id)
          if (idx >= 0) this.userList.splice(idx, 1)
          this.$message({ message: '已删除用户: ' + row.name, type: 'success' })
          this.$refs.listPage && this.$refs.listPage.refresh()
        })
        .catch(() => {})
    },
    handleToggleStatus(row, val) {
      row.status = val ? 'active' : 'inactive'
      this.$message({ message: '状态已更新: ' + row.name, type: 'success', duration: 1500 })
    },
    handleViewDetail(row) {
      this.detailUser = row
      this.detailVisible = true
    },
    handleDialogConfirm() {
      this.$refs.form.validate(v => {
        if (!v) {
          this.$alert('请检查表单填写', '表单验证失败')
          return
        }
        if (this.isEdit) {
          const idx = this.userList.findIndex(u => u.id === this.editId)
          if (idx >= 0) {
            this.userList.splice(idx, 1, { ...this.form, id: this.editId })
          }
          this.$message({ message: '用户信息已更新', type: 'success' })
        } else {
          this.form.id = this.userList.length + 1
          this.form.createdAt = new Date().toISOString().slice(0, 10)
          this.form.avatar = this.form.avatar || randAvatar()
          this.userList.push({ ...this.form })
          this.$message({ message: '新增用户成功', type: 'success' })
        }
        this.dialogVisible = false
        this.$refs.listPage && this.$refs.listPage.refresh()
      })
    },
    handleBeforeClose(action, done) {
      this.$confirm('有未保存的内容，确定关闭吗？', '提示').then(() => done()).catch(() => {})
    },
    onUploadAvatar(files) {
      if (files && files.length) {
        this.form.avatar = files[0].url || files[0].content
      } else {
        this.form.avatar = ''
      }
    }
  }
}
</script>

<style scoped>
.page-user-list {
  max-width: 800px;
  margin: 0 auto;
  height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
}

.page-user-list__sticky {
  flex-shrink: 0;
  background: #fff;
}

.page-user-list__body {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.page-user-list__search {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  align-items: center;
}

.page-user-list__search .el-input {
  flex: 1;
}

.page-user-list__search .el-select {
  width: 120px;
}

.page-user-list__count {
  margin-left: auto;
  flex-shrink: 0;
}
</style>
```

## 功能说明

### 搜索与筛选
- 支持按姓名和邮箱搜索
- 支持按状态（启用/禁用）筛选
- 实时更新列表数据

### 用户操作
- 新增用户：打开表单弹窗，填写用户信息
- 编辑用户：修改现有用户信息
- 删除用户：删除确认后移除用户
- 查看详情：显示用户详细信息

### 列表功能
- 分页展示（每页10条）
- 多选操作
- 自定义列渲染（头像、标签、评分、进度等）
