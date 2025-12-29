#!/bin/bash
# 复制父目录有价值的参考文档脚本
# 用途：将父项目中有价值的文档复制到当前项目作为参考

set -e  # 遇到错误立即退出

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Deep Reading Analyst - 复制参考文档  ${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# 获取脚本所在目录（项目根目录）
PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
PARENT_DIR="$(dirname "$PROJECT_ROOT")"

echo -e "${YELLOW}项目目录:${NC} $PROJECT_ROOT"
echo -e "${YELLOW}父目录:${NC} $PARENT_DIR"
echo ""

# 创建参考文档目录
echo -e "${BLUE}[步骤 1/4]${NC} 创建目录结构..."
mkdir -p "$PROJECT_ROOT/docs/references"
mkdir -p "$PROJECT_ROOT/skill-package"
echo -e "${GREEN}✓${NC} 目录创建完成"
echo ""

# 复制评价报告
echo -e "${BLUE}[步骤 2/4]${NC} 复制评价报告..."
if [ -f "$PARENT_DIR/docs/评价报告.md" ]; then
    cp "$PARENT_DIR/docs/评价报告.md" "$PROJECT_ROOT/docs/references/"
    echo -e "${GREEN}✓${NC} 评价报告已复制"
else
    echo -e "${YELLOW}⚠${NC} 未找到评价报告，跳过"
fi
echo ""

# 复制快速参考
echo -e "${BLUE}[步骤 3/4]${NC} 复制快速参考文档..."
if [ -f "$PARENT_DIR/docs/QUICK_REFERENCE.md" ]; then
    cp "$PARENT_DIR/docs/QUICK_REFERENCE.md" "$PROJECT_ROOT/docs/references/"
    echo -e "${GREEN}✓${NC} 快速参考已复制"
else
    echo -e "${YELLOW}⚠${NC} 未找到快速参考，跳过"
fi
echo ""

# 复制技能包
echo -e "${BLUE}[步骤 4/4]${NC} 复制 Claude Code 技能包..."
if [ -d "$PARENT_DIR/skill-package" ]; then
    cp -r "$PARENT_DIR/skill-package/"* "$PROJECT_ROOT/skill-package/" 2>/dev/null || true
    echo -e "${GREEN}✓${NC} 技能包已复制"
else
    echo -e "${YELLOW}⚠${NC} 未找到技能包目录，跳过"
fi
echo ""

# 显示复制结果
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}复制完成！${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo "已复制的文件："
echo ""
if [ -f "$PROJECT_ROOT/docs/references/评价报告.md" ]; then
    echo -e "  ${GREEN}✓${NC} docs/references/评价报告.md"
fi
if [ -f "$PROJECT_ROOT/docs/references/QUICK_REFERENCE.md" ]; then
    echo -e "  ${GREEN}✓${NC} docs/references/QUICK_REFERENCE.md"
fi
if [ -d "$PROJECT_ROOT/skill-package" ] && [ "$(ls -A $PROJECT_ROOT/skill-package)" ]; then
    echo -e "  ${GREEN}✓${NC} skill-package/ ($(ls $PROJECT_ROOT/skill-package | wc -l | tr -d ' ') 个文件)"
fi
echo ""

# 生成 .gitignore 更新建议
echo -e "${YELLOW}提示:${NC} 请检查 .gitignore 确保新文件不会被忽略"
echo ""

# 显示下一步建议
echo -e "${BLUE}下一步操作:${NC}"
echo ""
echo "  1. 查看复制的文档："
echo -e "     ${BLUE}ls -la docs/references/${NC}"
echo ""
echo "  2. 检查 Git 状态："
echo -e "     ${BLUE}git status${NC}"
echo ""
echo "  3. 提交更改："
echo -e "     ${BLUE}git add .${NC}"
echo -e "     ${BLUE}git commit -m \"docs: 添加父项目参考文档\"${NC}"
echo ""
echo -e "${GREEN}全部完成！${NC}"
