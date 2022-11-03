import { useState } from '../lib'

describe('hooks-core', () => {
  test('useState：定义响应式变量，值修改和回调修改', async () => {
    const [state, setState] = useState(0)
    expect(state.value).toBe(0)

    setState(++state.value)
    expect(state.value).toBe(1)

    setState(v => ++v)
    expect(state.value).toBe(2)
  })
});

describe('hooks-event', () => {
  
});
