import { useState } from '../lib'

describe('hooks-core', () => {
  it('useState: init', () => {
    const [state] = useState(0)
    expect(state.value).toBe(0)
  })
  
  it('useState: 值修改', () => {
    const [state, setState] = useState<number | string>(0)
    setState('test')
    expect(state.value).toBe('test')
  })

  it('useState: 回调修改', () => {
    const [state, setState] = useState<number | string>(0)
    setState((c) => 'test')
    expect(state.value).toBe('test')
  })

  it('useEffect', () => {
    // 测试用例不会写
  })
});

describe('hooks-event', () => {
  
});
