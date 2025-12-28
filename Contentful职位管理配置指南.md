# Contentful 职位管理配置指南

## 📋 待办事项清单

### ✅ 已完成
1. ✅ Careers页面已创建，包含所有必需模块
2. ✅ 员工活动照片已更新（使用About页面gallery中的照片）
3. ✅ 前端代码已准备好从Contentful读取职位数据

### 🔲 待完成

#### 1. 在Contentful中创建职位内容类型（Content Type）

**步骤：**

1. **登录Contentful后台**
   - 访问：https://www.contentful.com/
   - 登录账号（zshi@sweekli.com）
   - 选择Space：`wbpsfgfg62v2`

2. **创建新的Content Type**
   - 点击左侧菜单 "Content model"
   - 点击右上角 "Add content type"
   - Content Type ID：`jobPosting`（必须使用这个ID，代码中已配置）
   - Display name：`Job Posting` 或 `职位发布`

3. **添加字段（Fields）**

   点击 "Add field" 添加以下字段：

   | 字段ID | 字段名称 | 字段类型 | 必填 | 说明 |
   |--------|---------|---------|------|------|
   | `title` | 职位名称 | Short text | ✅ | 例如：电商运营经理 |
   | `titleEn` | 职位名称（英文） | Short text | ❌ | 可选，如果只有中文版可不填 |
   | `department` | 部门 | Short text | ✅ | 例如：运营部 |
   | `location` | 工作地点 | Short text | ✅ | 例如：上海、深圳、远程 |
   | `type` | 工作类型 | Short text | ✅ | 例如：全职、兼职、实习 |
   | `description` | 职位描述 | Long text | ✅ | 详细的职位描述 |
   | `requirements` | 任职要求 | Long text | ✅ | 任职要求列表 |
   | `isActive` | 是否开放 | Boolean | ✅ | 是否正在招聘（默认：true） |
   | `publishDate` | 发布日期 | Date & time | ❌ | 职位发布时间 |
   | `order` | 排序 | Number | ❌ | 用于控制显示顺序（数字越小越靠前） |

4. **保存Content Type**
   - 点击右上角 "Save"
   - 确保所有必填字段都已添加

#### 2. 创建职位条目（Entries）

**步骤：**

1. **进入内容管理**
   - 点击左侧菜单 "Content"
   - 选择 "Job Posting" 内容类型

2. **添加职位**
   - 点击右上角 "Add entry"
   - 选择 "Job Posting" 类型

3. **填写职位信息**
   - **Title**：职位名称（如：电商运营经理）
   - **Department**：部门（如：运营部）
   - **Location**：工作地点（如：上海）
   - **Type**：工作类型（如：全职）
   - **Description**：职位描述（详细说明）
   - **Requirements**：任职要求
   - **Is Active**：勾选（表示正在招聘）
   - **Order**：排序数字（可选，如：1、2、3）

4. **发布职位**
   - 填写完成后，点击右上角 "Publish" 按钮
   - 职位会立即在网站上显示

#### 3. 更新前端代码以从Contentful读取职位

**需要修改的文件：**
- `src/views/Careers.vue`
- `src/utils/contentful-api.ts`（需要添加获取职位的函数）
- `src/config/contentful.ts`（可能需要添加职位Content Type ID）

**具体步骤：**
1. 在 `src/utils/contentful-api.ts` 中添加 `fetchJobPostings()` 函数
2. 在 `src/views/Careers.vue` 中调用该函数，替换硬编码的职位数据
3. 测试职位数据是否正确显示

---

## 🔧 Contentful后台配置详细说明

### 当前Contentful配置

- **Space ID**：`wbpsfgfg62v2`
- **Access Token**：`DN_cZeDWpTQcwTgML-lYyvDkLOemgEAOcQXsIlcACsk`
- **Environment**：`master`
- **现有Content Type**：`blogPost`（博客文章）

### 需要新增的Content Type

**Content Type ID**：`jobPosting`（必须使用这个ID）

**字段配置示例：**

```
Content Type: Job Posting
├── title (Short text, Required)
│   └── 职位名称
├── titleEn (Short text, Optional)
│   └── 职位名称（英文）
├── department (Short text, Required)
│   └── 部门
├── location (Short text, Required)
│   └── 工作地点
├── type (Short text, Required)
│   └── 工作类型（全职/兼职/实习）
├── description (Long text, Required)
│   └── 职位描述
├── requirements (Long text, Required)
│   └── 任职要求
├── isActive (Boolean, Required, Default: true)
│   └── 是否正在招聘
├── publishDate (Date & time, Optional)
│   └── 发布日期
└── order (Number, Optional)
    └── 排序（数字越小越靠前）
```

### 字段类型说明

- **Short text**：短文本，用于标题、名称等
- **Long text**：长文本，用于描述、要求等
- **Boolean**：布尔值，用于开关（是否开放）
- **Date & time**：日期时间，用于发布日期
- **Number**：数字，用于排序

---

## 📝 职位数据示例

### 示例1：电商运营经理

```
Title: 电商运营经理
Department: 运营部
Location: 上海
Type: 全职
Description: 
负责天猫、京东等电商平台的日常运营工作，包括商品上架、价格管理、活动策划等。

Requirements:
- 3年以上电商运营经验
- 熟悉天猫、京东等平台规则
- 具备数据分析能力
- 良好的沟通协调能力

Is Active: ✅
Order: 1
```

### 示例2：品牌营销专员

```
Title: 品牌营销专员
Department: 市场部
Location: 上海
Type: 全职
Description:
负责品牌营销策略制定和执行，包括社交媒体运营、内容创作、KOL合作等。

Requirements:
- 2年以上品牌营销经验
- 熟悉小红书、抖音等平台
- 具备内容创作能力
- 英语读写能力良好

Is Active: ✅
Order: 2
```

---

## 🚀 后续开发工作

### 前端代码更新（开发团队完成）

1. **添加职位获取函数**
   - 文件：`src/utils/contentful-api.ts`
   - 函数：`fetchJobPostings()`
   - 功能：从Contentful获取所有已发布的职位

2. **更新Careers页面**
   - 文件：`src/views/Careers.vue`
   - 修改：将硬编码的 `positions` 数组改为从Contentful动态获取
   - 添加：加载状态和错误处理

3. **更新配置文件（如需要）**
   - 文件：`src/config/contentful.ts`
   - 添加：`jobPostingContentTypeId: 'jobPosting'`

---

## ⚠️ 注意事项

1. **Content Type ID必须匹配**
   - 前端代码中使用的Content Type ID是 `jobPosting`
   - 在Contentful中创建时必须使用相同的ID

2. **字段ID必须匹配**
   - 前端代码中使用的字段ID必须与Contentful中的字段ID完全一致
   - 字段ID区分大小写

3. **发布后才能显示**
   - 职位必须发布（Publish）后才会在网站上显示
   - 草稿状态（Draft）不会显示

4. **Is Active字段**
   - 如果 `isActive` 为 `false`，职位不会显示在网站上
   - 可以用来暂时隐藏某个职位

5. **排序功能**
   - 如果设置了 `order` 字段，职位会按数字从小到大排序
   - 如果没有设置，按创建时间倒序显示

---

## 📞 需要帮助？

如果在配置过程中遇到问题，可以：
1. 查看Contentful官方文档：https://www.contentful.com/developers/docs/
2. 联系开发团队获取技术支持

---

**最后更新**：2025年1月

