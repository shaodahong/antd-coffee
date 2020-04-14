---
group:
  title: Components
  path: /components
---

# Form

对 Form 增强，支持 `items` 配置模式，方便增删改查。

特点：

- [x] 快速的进行只读、编辑和混合模式切换
- [x] 支持**可复用**的对输入和输出过滤
- [x] 可以根据条件渲染表单项
- [x] 傻瓜式布局，默认单行，可以任意多行且支持响应式切换

### 使用

#### 默认模式

<code src="./demo/base.tsx" />

#### 只读模式

<code src="./demo/viewDemo.tsx" />

#### 混合模式

<code src="./demo/multipleModeDemo.tsx" />

#### 格式化输入输出

<code src="./demo/pipeline.tsx" />

#### 条件隐藏

<code src="./demo/isHidden.tsx" />

#### 多种布局

<code src="./demo/layoutCol.tsx" />

### 参数

| 属性          | 描述                                                  | 类型                                                | 默认值         |
| ------------- | ----------------------------------------------------- | --------------------------------------------------- | -------------- |
| items         | 表单项                                                | `[]FormItem`                                        | -              |
| isView        | 是否只读                                              | `boolean`                                           | `false`        |
| layoutCol     | 布局                                                  | [ColProps](https://ant.design/components/grid/#Col) | `{ span: 24 }` |
| initialValues | 初始化值，只会触发一次，支持 `Promise` 从接口拿到数据 | `Store \| (() => Promise<Store>)`                   | -              |

#### FormItem

| 属性       | 描述               | 类型                                                           | 默认值                       |
| ---------- | ------------------ | -------------------------------------------------------------- | ---------------------------- |
| render     | 编辑模式下渲染方法 | `(fieldValue: StoreValue, fieldsValue: Store) => ReactElement` | `() => <Input allowClear />` |
| renderView | 只读模式下渲染方法 | `(fieldValue: StoreValue, fieldsValue: Store) => ReactNode`    | `fieldValue`                 |
| isView     | 是否只读           | `boolean`                                                      | Form `isView`                |
| pipeline   | 输入输出过滤       | `OutputPipeline \| [InputPipeline, OutputPipeline]`            | -                            |
| isHidden   | 是否隐藏           | `(fieldValue: StoreValue, fieldsValue: Store) => boolean`      | -                            |
| layoutCol  | 布局               | [ColProps](https://ant.design/components/grid/#Col)            | Form `layoutCol`             |
| extraNames | 额外的 name        | `NamePath[]`                                                   | -                            |
