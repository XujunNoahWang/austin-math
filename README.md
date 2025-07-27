# Austin Math - 数学练习生成器

[English](#english) | [中文](#中文)

---

## 中文

### 📋 项目简介

Austin Math 是一个专为幼儿园儿童设计的数学练习题生成器。它能够生成自定义的加法和减法题目，支持中英文双语界面，具有打印友好的布局设计。

### ✨ 主要功能

- **智能题目生成**：自动生成加法和减法练习题
- **灵活配置选项**：
  - 自定义题目数量（1-100题）
  - 选择题目类型（加法/减法/混合）
  - 设置答案范围（支持负数答案）
  - 支持2-3个操作数的题目（80%两个数，20%三个数）
- **响应式设计**：
  - 桌面端：可设置每行1-4题的布局
  - 移动端：自适应单列布局
- **双语支持**：中文/英文界面切换
- **打印优化**：专门优化的打印样式，A4纸张友好
- **离线使用**：纯前端应用，无需网络连接

### 🚀 快速开始

#### 前置要求

- Node.js (推荐 16.0 或更高版本)
- npm 或 yarn

#### 安装步骤

1. **克隆仓库**
   ```bash
   git clone https://github.com/XujunNoahWang/austin-math.git
   cd austin-math
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发服务器**
   ```bash
   npm start
   ```

4. **打开浏览器访问**
   ```
   http://localhost:3000
   ```

#### 构建生产版本

```bash
npm run build
```

构建后的文件将在 `build` 文件夹中生成。

### 🛠️ 技术栈

- **前端框架**：React 18 + TypeScript
- **样式**：Tailwind CSS
- **构建工具**：Create React App
- **部署**：支持 Vercel、Netlify 等静态部署平台

### 📖 使用说明

1. **设置题目参数**：
   - 选择题目数量
   - 设定题目类型（加法、减法或混合）
   - 决定是否允许负数答案
   - 选择是否包含三个数字的题目
   - 设置每行显示的题目数量（桌面端）

2. **生成题目**：
   - 点击"生成题目"按钮
   - 系统会自动生成符合条件的数学题

3. **打印练习**：
   - 点击"打印题目"按钮
   - 浏览器会打开打印预览
   - 支持 A4 纸张，布局已优化

4. **重新生成**：
   - 点击"再次生成"获得新的题目组合
   - 或返回设置页面修改参数

### 🎯 题目特色

- **智能算法**：确保题目具有适当的复杂度
- **避重机制**：同一配置下不会生成重复题目
- **难度平衡**：80%需要复杂计算，20%简单题目
- **质量控制**：
  - 排除过于简单的整十数运算
  - 避免重复数字（如11, 22, 33）
  - 确保操作数之间有适当差异

### 📱 设备兼容性

- **桌面端**：Chrome, Firefox, Safari, Edge
- **移动端**：iOS Safari, Android Chrome
- **打印**：所有现代浏览器的打印功能

### 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

### 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

### 👨‍💻 作者

- **Noah Wang** - *初始开发* - [XujunNoahWang](https://github.com/XujunNoahWang)

---

## English

### 📋 Project Description

Austin Math is a math problem generator designed specifically for kindergarten children. It generates customizable addition and subtraction problems with bilingual interface support and print-friendly layout design.

### ✨ Key Features

- **Smart Problem Generation**: Automatically generates addition and subtraction practice problems
- **Flexible Configuration Options**:
  - Customize problem count (1-100 problems)
  - Choose problem types (addition/subtraction/mixed)
  - Set answer ranges (supports negative answers)
  - Support 2-3 operand problems (80% two numbers, 20% three numbers)
- **Responsive Design**:
  - Desktop: Configurable 1-4 problems per row layout
  - Mobile: Adaptive single-column layout
- **Bilingual Support**: Chinese/English interface switching
- **Print Optimized**: Specially optimized print styles, A4 paper friendly
- **Offline Usage**: Pure frontend application, no network connection required

### 🚀 Quick Start

#### Prerequisites

- Node.js (recommended 16.0 or higher)
- npm or yarn

#### Installation Steps

1. **Clone Repository**
   ```bash
   git clone https://github.com/XujunNoahWang/austin-math.git
   cd austin-math
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```

4. **Open Browser**
   ```
   http://localhost:3000
   ```

#### Build for Production

```bash
npm run build
```

Built files will be generated in the `build` folder.

### 🛠️ Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Create React App
- **Deployment**: Supports Vercel, Netlify and other static deployment platforms

### 📖 Usage Instructions

1. **Set Problem Parameters**:
   - Choose number of problems
   - Set problem types (addition, subtraction, or mixed)
   - Decide whether to allow negative answers
   - Choose whether to include three-number problems
   - Set number of problems per row (desktop)

2. **Generate Problems**:
   - Click "Generate Problems" button
   - System will automatically generate qualifying math problems

3. **Print Practice**:
   - Click "Print Problems" button
   - Browser will open print preview
   - Supports A4 paper with optimized layout

4. **Regenerate**:
   - Click "Generate Again" for new problem combinations
   - Or return to settings page to modify parameters

### 🎯 Problem Features

- **Smart Algorithm**: Ensures problems have appropriate complexity
- **Duplicate Avoidance**: Won't generate duplicate problems under same configuration
- **Difficulty Balance**: 80% require complex calculations, 20% simple problems
- **Quality Control**:
  - Excludes overly simple round number operations
  - Avoids repeated digits (like 11, 22, 33)
  - Ensures appropriate differences between operands

### 📱 Device Compatibility

- **Desktop**: Chrome, Firefox, Safari, Edge
- **Mobile**: iOS Safari, Android Chrome
- **Print**: All modern browser print functions

### 🤝 Contributing

Issues and Pull Requests are welcome!

1. Fork this repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### 👨‍💻 Author

- **Noah Wang** - *Initial Development* - [XujunNoahWang](https://github.com/XujunNoahWang)

---

### 🌟 Star History

If you find this project helpful, please consider giving it a star! ⭐

### 📧 Contact

For questions or suggestions, please feel free to open an issue or contact the author.