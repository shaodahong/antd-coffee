---
group:
  title: Components
  path: /components
---

## Table

### 使用

<code src="./demo/base.tsx" />

### 参数

| 属性     | 描述     | 类型                                    | 默认值 |
| -------- | -------- | --------------------------------------- | ------ |
| onSearch | 数据获取 | `() => Promise<TableData> \| TableData` | -      |

#### TableData

| 属性       | 描述     | 类型     | 默认值 |
| ---------- | -------- | -------- | ------ |
| [data]     | 数据源   | `T[]`    | -      |
| [total]    | 数据总量 | `string` | -      |
| [pageSize] | 分页大小 | `string` | 20     |
| [pageNum]  | 当前页   | `string` | -      |
