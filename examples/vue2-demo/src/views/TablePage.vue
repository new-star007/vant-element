<template>
  <div class="page-table-demo">
    <van-nav-bar title="El-Table 功能演示" left-arrow fixed placeholder @click-left="$router.push('/home')" />

    <div class="section">
      <div class="section-title">1. 基础表格</div>
      <div class="section-desc">展示基本的表格渲染、stripe 斑马纹、border 边框</div>
      <el-table :data="basicData" border stripe size="small">
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="age" label="年龄" width="80" />
        <el-table-column prop="city" label="城市" />
      </el-table>
    </div>

    <div class="section">
      <div class="section-title">2. 表头排序</div>
      <div class="section-desc">点击表头排序，支持 ascending / descending / null 切换</div>
      <el-table :data="sortData" border @sort-change="onSortChange">
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="age" label="年龄" width="80" sortable />
        <el-table-column prop="score" label="分数" width="100" sortable />
        <el-table-column prop="date" label="日期" />
      </el-table>
    </div>

    <div class="section">
      <div class="section-title">3. 列筛选</div>
      <div class="section-desc">点击筛选图标选择筛选条件</div>
      <el-table :data="filterData" border @filter-change="onFilterChange">
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column
          prop="role"
          label="角色"
          width="100"
          :filters="roleFilters"
        />
        <el-table-column
          prop="department"
          label="部门"
          width="100"
          :filters="deptFilters"
        />
        <el-table-column prop="email" label="邮箱" />
      </el-table>
    </div>

    <div class="section">
      <div class="section-title">4. 多选 + 全选</div>
      <div class="section-desc">selection 列支持行选择和全选操作</div>
      <div style="padding:0 0 8px;font-size:13px;color:#909399">
        已选中 {{ selectionRows.length }} 行
      </div>
      <el-table
        ref="selectionTable"
        :data="basicData"
        border
        @selection-change="onSelectionChange"
      >
        <el-table-column type="selection" width="48" />
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="age" label="年龄" width="80" />
        <el-table-column prop="city" label="城市" />
      </el-table>
      <div style="padding:8px 0;display:flex;gap:8px">
        <el-button size="mini" @click="$refs.selectionTable && $refs.selectionTable.clearSelection()">清空选择</el-button>
        <el-button size="mini" @click="$refs.selectionTable && $refs.selectionTable.toggleAllSelection()">全选/取消全选</el-button>
        <el-button size="mini" @click="toggleSecondRow">切换第2行选择</el-button>
      </div>
    </div>

    <div class="section">
      <div class="section-title">5. 合计行</div>
      <div class="section-desc">showSummary 自动对数值列求和，支持自定义 summaryMethod</div>
      <el-table :data="summaryData" border show-summary>
        <el-table-column prop="name" label="商品" width="120" />
        <el-table-column prop="price" label="单价" width="80" />
        <el-table-column prop="quantity" label="数量" width="80" />
        <el-table-column prop="total" label="总价" />
      </el-table>
    </div>

    <div class="section">
      <div class="section-title">6. 自定义合计</div>
      <div class="section-desc">通过 summaryMethod 自定义合计逻辑</div>
      <el-table :data="summaryData" border show-summary :summary-method="customSummary">
        <el-table-column prop="name" label="商品" width="120" />
        <el-table-column prop="price" label="单价" width="80" />
        <el-table-column prop="quantity" label="数量" width="80" />
        <el-table-column prop="total" label="总价" />
      </el-table>
    </div>

    <div class="section">
      <div class="section-title">7. 行展开</div>
      <div class="section-desc">点击展开图标查看行详情</div>
      <el-table :data="basicData" border>
        <el-table-column type="expand">
          <template slot-scope="{ row }">
            <div class="expand-content">
              <p><strong>姓名:</strong> {{ row.name }}</p>
              <p><strong>年龄:</strong> {{ row.age }}</p>
              <p><strong>城市:</strong> {{ row.city }}</p>
              <p><strong>地址:</strong> {{ row.address || '未填写' }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="age" label="年龄" width="80" />
        <el-table-column prop="city" label="城市" />
      </el-table>
    </div>

    <div class="section">
      <div class="section-title">8. 自定义单元格样式</div>
      <div class="section-desc">cellClassName / cellStyle / headerCellClassName 动态设置</div>
      <el-table
        :data="basicData"
        border
        :cell-class-name="getCellClass"
        :header-cell-class-name="getHeaderClass"
      >
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="age" label="年龄" width="80" />
        <el-table-column prop="city" label="城市" />
      </el-table>
    </div>

    <div class="section">
      <div class="section-title">9. 自定义行样式</div>
      <div class="section-desc">rowClassName / rowStyle 动态设置行样式</div>
      <el-table
        :data="basicData"
        border
        row-class-name="custom-row"
        :row-style="getRowStyle"
      >
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="age" label="年龄" width="80" />
        <el-table-column prop="city" label="城市" />
      </el-table>
    </div>

    <div class="section">
      <div class="section-title">10. 行点击 + 双击事件</div>
      <div class="section-desc">row-click / row-dblclick / cell-click 事件</div>
      <div style="padding:0 0 8px;font-size:13px;color:#909399">
        最近事件: {{ lastEvent || '无' }}
      </div>
      <el-table
        :data="basicData"
        border
        highlight-current-row
        @row-click="onEvent('row-click', $event)"
        @row-dblclick="onEvent('row-dblclick', $event)"
        @cell-click="onEvent('cell-click', $event)"
      >
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="age" label="年龄" width="80" />
        <el-table-column prop="city" label="城市" />
      </el-table>
    </div>

    <div class="section">
      <div class="section-title">11. 编程式排序</div>
      <div class="section-desc">通过 sort() / clearSort() 方法控制排序</div>
      <el-table ref="sortTable" :data="sortData" border>
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="age" label="年龄" width="80" sortable />
        <el-table-column prop="score" label="分数" width="100" sortable />
        <el-table-column prop="date" label="日期" />
      </el-table>
      <div style="padding:8px 0;display:flex;gap:8px">
        <el-button size="mini" @click="$refs.sortTable.sort('age', 'ascending')">年龄升序</el-button>
        <el-button size="mini" @click="$refs.sortTable.sort('age', 'descending')">年龄降序</el-button>
        <el-button size="mini" @click="$refs.sortTable.clearSort()">清除排序</el-button>
      </div>
    </div>

    <div class="section">
      <div class="section-title">12. 编程式筛选</div>
      <div class="section-desc">通过 clearFilter() 方法清除筛选</div>
      <el-table ref="filterTable" :data="filterData" border>
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column
          prop="role"
          label="角色"
          width="100"
          :filters="roleFilters"
        />
        <el-table-column prop="email" label="邮箱" />
      </el-table>
      <div style="padding:8px 0">
        <el-button size="mini" @click="$refs.filterTable.clearFilter('role')">清除角色筛选</el-button>
        <el-button size="mini" @click="$refs.filterTable.clearFilter()">清除所有筛选</el-button>
      </div>
    </div>

    <div class="section">
      <div class="section-title">13. 空数据</div>
      <div class="section-desc">data 为空时显示 empty 插槽或 emptyText</div>
      <el-table :data="[]" border>
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="age" label="年龄" width="80" />
        <el-table-column prop="city" label="城市" />
      </el-table>
    </div>

    <div class="section">
      <div class="section-title">14. 自定义空状态</div>
      <div class="section-desc">通过 empty slot 自定义空状态内容</div>
      <el-table :data="[]" border empty-text="">
        <template slot="empty">
          <div style="padding:20px;color:#909399">
            <div style="font-size:24px;margin-bottom:8px">&#128528;</div>
            <div>暂无相关数据</div>
            <el-button type="primary" size="mini" style="margin-top:8px" @click="addDemoRow">添加一条数据</el-button>
          </div>
        </template>
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="age" label="年龄" width="80" />
        <el-table-column prop="city" label="城市" />
      </el-table>
    </div>

    <div class="section">
      <div class="section-title">15. Tooltip 溢出提示</div>
      <div class="section-desc">show-overflow-tooltip 超长文本自动省略并弹出提示</div>
      <el-table :data="tooltipData" border>
        <el-table-column prop="name" label="姓名" width="100" />
        <el-table-column prop="longText" label="长文本" show-overflow-tooltip width="250"/>
      </el-table>
    </div>

    <div class="section">
      <div class="section-title">16. defaultSort 默认排序</div>
      <div class="section-desc">页面加载时默认按 age 降序排列</div>
      <el-table :data="sortData" border :default-sort="{ prop: 'age', order: 'descending' }">
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="age" label="年龄" width="80" sortable />
        <el-table-column prop="score" label="分数" width="100" sortable />
        <el-table-column prop="date" label="日期" />
      </el-table>
    </div>

    <div class="section">
      <div class="section-title">17. 单元格合并</div>
      <div class="section-desc">spanMethod 实现 rowspan / colspan 合并</div>
      <el-table :data="spanData" border :span-method="spanMethod">
        <el-table-column prop="name" label="姓名" width="100" />
        <el-table-column prop="role" label="角色" width="80" />
        <el-table-column prop="department" label="部门" width="80" />
        <el-table-column prop="city" label="城市" />
      </el-table>
    </div>

    <div class="section">
      <div class="section-title">18. 综合示例</div>
      <div class="section-desc">排序 + 筛选 + 多选 + 合计 + 展开 组合使用</div>
      <el-table
        :data="comboData"
        border
        stripe
        show-summary
        height="300"
        @sort-change="onSortChange"
        @selection-change="onSelectionChange"
      >
        <el-table-column type="selection" width="40" />
        <el-table-column type="expand">
          <template slot-scope="{ row }">
            <div class="expand-content">
              <p>详细信息: {{ row.name }} - {{ row.department }} - {{ row.city }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="100" sortable />
        <el-table-column prop="age" label="年龄" width="70" sortable />
        <el-table-column
          prop="role"
          label="角色"
          width="80"
          :filters="roleFilters"
        />
        <el-table-column prop="department" label="部门" width="80" />
        <el-table-column prop="city" label="城市" />
        <el-table-column prop="email" label="邮箱" show-overflow-tooltip />
      </el-table>
    </div>

    <div class="section">
      <div class="section-title">19. 固定高度滚动</div>
      <div class="section-desc">height 设定固定高度，超出后纵向滚动</div>
      <el-table :data="bigData" border height="200">
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="age" label="年龄" width="80" />
        <el-table-column prop="city" label="城市" />
      </el-table>
    </div>

    <div class="section">
      <div class="section-title">20. 最大高度</div>
      <div class="section-desc">maxHeight 限制最大高度，内容少时不滚动</div>
      <el-table :data="basicData" border max-height="200">
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="age" label="年龄" width="80" />
        <el-table-column prop="city" label="城市" />
      </el-table>
    </div>

    <div class="section">
      <div class="section-title">21. 三种尺寸对比</div>
      <div class="section-desc">size: medium / small / mini</div>
      <el-table :data="basicData" border size="medium" style="margin-bottom:8px">
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="age" label="年龄" width="80" />
        <el-table-column prop="city" label="城市" />
      </el-table>
      <el-table :data="basicData" border size="small" style="margin-bottom:8px">
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="age" label="年龄" width="80" />
        <el-table-column prop="city" label="城市" />
      </el-table>
      <el-table :data="basicData" border size="mini">
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="age" label="年龄" width="80" />
        <el-table-column prop="city" label="城市" />
      </el-table>
    </div>

    <div class="section">
      <div class="section-title">22. 隐藏表头</div>
      <div class="section-desc">show-header=false 隐藏表头行</div>
      <el-table :data="basicData" border :show-header="false">
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="age" label="年龄" width="80" />
        <el-table-column prop="city" label="城市" />
      </el-table>
    </div>

    <div class="section">
      <div class="section-title">23. 默认展开所有行</div>
      <div class="section-desc">default-expand-all 自动展开所有 expand 行</div>
      <el-table :data="basicData" border default-expand-all>
        <el-table-column type="expand">
          <template slot-scope="{ row }">
            <div class="expand-content">
              <p><strong>姓名:</strong> {{ row.name }}，<strong>年龄:</strong> {{ row.age }}，<strong>城市:</strong> {{ row.city }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="age" label="年龄" width="80" />
        <el-table-column prop="city" label="城市" />
      </el-table>
    </div>

    <div class="section">
      <div class="section-title">24. expandRowKeys 控制展开</div>
      <div class="section-desc">通过 expandRowKeys 数组控制哪些行展开</div>
      <div style="padding:0 0 8px;font-size:13px;color:#909399">
        当前展开行 key: {{ controlledExpandKeys.join(', ') || '无' }}
      </div>
      <div style="padding:0 0 8px;display:flex;gap:8px">
        <el-button size="mini" @click="controlledExpandKeys = basicData.map(r => r.name)">全部展开</el-button>
        <el-button size="mini" @click="controlledExpandKeys = []">全部收起</el-button>
        <el-button size="mini" @click="controlledExpandKeys = [basicData[0].name, basicData[2].name]">展开第1、3行</el-button>
      </div>
      <el-table :data="basicData" border :expand-row-keys="controlledExpandKeys" row-key="name">
        <el-table-column type="expand">
          <template slot-scope="{ row }">
            <div class="expand-content">
              <p><strong>{{ row.name }}</strong> - {{ row.city }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="age" label="年龄" width="80" />
        <el-table-column prop="city" label="城市" />
      </el-table>
    </div>

    <div class="section">
      <div class="section-title">25. 高亮当前行 + currentRowKey</div>
      <div class="section-desc">highlight-current-row 高亮点击行，current-row-key 通过 key 设置当前行</div>
      <div style="padding:0 0 8px;display:flex;gap:8px">
        <el-button size="mini" @click="currentKeyName = '张三'">当前行=张三</el-button>
        <el-button size="mini" @click="currentKeyName = '王五'">当前行=王五</el-button>
        <el-button size="mini" @click="currentKeyName = ''">清除</el-button>
      </div>
      <el-table
        :data="basicData"
        border
        highlight-current-row
        :current-row-key="currentKeyName"
        row-key="name"
        @current-change="onCurrentChange"
      >
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="age" label="年龄" width="80" />
        <el-table-column prop="city" label="城市" />
      </el-table>
    </div>

    <div class="section">
      <div class="section-title">26. 高亮选中行</div>
      <div class="section-desc">highlight-selection-row 高亮被选中的行</div>
      <el-table
        :data="basicData"
        border
        highlight-selection-row
        @selection-change="onSelectionChange"
      >
        <el-table-column type="selection" width="48" />
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="age" label="年龄" width="80" />
        <el-table-column prop="city" label="城市" />
      </el-table>
    </div>

    <div class="section">
      <div class="section-title">27. 单选筛选</div>
      <div class="section-desc">filter-multiple=false 同一列只能选一个筛选值</div>
      <el-table :data="filterData" border>
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column
          prop="role"
          label="角色(单选)"
          width="120"
          :filters="roleFilters"
          :filter-multiple="false"
        />
        <el-table-column prop="department" label="部门" />
      </el-table>
    </div>

    <div class="section">
      <div class="section-title">28. 默认筛选值</div>
      <div class="section-desc">filtered-value 设置初始筛选条件</div>
      <el-table :data="filterData" border>
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column
          prop="role"
          label="角色"
          width="100"
          :filters="roleFilters"
          :filtered-value="['管理员']"
        />
        <el-table-column prop="department" label="部门" />
      </el-table>
    </div>

    <div class="section">
      <div class="section-title">29. 行可选控制</div>
      <div class="section-desc">selectable 函数控制哪些行可勾选（年龄>25才可选）</div>
      <el-table :data="basicData" border @selection-change="onSelectionChange">
        <el-table-column type="selection" width="48" :selectable="canSelect" />
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="age" label="年龄" width="80" />
        <el-table-column prop="city" label="城市" />
      </el-table>
      <div style="padding:8px 0;font-size:12px;color:#909399">* 年龄 ≤ 25 的行不可勾选</div>
    </div>

    <div class="section">
      <div class="section-title">30. 自定义 formatter（含 index）</div>
      <div class="section-desc">formatter 函数第4个参数为行索引</div>
      <el-table :data="basicData" border>
        <el-table-column prop="name" label="姓名" width="120" :formatter="formatName" />
        <el-table-column prop="age" label="年龄" width="80" />
        <el-table-column prop="city" label="城市" />
      </el-table>
    </div>

    <div class="section">
      <div class="section-title">31. 表头行样式</div>
      <div class="section-desc">header-row-class-name / header-row-style / header-cell-style 动态设置</div>
      <el-table
        :data="basicData"
        border
        header-row-class-name="demo-header-row"
        :header-row-style="{ backgroundColor: '#f0f9ff' }"
        :header-cell-style="getHeaderCellStyle"
      >
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="age" label="年龄" width="80" />
        <el-table-column prop="city" label="城市" />
      </el-table>
    </div>

    <div class="section">
      <div class="section-title">32. cellStyle 函数形式</div>
      <div class="section-desc">cell-style 通过函数动态设置单元格内联样式</div>
      <el-table
        :data="basicData"
        border
        :cell-style="getCellStyleFn"
      >
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="age" label="年龄" width="80" />
        <el-table-column prop="city" label="城市" />
      </el-table>
    </div>

    <div class="section">
      <div class="section-title">33. 更多事件演示</div>
      <div class="section-desc">cell-dblclick / cell-mouse-enter / cell-mouse-leave / header-click</div>
      <div style="padding:0 0 8px;font-size:13px;color:#909399">
        最近事件: {{ lastEvent || '无' }}
      </div>
      <el-table
        :data="basicData"
        border
        @cell-dblclick="onEvent('cell-dblclick', $event)"
        @cell-mouse-enter="onEvent('cell-mouse-enter', $event)"
        @cell-mouse-leave="onEvent('cell-mouse-leave', $event)"
        @header-click="onEvent('header-click', $event)"
      >
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="age" label="年龄" width="80" />
        <el-table-column prop="city" label="城市" />
      </el-table>
    </div>

    <div class="section">
      <div class="section-title">34. select / select-all 事件</div>
      <div class="section-desc">select 单行选中触发，select-all 全选触发</div>
      <div style="padding:0 0 8px;font-size:13px;color:#909399">
        {{ selectionEventLog || '暂无事件' }}
      </div>
      <el-table
        :data="basicData"
        border
        @select="onSelectEvent"
        @select-all="onSelectAllEvent"
      >
        <el-table-column type="selection" width="48" />
        <el-table-column prop="name" label="姓名" width="200" />
        <el-table-column prop="age" label="年龄" width="80" />
      </el-table>
    </div>

    <div class="section">
      <div class="section-title">35. rowClassName 函数形式</div>
      <div class="section-desc">row-class-name 通过函数返回类名对象</div>
      <el-table
        :data="basicData"
        border
        :row-class-name="getRowClassNameFn"
      >
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="age" label="年龄" width="80" />
        <el-table-column prop="city" label="城市" />
      </el-table>
    </div>

    <div class="section">
      <div class="section-title">36. 多级表头</div>
      <div class="section-desc">嵌套 el-table-column 实现复杂表头，排序/筛选仅对叶子列生效</div>
      <el-table :data="complexHeaderData" border @sort-change="onSortChange">
        <el-table-column prop="date" label="日期" width="120" sortable />
        <el-table-column label="配送信息">
          <el-table-column prop="name" label="姓名" width="100" />
          <el-table-column label="地址">
            <el-table-column prop="province" label="省份" width="80" />
            <el-table-column prop="city" label="城市" width="80" />
            <el-table-column prop="district" label="区县" width="80" />
          </el-table-column>
        </el-table-column>
        <el-table-column prop="remark" label="备注" />
      </el-table>
    </div>

    <div class="section">
      <div class="section-title">37. 固定列（左固定）</div>
      <div class="section-desc">fixed="left" 将列固定在左侧，横向滚动时固定列不滚动</div>
      <el-table :data="fixedData" border height="300" width="800">
        <el-table-column type="index" label="#" width="50" fixed="left" />
        <el-table-column prop="name" label="姓名" width="100" fixed="left" />
        <el-table-column prop="age" label="年龄" width="80" />
        <el-table-column prop="gender" label="性别" width="60" />
        <el-table-column prop="phone" label="电话" width="120" />
        <el-table-column prop="email" label="邮箱" width="180" />
        <el-table-column prop="address" label="地址" width="200" />
        <el-table-column prop="department" label="部门" width="80" />
        <el-table-column prop="role" label="角色" width="80" />
      </el-table>
    </div>

    <div class="section">
      <div class="section-title">38. 固定列（右固定）</div>
      <div class="section-desc">fixed="right" 将列固定在右侧，适合操作列</div>
      <el-table :data="fixedData" border height="300" width="800">
        <el-table-column type="index" label="#" width="50" />
        <el-table-column prop="name" label="姓名" width="100" />
        <el-table-column prop="age" label="年龄" width="80" />
        <el-table-column prop="gender" label="性别" width="60" />
        <el-table-column prop="phone" label="电话" width="120" />
        <el-table-column prop="email" label="邮箱" width="180" />
        <el-table-column prop="address" label="地址" width="200" />
        <el-table-column prop="department" label="部门" width="80" />
        <el-table-column prop="role" label="角色" width="80" />
        <el-table-column prop="status" label="状态" width="80" fixed="right" />
      </el-table>
    </div>

    <div class="section">
      <div class="section-title">39. 固定列（左右同时固定）</div>
      <div class="section-desc">同时使用 left 和 right 固定，中间列可横向滚动</div>
      <el-table :data="fixedData" border height="300" width="800">
        <el-table-column type="index" label="#" width="50" fixed="left" />
        <el-table-column prop="name" label="姓名" width="100" fixed="left" />
        <el-table-column prop="age" label="年龄" width="80" />
        <el-table-column prop="gender" label="性别" width="60" />
        <el-table-column prop="phone" label="电话" width="120" />
        <el-table-column prop="email" label="邮箱" width="180" />
        <el-table-column prop="address" label="地址" width="200" />
        <el-table-column prop="department" label="部门" width="80" />
        <el-table-column prop="role" label="角色" width="80" />
        <el-table-column prop="status" label="状态" width="80" fixed="right" />
      </el-table>
    </div>

    <div class="section">
      <div class="section-title">40. 固定列 + 组合功能</div>
      <div class="section-desc">固定列与排序、筛选、自定义渲染、多选等组合使用</div>
      <el-table :data="fixedData" border height="300" width="800">
        <el-table-column type="selection" width="48" fixed="left" />
        <el-table-column prop="name" label="姓名" width="100" fixed="left" sortable />
        <el-table-column prop="age" label="年龄" width="80" sortable />
        <el-table-column prop="gender" label="性别" width="60" />
        <el-table-column prop="phone" label="电话" width="120" />
        <el-table-column prop="email" label="邮箱" width="180" show-overflow-tooltip />
        <el-table-column prop="department" label="部门" width="80" :filters="deptFilters" />
        <el-table-column prop="role" label="角色" width="80" />
        <el-table-column prop="status" label="状态" width="80" fixed="right" />
        <el-table-column label="操作" width="140" fixed="right">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini">编辑</el-button>
            <el-button type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="section">
      <div class="section-title">41. 固定列 + 自定义单元格样式</div>
      <div class="section-desc">cellClassName / cellStyle / rowClassName 在固定列中同样生效</div>
      <el-table
        :data="fixedData"
        border
        height="300" width="800"
        :cell-class-name="fixedCellClass"
        :cell-style="fixedCellStyle"
        :row-class-name="fixedRowClass"
      >
        <el-table-column type="selection" width="48" fixed="left" />
        <el-table-column prop="name" label="姓名" width="100" fixed="left" />
        <el-table-column prop="age" label="年龄" width="80" />
        <el-table-column prop="gender" label="性别" width="60" />
        <el-table-column prop="phone" label="电话" width="120" />
        <el-table-column prop="email" label="邮箱" width="180" />
        <el-table-column prop="department" label="部门" width="80" />
        <el-table-column prop="role" label="角色" width="80" />
        <el-table-column prop="status" label="状态" width="80" fixed="right" />
        <el-table-column label="操作" width="140" fixed="right">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini">编辑</el-button>
            <el-button type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div style="height:40px"></div>
  </div>
</template>

<script>
import { NavBar, Toast } from 'vant'

function mockBasicData() {
  return [
    { name: '张三', age: 28, city: '北京', address: '北京市朝阳区建国门外大街1号' },
    { name: '李四', age: 35, city: '上海', address: '上海市浦东新区陆家嘴环路1000号' },
    { name: '王五', age: 22, city: '广州', address: '广州市天河区珠江新城华夏路' },
    { name: '赵六', age: 31, city: '深圳', address: '深圳市南山区科技园高新南一道' },
    { name: '孙七', age: 26, city: '杭州', address: '杭州市西湖区文三路478号' }
  ]
}

function mockSortData() {
  return [
    { name: '张三', age: 28, score: 85, date: '2025-01-15' },
    { name: '李四', age: 35, score: 92, date: '2025-02-20' },
    { name: '王五', age: 22, score: 78, date: '2025-03-10' },
    { name: '赵六', age: 31, score: 88, date: '2024-12-05' },
    { name: '孙七', age: 26, score: 95, date: '2025-04-01' }
  ]
}

function mockFilterData() {
  return [
    { name: '张三', role: '管理员', department: '技术部', email: 'zhangsan@example.com' },
    { name: '李四', role: '编辑', department: '市场部', email: 'lisi@example.com' },
    { name: '王五', role: '访客', department: '产品部', email: 'wangwu@example.com' },
    { name: '赵六', role: '管理员', department: '技术部', email: 'zhaoliu@example.com' },
    { name: '孙七', role: '编辑', department: '市场部', email: 'sunqi@example.com' }
  ]
}

function mockSummaryData() {
  return [
    { name: '商品A', price: 100, quantity: 3, total: 300 },
    { name: '商品B', price: 250, quantity: 2, total: 500 },
    { name: '商品C', price: 80, quantity: 5, total: 400 },
    { name: '商品D', price: 120, quantity: 4, total: 480 }
  ]
}

function mockComboData() {
  return [
    { name: '张三', age: 28, role: '管理员', department: '技术部', city: '北京', email: 'zhangsan@example.com' },
    { name: '李四', age: 35, role: '编辑', department: '市场部', city: '上海', email: 'lisi@example.com' },
    { name: '王五', age: 22, role: '访客', department: '产品部', city: '广州', email: 'wangwu@example.com' },
    { name: '赵六', age: 31, role: '管理员', department: '技术部', city: '深圳', email: 'zhaoliu@example.com' },
    { name: '孙七', age: 26, role: '编辑', department: '市场部', city: '杭州', email: 'sunqi@example.com' },
    { name: '周八', age: 40, role: '访客', department: '产品部', city: '成都', email: 'zhouba@example.com' },
    { name: '吴九', age: 29, role: '管理员', department: '技术部', city: '武汉', email: 'wujiu@example.com' },
    { name: '郑十', age: 33, role: '编辑', department: '市场部', city: '南京', email: 'zhengshi@example.com' }
  ]
}

function mockBigData() {
  const rows = []
  const names = ['张三', '李四', '王五', '赵六', '孙七', '周八', '吴九', '郑十', '陈一', '刘二']
  const cities = ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '南京']
  for (let i = 0; i < 30; i++) {
    rows.push({ name: names[i % names.length] + (i + 1), age: 20 + (i % 30), city: cities[i % cities.length] })
  }
  return rows
}

export default {
  name: 'TablePage',
  components: { [NavBar.name]: NavBar },
  data() {
    return {
      basicData: mockBasicData(),
      bigData: mockBigData(),
      sortData: mockSortData(),
      filterData: mockFilterData(),
      summaryData: mockSummaryData(),
      comboData: mockComboData(),
      tooltipData: [
        { name: '张三', longText: '这是一段非常非常长的文本，用来演示 show-overflow-tooltip 功能，超出部分会显示省略号并在悬浮时弹出完整内容提示' },
        { name: '李四', longText: 'Element UI 的 el-table 组件提供了 show-overflow-tooltip 属性来处理内容溢出的情况' }
      ],
      spanData: [
        { name: '张三', role: '管理员', department: '技术部', city: '北京' },
        { name: '李四', role: '管理员', department: '技术部', city: '上海' },
        { name: '王五', role: '编辑', department: '市场部', city: '广州' },
        { name: '赵六', role: '编辑', department: '市场部', city: '深圳' },
        { name: '孙七', role: '访客', department: '产品部', city: '杭州' }
      ],
      selectionRows: [],
      lastEvent: '',
      selectionEventLog: '',
      controlledExpandKeys: [],
      currentKeyName: '',
      roleFilters: [
        { text: '管理员', value: '管理员' },
        { text: '编辑', value: '编辑' },
        { text: '访客', value: '访客' }
      ],
      deptFilters: [
        { text: '技术部', value: '技术部' },
        { text: '市场部', value: '市场部' },
        { text: '产品部', value: '产品部' }
      ],
      demoData: [],
      complexHeaderData: [
        { date: '2024-01-15', name: '张三', province: '浙江', city: '杭州', district: '西湖区', remark: '已签收' },
        { date: '2024-01-16', name: '李四', province: '江苏', city: '南京', district: '鼓楼区', remark: '配送中' },
        { date: '2024-01-17', name: '王五', province: '广东', city: '广州', district: '天河区', remark: '已签收' },
        { date: '2024-01-18', name: '赵六', province: '浙江', city: '宁波', district: '海曙区', remark: '待发货' }
      ],
      fixedData: (() => {
        const names = ['张三', '李四', '王五', '赵六', '孙七', '周八', '吴九', '郑十']
        const depts = ['技术部', '市场部', '产品部', '运营部']
        const roles = ['管理员', '编辑', '访客']
        const cities = ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '南京']
        return Array.from({ length: 20 }, (_, i) => ({
          name: names[i % names.length],
          age: 22 + (i % 25),
          gender: i % 2 === 0 ? '男' : '女',
          phone: `1380013${String(i).padStart(4, '0')}`,
          email: `user${i + 1}@example.com`,
          address: `${cities[i % cities.length]}市XX区XX路${i + 1}号`,
          department: depts[i % depts.length],
          role: roles[i % roles.length],
          status: i % 3 === 0 ? '启用' : '停用'
        }))
      })()
    }
  },
  methods: {
    onSortChange({ prop, order }) {
      Toast(`排序: ${prop} ${order || '无'}`)
    },
    onFilterChange(filters) {
      Toast(`筛选变更`)
    },
    onSelectionChange(rows) {
      this.selectionRows = rows
    },
    onEvent(type, row) {
      this.lastEvent = `${type}: ${row.name}`
    },
    getCellClass({ row, column }) {
      if (column.property === 'age' && row.age > 30) return 'age-high'
      return ''
    },
    getHeaderClass({ column }) {
      if (column.property === 'age') return 'header-highlight'
      return ''
    },
    getRowStyle({ rowIndex }) {
      if (rowIndex === 0) return { fontWeight: 'bold' }
      return {}
    },
    customSummary({ columns, data }) {
      return columns.map((col, index) => {
        if (index === 0) return '合计'
        let allNaN = true
        let sum = 0
        data.forEach(item => {
          const num = Number(item[col.prop])
          if (!isNaN(num)) {
            allNaN = false
            sum += num
          }
        })
        if (allNaN) return ''
        if (col.prop === 'price') return sum + '元'
        if (col.prop === 'quantity') return sum + '件'
        if (col.prop === 'total') return sum + '元'
        return sum
      })
    },
    toggleSecondRow() {
      if (this.basicData.length > 1) {
        this.$refs.selectionTable.toggleRowSelection(this.basicData[1])
      }
    },
    addDemoRow() {
      this.demoData = [{ name: '新增', age: 20, city: '成都' }]
    },
    onCurrentChange(row) {
      this.lastEvent = 'current-change: ' + (row ? row.name : '无')
    },
    canSelect(row) {
      return row.age > 25
    },
    formatName(row, col, val, index) {
      return (index + 1) + '. ' + val
    },
    getHeaderCellStyle({ column }) {
      if (column.property === 'age') return { color: '#409eff', fontWeight: 'bold' }
      return {}
    },
    getCellStyleFn({ row, column }) {
      if (column.property === 'age' && row.age > 30) return { color: '#f56c6c', fontWeight: '600' }
      return {}
    },
    onSelectEvent(selection, row) {
      this.selectionEventLog = `select: ${row.name}, 当前选中 ${selection.length} 行`
    },
    onSelectAllEvent(selection) {
      this.selectionEventLog = `select-all: ${selection.length} 行`
    },
    getRowClassNameFn({ rowIndex }) {
      if (rowIndex === 0) return 'first-row-bold'
      if (rowIndex % 2 === 1) return 'odd-row-highlight'
      return ''
    },
    spanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        if (rowIndex === 0) return { rowspan: 2, colspan: 1 }
        if (rowIndex === 1) return { rowspan: 0, colspan: 0 }
        if (rowIndex === 2) return { rowspan: 2, colspan: 1 }
        if (rowIndex === 3) return { rowspan: 0, colspan: 0 }
      }
      if (columnIndex === 2) {
        if (rowIndex === 0) return { rowspan: 2, colspan: 1 }
        if (rowIndex === 1) return { rowspan: 0, colspan: 0 }
        if (rowIndex === 2) return { rowspan: 2, colspan: 1 }
        if (rowIndex === 3) return { rowspan: 0, colspan: 0 }
      }
    },
    fixedCellClass({ row, column }) {
      if (column.property === 'age' && row.age > 35) return 'cell-danger'
      if (column.property === 'status' && row.status === '启用') return 'cell-success'
      return ''
    },
    fixedCellStyle({ row, column }) {
      if (column.property === 'name') return { fontWeight: 'bold', color: '#409eff' }
      if (column.property === 'status' && row.status === '停用') return { color: '#f56c6c' }
      return {}
    },
    fixedRowClass({ rowIndex }) {
      if (rowIndex % 4 === 0) return 'row-info-bg'
      return ''
    }
  }
}
</script>

<style scoped>
.page-table-demo {
  min-height: 100vh;
  background: #f7f8fa;
  padding-bottom: 20px;
}
.section {
  margin: 12px 16px;
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 4px rgba(0,0,0,.04);
}
.section-title {
  font-size: 15px;
  font-weight: 600;
  color: #323233;
  margin-bottom: 4px;
}
.section-desc {
  font-size: 12px;
  color: #909399;
  margin-bottom: 12px;
}
.expand-content {
  padding: 12px 20px;
  background: #f5f7fa;
  border-radius: 4px;
}
.expand-content p {
  margin: 4px 0;
  font-size: 13px;
  color: #606266;
}
</style>

<style>
.age-high { color: #f56c6c; font-weight: 600; }
.header-highlight { color: #409eff; }
.custom-row { font-style: italic; }
.first-row-bold td { font-weight: 700 !important; }
.odd-row-highlight { background: #ecf5ff !important; }
.demo-header-row th { font-size: 15px !important; letter-spacing: 1px; }
.cell-danger { color: #f56c6c; font-weight: 600; }
.cell-success { color: #67c23a; font-weight: 600; }
.row-info-bg td { background: #f0f9ff !important; }
</style>
