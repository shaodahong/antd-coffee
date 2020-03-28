import Form from './index.tsx'
import {DatePicker, Switch, Button} from 'antd'

# Form

对 Form 扩展，支持 `items` 模式，方便增删改查。

## 使用

### 默认模式

<Form
  items={[
    { name: 'name', label: '姓名', required: true },
    {
      name: 'age',
      label: '年龄',
      rules: [{ required: true, message: '请输入年龄' }],
    },
    { name: 'birthday', label: '出生年月', render: () => <DatePicker /> },
    { name: 'hasJob', label: '已就业', render: () => <Switch /> },
  ]}
>
  <Button type="primary" htmlType="submit">
    提交
  </Button>
</Form>

### 只读模式

<Form
  isView
  initialValues={{ name: 'Ant Design Admin', age: 8, birthday: '2010-01-01', hasJob: 1 }}
  items={[
    { name: 'name', label: '姓名' },
    { name: 'age', label: '年龄' },
    { name: 'birthday', label: '出生年月', render: () => <DatePicker /> },
    { name: 'hasJob', label: '已就业', render: () => <Switch /> },
  ]}
/>

### 混合模式

<Form
  initialValues={{name: 'Ant Design Admin', age: 8 }}
  items={[
    { name: 'name', label: '姓名', isView: true },
    { name: 'age', label: '年龄', isView: true },
    { name: 'birthday', label: '出生年月', render: () => <DatePicker /> },
    { name: 'hasJob', label: '已就业', render: () => <Switch /> },
  ]}
>
  <Button type="primary" htmlType="submit">
    提交
  </Button>
</Form>
