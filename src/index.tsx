import React from 'react'
import { render } from 'react-dom'

render(<div>hello world</div>, document.getElementById('root'))

if (process.env.NODE_ENV === 'development' && module.hot) {
  // eslint-disable-next-line no-unused-expressions
  module.hot && module.hot.accept()
}
