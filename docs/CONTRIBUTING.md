# 贡献指南

感谢您对 Deep Reading Analyst 项目的关注！本文档提供完整的 Git 工作流和代码贡献指南。

---

## 目录

- [开始之前](#开始之前)
- [Git 工作流](#git-工作流)
- [分支策略](#分支策略)
- [提交规范](#提交规范)
- [代码审查](#代码审查)
- [发布流程](#发布流程)

---

## 开始之前

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0
- Git >= 2.30.0

### Fork 和克隆仓库

```bash
# 1. Fork 仓库到你的 GitHub 账号

# 2. 克隆你的 Fork
git clone https://github.com/YOUR_USERNAME/depreanalyst-Vue.git
cd depreanalyst-Vue

# 3. 添加上游仓库
git remote add upstream https://github.com/ORIGINAL_OWNER/depreanalyst-Vue.git

# 4. 安装依赖
npm install

# 5. 启动开发服务器
npm run dev
```

---

## Git 工作流

### 基本流程

```bash
# 1. 确保在最新的 develop 分支
git checkout develop
git pull upstream develop

# 2. 创建功能分支
git checkout -b feature/your-feature-name

# 3. 进行开发
# ... 编写代码 ...

# 4. 提交更改
git add .
git commit -m "feat(scope): 添加新功能"

# 5. 推送到你的 Fork
git push origin feature/your-feature-name

# 6. 在 GitHub 上创建 Pull Request
# 从 your-fork/feature/your-feature-name 到 upstream/develop
```

### 保持分支同步

```bash
# 定期同步上游更改
git fetch upstream
git checkout develop
git merge upstream/develop
git push origin develop

# 更新你的功能分支
git checkout feature/your-feature-name
git rebase develop
git push origin feature/your-feature-name --force
```

---

## 分支策略

### 分支类型

```
main              # 生产分支（仅通过 PR 合并）
  ↓
develop           # 开发分支（默认分支）
  ↓
feature/*         # 功能分支
bugfix/*          # 修复分支
hotfix/*          # 紧急修复分支
release/*         # 发布分支
```

### 分支命名规范

#### feature/* - 新功能

```bash
# 格式: feature/简短描述
git checkout -b feature/add-search-function
git checkout -b feature/framework-filter
git checkout -b feature/export-analysis
```

#### bugfix/* - Bug 修复

```bash
# 格式: bugfix/简短描述
git checkout -b bugfix/fix-navigation-menu
git checkout -b bugfix/case-filter-error
git checkout -b bugfix/mobile-layout
```

#### hotfix/* - 紧急修复

```bash
# 格式: hotfix/简短描述
# 从 main 分支创建
git checkout main
git checkout -b hotfix/security-patch
git checkout -b hotfix/critical-bug
```

#### release/* - 发布准备

```bash
# 格式: release/版本号
git checkout -b release/1.0.0
git checkout -b release/1.1.0
```

### 分支生命周期

```bash
# 1. 创建分支
git checkout -b feature/new-feature

# 2. 开发和提交
git add .
git commit -m "feat: 实现新功能"

# 3. 推送到远程
git push origin feature/new-feature

# 4. 创建 Pull Request

# 5. 代码审查和修改

# 6. 合并到 develop
# 在 GitHub 上通过 PR 合并

# 7. 删除分支
git branch -d feature/new-feature
git push origin --delete feature/new-feature
```

---

## 提交规范

### Conventional Commits

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范。

### 提交格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 类型

| Type | 说明 | 示例 |
|------|------|------|
| **feat** | 新功能 | `feat(framework): 添加新的思维框架` |
| **fix** | 修复 Bug | `fix(navigation): 修复移动端菜单不显示` |
| **docs** | 文档更新 | `docs(readme): 更新安装说明` |
| **style** | 代码格式 | `style(button): 统一按钮间距` |
| **refactor** | 代码重构 | `refactor(case-library): 优化筛选逻辑` |
| **perf** | 性能优化 | `perf(router): 启用路由懒加载` |
| **test** | 测试相关 | `test(quality): 添加质量检查单元测试` |
| **chore** | 构建/工具 | `chore(deps): 更新依赖版本` |
| **revert** | 回退提交 | `revert: feat(framework): 添加新框架` |

### Scope 范围

常用范围：

- `framework` - 思维框架相关
- `case` - 案例库相关
- `quality` - 质量检查相关
- `navigation` - 导航组件
- `button` - 按钮组件
- `card` - 卡片组件
- `router` - 路由配置
- `build` - 构建配置
- `deps` - 依赖管理

### Subject 主题

- 使用祈使句，现在时："添加"而非"已添加"或"添加了"
- 首字母小写
- 结尾不加句号
- 简洁明了（50 字符以内）

### 完整示例

```bash
# 简单提交
git commit -m "feat(framework): 添加 SWOT 分析框架"
git commit -m "fix(navigation): 修复响应式菜单切换问题"
git commit -m "docs(readme): 更新快速开始指南"

# 带详细说明的提交
git commit -m "feat(case): 添加案例筛选功能

- 支持按 level 筛选
- 支持按 scenario 筛选
- 添加重置按钮

Closes #123"

# 包含 Breaking Change
git commit -m "feat(api): 修改框架数据结构

BREAKING CHANGE: frameworks.json 结构已更新
需要更新所有读取框架数据的组件"
```

### 提交前检查

```bash
# 1. 运行 lint 检查
npm run lint

# 2. 运行测试
npm test

# 3. 确保构建成功
npm run build

# 4. 查看更改
git diff

# 5. 添加文件
git add .

# 6. 提交
git commit -m "feat(scope): 提交信息"
```

---

## 代码审查

### Pull Request 规范

#### PR 标题

遵循提交规范：

```
feat(framework): 添加新的思维框架选择器
fix(navigation): 修复移动端菜单显示问题
docs(claude): 更新开发指南
```

#### PR 描述模板

```markdown
## 变更类型

- [ ] 新功能 (feat)
- [ ] Bug 修复 (fix)
- [ ] 文档更新 (docs)
- [ ] 代码重构 (refactor)
- [ ] 性能优化 (perf)
- [ ] 测试相关 (test)
- [ ] 构建/工具 (chore)

## 变更说明

简要描述此 PR 的目的和实现方式。

## 相关 Issue

Closes #123
Fixes #456

## 测试

- [ ] 已添加单元测试
- [ ] 已添加 E2E 测试
- [ ] 已通过所有测试
- [ ] 已手动测试

## 检查清单

- [ ] 代码遵循项目规范
- [ ] 已运行 `npm run lint`
- [ ] 已运行 `npm test`
- [ ] 已运行 `npm run build`
- [ ] 已更新相关文档
- [ ] 提交信息遵循 Conventional Commits

## 截图（如适用）

如果是 UI 更改，请提供截图或 GIF。

## 额外说明

其他需要审查者注意的事项。
```

### 审查者检查清单

- [ ] 代码符合项目规范
- [ ] 遵循 Design Tokens 系统
- [ ] 使用 Composition API
- [ ] 组件使用 `<style scoped>`
- [ ] 路由使用懒加载
- [ ] 无硬编码样式值
- [ ] 变量命名清晰
- [ ] 无不必要的依赖
- [ ] 测试覆盖充分
- [ ] 文档已更新

### 审查流程

```bash
# 1. 检出 PR 分支
git fetch upstream pull/ID/head:pr-ID
git checkout pr-ID

# 2. 安装依赖
npm install

# 3. 运行检查
npm run lint
npm test
npm run build

# 4. 启动开发服务器测试
npm run dev

# 5. 在 GitHub 上提供反馈
# - 批准 (Approve)
# - 请求更改 (Request changes)
# - 评论 (Comment)
```

---

## 发布流程

### 版本号规范

遵循 [Semantic Versioning](https://semver.org/)：

```
MAJOR.MINOR.PATCH

1.0.0  # 首次发布
1.1.0  # 新增功能（向后兼容）
1.1.1  # Bug 修复（向后兼容）
2.0.0  # 破坏性更改（不兼容旧版本）
```

### 发布步骤

#### 1. 创建 Release 分支

```bash
# 从 develop 创建
git checkout develop
git pull upstream develop
git checkout -b release/1.0.0
```

#### 2. 更新版本号

```bash
# 更新 package.json 版本号
npm version 1.0.0

# 手动更新其他文件中的版本号
# - CLAUDE.md
# - README.md
# - CHANGELOG.md
```

#### 3. 更新 CHANGELOG

```bash
# 编辑 CHANGELOG.md
## [1.0.0] - 2025-12-29

### Added
- 新增框架选择器功能
- 新增案例库筛选

### Changed
- 优化导航栏响应式布局

### Fixed
- 修复移动端菜单显示问题
```

#### 4. 提交并推送

```bash
git add .
git commit -m "chore(release): 准备 1.0.0 发布"
git push origin release/1.0.0
```

#### 5. 创建 PR

- 从 `release/1.0.0` 到 `main`
- 从 `release/1.0.0` 到 `develop`

#### 6. 合并后打标签

```bash
git checkout main
git pull upstream main
git tag -a v1.0.0 -m "Release 1.0.0"
git push upstream v1.0.0
```

#### 7. GitHub Release

在 GitHub 上创建 Release:
- Tag: v1.0.0
- Title: Release 1.0.0
- Description: 复制 CHANGELOG 内容

---

## 常见问题

### Q: 如何撤销提交？

```bash
# 撤销最后一次提交（保留更改）
git reset --soft HEAD~1

# 撤销最后一次提交（丢弃更改）
git reset --hard HEAD~1

# 修改最后一次提交信息
git commit --amend
```

### Q: 如何解决合并冲突？

```bash
# 1. 拉取最新代码
git pull upstream develop

# 2. 如果有冲突，Git 会提示
# 手动编辑冲突文件

# 3. 标记为已解决
git add <conflicted-files>

# 4. 完成合并
git commit
```

### Q: 如何同步 Fork？

```bash
# 方法 1: 通过命令行
git fetch upstream
git checkout develop
git merge upstream/develop
git push origin develop

# 方法 2: 通过 GitHub
# 在 GitHub 页面点击 "Sync fork" 按钮
```

---

## 获得帮助

- 查看 [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- 查看 [DEVELOPMENT.md](./DEVELOPMENT.md)
- 提交 Issue
- 加入讨论区

---

**感谢您的贡献！** 🎉
