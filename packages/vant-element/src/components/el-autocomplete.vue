<template>
  <div class="el-autocomplete">
    <van-field
      :value="displayText"
      :placeholder="placeholder"
      :disabled="disabled"
      readonly
      :clearable="false"
      is-link
      @click="onTrigger"
    >
      <template v-if="$slots.prefix" #left-icon>
        <slot name="prefix" />
      </template>
      <template #right-icon>
        <van-icon
          v-if="showClear"
          name="clear"
          class="el-autocomplete__clear"
          @touchstart.prevent="onClear"
          @click.stop="onClear"
        />
      </template>
    </van-field>

    <van-popup
      v-if="!disabled"
      :value="popupVisible"
      @input="onPopupInput"
      position="bottom"
      round
      :style="{ maxHeight: '60vh' }"
      get-container="body"
    >
      <van-search
        v-model="searchValue"
        placeholder="请输入"
        shape="round"
        autofocus
        @input="onSearchInput"
        @search="onSearchConfirm"
      />

      <div ref="body" class="el-autocomplete__body">
        <div v-if="loading" class="el-autocomplete__loading">
          <slot name="loading">
            <van-loading size="24px">加载中...</van-loading>
          </slot>
        </div>

        <template v-else-if="suggestions.length > 0">
          <div class="el-autocomplete__suggestions">
            <div
              v-for="(item, index) in suggestions"
              :key="index"
              class="el-autocomplete__suggestion"
              :class="{ 'is-highlighted': highlightedIndex === index }"
              @click="onSelect(item)"
            >
              <slot name="item" :item="item">
                {{ item[valueKey] }}
              </slot>
            </div>
          </div>
        </template>

        <div v-else-if="searchValue && !loading" class="el-autocomplete__empty">
          无匹配数据
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Field, Icon, Popup, Search, Loading } from 'vant'

export default {
  components: {
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [Search.name]: Search,
    [Loading.name]: Loading
  },
  name: 'ElAutocomplete',
  props: {
    value: { type: [String, Number], default: '' },
    placeholder: String,
    disabled: Boolean,
    clearable: { type: Boolean, default: false },
    valueKey: { type: String, default: 'value' },
    debounce: { type: Number, default: 300 },
    fetchSuggestions: Function,
    triggerOnFocus: { type: Boolean, default: true },
    selectWhenUnmatched: { type: Boolean, default: false },
    name: String,
    hideLoading: Boolean,
    popperClass: String,
    popperOptions: Object,
    highlightFirstItem: { type: Boolean, default: false },
    prefixIcon: String,
    suffixIcon: String,
    label: String,
    size: String,
    maxlength: Number,
    minlength: Number,
    autofocus: Boolean
  },
  data() {
    return {
      popupVisible: false,
      searchValue: '',
      suggestions: [],
      highlightedIndex: -1,
      loading: false,
      debounceTimer: null
    }
  },
  computed: {
    displayText() {
      return this.value
    },
    showClear() {
      if (!this.clearable || this.disabled) return false
      if (!this.value && this.value !== 0) return false
      return true
    }
  },
  methods: {
    onTrigger() {
      if (this.disabled) return
      this.searchValue = ''
      this.popupVisible = true
      this.$emit('focus')
      if (this.triggerOnFocus) {
        this.handleSuggestions(this.searchValue)
      }
    },
    onPopupInput(val) {
      this.popupVisible = val
      if (!val) {
        this.$emit('blur')
        this.suggestions = []
        this.highlightedIndex = -1
      }
    },
    onSearchInput(val) {
      this.handleSuggestions(val)
    },
    onSearchConfirm(val) {
      if (this.highlightedIndex >= 0 && this.highlightedIndex < this.suggestions.length) {
        this.onSelect(this.suggestions[this.highlightedIndex])
      } else {
        this.confirmValue(val)
      }
    },
    handleSuggestions(value) {
      if (typeof this.fetchSuggestions !== 'function') {
        this.suggestions = []
        return
      }
      clearTimeout(this.debounceTimer)
      this.debounceTimer = setTimeout(() => {
        this.loading = true
        this.fetchSuggestions(value, (suggestions) => {
          this.loading = false
          if (Array.isArray(suggestions)) {
            this.suggestions = suggestions
            if (this.value) {
              const idx = suggestions.findIndex(s => s[this.valueKey] === this.value)
              this.highlightedIndex = idx >= 0 ? idx : -1
            } else {
              this.highlightedIndex = this.highlightFirstItem && suggestions.length > 0 ? 0 : -1
            }
            this.$nextTick(this.scrollToHighlighted)
          }
        })
      }, this.debounce)
    },
    scrollToHighlighted() {
      if (this.highlightedIndex < 0) return
      const body = this.$refs.body
      if (!body) return
      const item = body.querySelector('.is-highlighted')
      if (item) {
        item.scrollIntoView({ block: 'nearest' })
      }
    },
    onSelect(item) {
      const val = item[this.valueKey]
      this.confirmValue(val)
      this.$emit('select', item)
    },
    confirmValue(val) {
      this.$emit('input', val)
      this.$emit('change', val)
      this.popupVisible = false
      this.suggestions = []
      this.highlightedIndex = -1
    },
    onClear() {
      this.$emit('input', '')
      this.$emit('change', '')
      this.$emit('clear')
      this.suggestions = []
      this.highlightedIndex = -1
    }
  },
  beforeDestroy() {
    clearTimeout(this.debounceTimer)
  }
}
</script>

<style>
.el-autocomplete {
  width: 100%;
}

.el-autocomplete .van-field__control {
  color: #323233;
}

.el-autocomplete__clear {
  color: #c8c9cc;
  font-size: 16px;
  cursor: pointer;
}

.el-autocomplete__body {
  height: 200px;
  overflow-y: auto;
}

.el-autocomplete__suggestions {
  -webkit-overflow-scrolling: touch;
}

.el-autocomplete__suggestion {
  padding: 12px 16px;
  font-size: 14px;
  color: #323233;
  cursor: pointer;
  border-bottom: 1px solid #f5f6fa;
}

.el-autocomplete__suggestion:active {
  background: #f2f3f5;
}

.el-autocomplete__suggestion.is-highlighted {
  background: #f2f3f5;
  color: #1989fa;
}

.el-autocomplete__empty {
  padding: 30px 0;
  text-align: center;
  color: #969799;
  font-size: 14px;
}

.el-autocomplete__loading {
  padding: 30px 0;
  display: flex;
  justify-content: center;
}
</style>
