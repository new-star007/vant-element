import { defineUserConfig } from 'vuepress'
import { webpackBundler } from '@vuepress/bundler-webpack'
import { defaultTheme } from '@vuepress/theme-default'
import { searchPlugin } from '@vuepress/plugin-search'
import { gitPlugin } from '@vuepress/plugin-git'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'Vant Element',
  description: '基于 Vant 的 Element-UI 兼容组件库',

  bundler: webpackBundler(),

  head: [
    ['link', { rel: 'icon', href: '/icon.png' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ],

  theme: defaultTheme({
    logo: '/logo.png',
    repo: 'https://github.com/your-org/vant-element',
    docsDir: 'docs',

    navbar: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/' },
      { text: '示例', link: '/examples/' },
    ],

    sidebarDepth: 0,

    sidebar: {
      '/guide/': [
        '/guide/README.md',
        '/guide/getting-started.md',
      ],
      '/examples/': [
        '/examples/README.md',
        '/examples/user-list.md',
        '/examples/user-table.md',
      ],
      '/components/': [
        {
          text: 'Basic 基础',
          collapsible: true,
          children: [
            '/components/button.md',
            '/components/button-group.md',
            '/components/icon.md',
            '/components/image.md',
            '/components/layout.md',
            '/components/card.md',
            '/components/divider.md',
            '/components/link.md',
            '/components/spinner.md',
          ],
        },
        {
          text: 'Form 表单',
          collapsible: true,
          children: [
            '/components/input.md',
            '/components/input-number.md',
            '/components/radio.md',
            '/components/checkbox.md',
            '/components/select.md',
            '/components/cascader.md',
            '/components/switch.md',
            '/components/slider.md',
            '/components/date-picker.md',
            '/components/time-picker.md',
            '/components/upload.md',
            '/components/rate.md',
            '/components/form.md',
            '/components/autocomplete.md',
            '/components/time-select.md',
          ],
        },
        {
          text: 'Data 数据',
          collapsible: true,
          children: [
            '/components/table.md',
            '/components/list.md',
            '/components/list-page.md',
            '/components/descriptions.md',
            '/components/badge.md',
            '/components/tag.md',
            '/components/pagination.md',
            '/components/skeleton.md',
            '/components/progress.md',
            '/components/empty.md',
            '/components/carousel.md',
            '/components/backtop.md',
            '/components/calendar.md',
          ],
        },
        {
          text: 'Navigation 导航',
          collapsible: true,
          children: [
            '/components/tabs.md',
            '/components/steps.md',
            '/components/collapse.md',
            '/components/dropdown.md',
          ],
        },
        {
          text: 'Feedback 反馈',
          collapsible: true,
          children: [
            '/components/alert.md',
            '/components/message.md',
            '/components/message-box.md',
            '/components/notification.md',
            '/components/dialog.md',
            '/components/popover.md',
            '/components/loading.md',
            '/components/drawer.md',
            '/components/popconfirm.md',
            '/components/tooltip.md',
          ],
        },
      ],
    },
  }),

  plugins: [
    searchPlugin({
      locales: {
        '/': {
          placeholder: '搜索文档',
        },
      },
    }),
    gitPlugin({
      createdTime: true,
      updatedTime: true,
      contributors: true,
    }),
  ],
})
