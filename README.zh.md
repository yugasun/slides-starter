# Slidev Starter

[English](./README.md)

一个 Slidev 入门模板，内置预制组件、统一 CLI 和多演示文稿支持。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ppt-starter/slidev-starter)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/ppt-starter/slidev-starter)

## ✨ 特性

- 🎨 **预制组件** - 封面、章节、问答、结束页开箱即用
- 📁 **多 PPT 支持** - 在一个项目中管理多个演示文稿
- 🛠️ **统一 CLI** - 单一命令接口用于开发、构建和导出
- ⚙️ **项目初始化** - 配置作者信息并自动更新组件
- 🎯 **最佳实践** - 清晰的架构，便于扩展

## 前置条件

- [Node.js](https://nodejs.org/) >= 22.x
- [Bun](https://bun.sh/) >= 1.x（或 npm/yarn/pnpm）

## 快速开始

```bash
# 安装依赖
bun install

# 初始化项目（配置作者信息）
bun run init

# 启动 demo 演示文稿
bun run dev:demo

# 或使用交互模式
bun run dev
```

## 项目初始化

运行 `bun run init` 配置你的项目：

```bash
$ bun run init

⚙️ Slidev Starter - Project Setup

👤 Author Information

  Name: 张三
  Email: zhangsan@example.com
  GitHub URL: https://github.com/zhangsan

📊 Theme Defaults

  Gradient From: blue-600
  Gradient To: cyan-600
  Q&A Subtitle: 感谢聆听！

✅ Configuration saved to slidev.config.json

📦 Updating components...
  ✅ CoverSlide.vue
  ✅ QASlide.vue
  ✅ GithubLink.vue

🎉 Project initialized successfully!
```

这将会：
- 保存配置到 `slidev.config.json`
- 更新组件默认值（GitHub URL、邮箱、主题颜色）

## 项目结构

```
├── slides/                  # 演示文稿目录
│   ├── demo.md              # Demo 演示文稿
│   └── components/          # 可复用 Vue 组件
│       ├── CoverSlide.vue   # 封面页
│       ├── SectionTitle.vue # 章节分隔页
│       ├── QASlide.vue      # 问答页
│       ├── EndSlide.vue     # 结束页
│       └── GithubLink.vue   # GitHub 链接图标
├── scripts/
│   └── cli.mjs              # 统一 CLI 工具
├── slidev.config.json       # 项目配置
├── public/                  # 静态资源
└── snippets/                # 幻灯片代码片段
```

## CLI 使用

```bash
# 初始化项目
bun run init

# 开发
bun run dev              # 交互式选择
bun run dev:demo         # 直接启动 demo

# 构建
bun run build            # 交互式选择
bun run build:all        # 构建所有演示文稿

# 导出和预览
bun run export           # 导出 PDF
bun run preview          # 预览构建结果

# 列出演示文稿
bun run list
```

### CLI 命令

| 命令            | 别名 | 描述             |
| --------------- | ---- | ---------------- |
| `init`          | `i`  | 初始化项目配置   |
| `dev [name]`    | `d`  | 启动开发服务器   |
| `build [name]`  | `b`  | 构建生产版本     |
| `export [name]` | `e`  | 导出 PDF         |
| `list`          | `ls` | 列出所有演示文稿 |

## 创建演示文稿

1. 创建 `slides/my-talk.md`：

```markdown
---
theme: default
title: 我的演讲
---

<CoverSlide 
  title="我的演讲"
  subtitle="精彩的演示文稿"
/>

---

# 第二页

内容...

---

<EndSlide title="谢谢！" />
```

2. 运行 `bun run dev` 并选择你的演示文稿

## 内置组件

### CoverSlide

```markdown
<CoverSlide 
  title="项目名称"
  subtitle="描述"
  version="1.0"
  githubUrl="https://github.com/user/repo"
/>
```

### SectionTitle

```markdown
<SectionTitle number="01" title="介绍" color="blue" />
```

### QASlide

```markdown
<QASlide title="有问题吗？" email="hi@example.com" />
```

### EndSlide

```markdown
<EndSlide title="感谢" features="快速 · 现代 · 精美" />
```

## 配置文件

`slidev.config.json`：

```json
{
  "author": {
    "name": "你的名字",
    "email": "your@email.com",
    "github": "https://github.com/username"
  },
  "defaults": {
    "gradientFrom": "blue-600",
    "gradientTo": "cyan-600",
    "qaSubtitle": "感谢聆听！"
  }
}
```

## NPM 脚本

| 脚本        | 描述             |
| ----------- | ---------------- |
| `init`      | 初始化项目配置   |
| `dev`       | 交互式开发模式   |
| `dev:demo`  | 直接启动 demo    |
| `build`     | 交互式构建       |
| `build:all` | 构建所有演示文稿 |
| `export`    | 导出 PDF         |
| `preview`   | 预览构建结果     |
| `list`      | 列出演示文稿     |

## 相关资源

- [Slidev 文档](https://sli.dev/)
- [Slidev GitHub](https://github.com/slidevjs/slidev)
- [UnoCSS](https://unocss.dev/)
- [Iconify](https://iconify.design/)

## 许可证

[Apache 2.0](./LICENSE)
