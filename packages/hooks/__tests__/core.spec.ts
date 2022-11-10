import { render, screen, fireEvent} from '@testing-library/vue'
import { useEffect, useState } from '../src/package'
import useWatch from '../src/package/core/useWatch';


describe('useState', () => {
  test('定义响应式变量，值修改和回调修改', () => {
    const [state, setState] = useState(0)
    expect(state.value).toBe(0)

    setState(++state.value)
    expect(state.value).toBe(1)

    setState(() => 2)
    expect(state.value).toBe(2)
  })
});

describe('useEffect', () => {
  test('生命周期挂载与卸载，监听实现', async () => {
    const TestComponetn = {
      template: `
        <p>Times clicked: {{state}}</p>
        <button @click="increment">increment</button>
      `,
      setup() {
        const [state, setState] = useState(0)
        
        const [count, setCount] = useState(0)
        useEffect(() => {
          setState(++state.value)
        }, [count])

        function increment() {
          setCount(++count.value)
        }

        return {state, increment}
      }
    };

    render(TestComponetn)

    // 初始化
    expect(screen.queryByText('Times clicked: 0')).toBeTruthy()

    // 监听触发
    const button = screen.getByText('increment')

    // Click a couple of times.
    await fireEvent.click(button)
    await fireEvent.click(button)
  
    expect(screen.queryByText('Times clicked: 3')).toBeTruthy()
  })
});

describe('useWatch', () => {
  test('Wacth 监听', async () => {
    const [state, setState] = useState(0)

    let test = 0
    useWatch(() => {
      test = state.value
    }, [state])

    // 等待一下， watch监听触发有延迟
    await setState( () => 1 )

    expect(test).toBe(1)
  })
});
