import { render, screen, fireEvent} from '@testing-library/vue'
import { useEffect, useState, useCountdown } from '../lib'

describe('hooks-core', () => {
  test('useState：定义响应式变量，值修改和回调修改', () => {
    const [state, setState] = useState(0)
    expect(state.value).toBe(0)

    setState(++state.value)
    expect(state.value).toBe(1)

    setState(v => ++v)
    expect(state.value).toBe(2)
  })

  test('useEffect：生命周期挂载与卸载，监听实现', async () => {

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

describe('hooks-event', () => {
  test('useInterval: 定时器，启动和关闭', () => {
    
  })
});

describe('hooks-extra', () => {
  test('useMemo', () => {
    
  })
});

describe('hooks-web', () => {
  test('useCountdown: 倒计时', () => {
    const TestComponetn = {
      template: `
      <p>Times clicked: {{timer?.seconds}}</p>
      `,
      setup() {
        const [_, timer] = useCountdown({leftTime: 60 * 1000})
        return { timer }
      }
    }

    render(TestComponetn)
    
    setTimeout(() => {
      expect(screen.queryByText('Times clicked: 58')).toBeTruthy()
    }, 1000)
  })

  test('useECharts: 图表加载、注销、更新 option', () => {
    
  })
});

