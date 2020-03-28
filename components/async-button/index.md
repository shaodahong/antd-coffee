import AsyncButton from './index.tsx'

# AsyncButton

简化异步操作的 `loading` 处理， `onClick` 返回 Promise


## 使用

<AsyncButton onClick={() => new Promise((res) => setTimeout(res, 1000))}>
Click
</AsyncButton>

```jsx
import AsyncButton from './index.tsx'

<AsyncButton>Click</AsyncButton>
```
