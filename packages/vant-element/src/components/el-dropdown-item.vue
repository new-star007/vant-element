<template>
  <div
    class="el-dropdown-menu__item"
    :class="{
      'is-disabled': disabled,
      'is-divided': divided
    }"
    @click="handleClick"
  >
    <van-icon v-if="icon" :name="icon" class="el-dropdown-menu__icon" />
    <slot />
  </div>
</template>

<script>
import { Icon } from 'vant'

export default {
  components: { [Icon.name]: Icon },
  name: 'ElDropdownItem',
  props: {
    command: { type: [String, Number, Object], default: '' },
    disabled: Boolean,
    divided: Boolean,
    icon: String
  },
  inject: {
    dropdown: { default: null }
  },
  methods: {
    handleClick() {
      if (this.disabled) return
      this.$emit('click')
      if (this.dropdown) {
        this.dropdown.handleItemClick(this.command, this)
        this.dropdown.hide()
      }
    }
  }
}
</script>

<style>
.el-dropdown-menu__item {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  font-size: 14px;
  color: #606266;
  cursor: pointer;
  white-space: nowrap;
}

.el-dropdown-menu__item:hover {
  background-color: #ecf5ff;
  color: #409eff;
}

.el-dropdown-menu__item.is-disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}

.el-dropdown-menu__item.is-disabled:hover {
  background-color: #fff;
  color: #c0c4cc;
}

.el-dropdown-menu__item.is-divided {
  border-top: 1px solid #e8e8e8;
  margin-top: 5px;
  padding-top: 10px;
}

.el-dropdown-menu__icon {
  margin-right: 8px;
  font-size: 16px;
}
</style>
