import { fireEvent } from "@testing-library/vue";
import { render, screen } from "@testing-library/vue";
import { useCountdown, useCurrentInstance, useDebounce, useState, useTimeout } from "../src/package";

describe('useDebounce', () => {
  test('参数 Ref, wait: 200ms', async () => {
    const TestComponetn = {
      template: `
      <p>msg: {{debounce}}</p>
      `,
      setup() {
        const [value, setValue] = useState(0)
        const debounce = useDebounce(value, 200)
        useTimeout(() => setValue(1), 50)
        useTimeout(() => setValue(2), 100)
        useTimeout(() => setValue(3), 150)
        useTimeout(() => setValue(4), 250)
        return { debounce }
      }
    }

    // 开启模拟定时器
    jest.useFakeTimers()

    render(TestComponetn)
    // 初始状态
    expect(screen.queryByText('msg: 0')).toBeTruthy()
    // 加速第一个定时器
    await jest.advanceTimersByTime(50)
    expect(screen.queryByText('msg: 0')).toBeTruthy()
    // 加速第二个定时器
    await jest.advanceTimersByTime(100)
    expect(screen.queryByText('msg: 0')).toBeTruthy()
    // 加速第三个定时器
    await jest.advanceTimersByTime(150)
    expect(screen.queryByText('msg: 0')).toBeTruthy()
    // 加速第四个定时器
    await jest.advanceTimersByTime(220)
    expect(screen.queryByText('msg: 4')).toBeTruthy()
  })

  test('参数 Fn, wait: 200ms', async () => {
    const TestComponetn = {
      template: `
      <p>msg: {{value}}</p>
      `,
      setup() {
        const [value, setValue] = useState(0)
        const fn = (v: number) => setValue(v)
        const debounce = useDebounce(fn, 200)
        useTimeout(() => debounce(1), 50)
        useTimeout(() => debounce(2), 100)
        useTimeout(() => debounce(3), 150)
        useTimeout(() => debounce(4), 250)
        return { value }
      }
    }

    // 开启模拟定时器
    jest.useFakeTimers()

    render(TestComponetn)
    // 初始状态
    expect(screen.queryByText('msg: 0')).toBeTruthy()
    // 加速第一个定时器
    await jest.advanceTimersByTime(50)
    expect(screen.queryByText('msg: 0')).toBeTruthy()
    // 加速第二个定时器
    await jest.advanceTimersByTime(100)
    expect(screen.queryByText('msg: 0')).toBeTruthy()
    // 加速第三个定时器
    await jest.advanceTimersByTime(150)
    expect(screen.queryByText('msg: 0')).toBeTruthy()
    // 加速第四个定时器
    await jest.advanceTimersByTime(220)
    expect(screen.queryByText('msg: 4')).toBeTruthy()
  })
});

describe('useCurrentInstance', () => {
  test('获取 Instance', () => {
    const TestComponetn = {
      template: `
      <p>{{app.version}}</p>
      `,
      setup() {
        const { app } = useCurrentInstance()
        return { app }
      }
    }

    render(TestComponetn)
    // vue 版本号
    expect(screen.queryByText('3.2.41')).toBeTruthy()
  })
});

describe('useCountdown', () => {
  test('Options 无参，显示0', async () => {
    const TestComponetn = {
      template: `
      <p>count down: {{Math.round(leftTime / 1000)}}</p>
      `,
      setup() {
        const [leftTime] = useCountdown()
        return { leftTime }
      }
    }

    render(TestComponetn)
    
    expect(screen.queryByText('count down: 0')).toBeTruthy()
  })
  test('leftTime 小于0，显示0', async () => {
    const TestComponetn = {
      template: `
      <p>count down: {{Math.round(leftTime / 1000)}}</p>
      `,
      setup() {
        const [leftTime] = useCountdown({leftTime: -60})
        return { leftTime }
      }
    }

    render(TestComponetn)
    
    expect(screen.queryByText('count down: 0')).toBeTruthy()
  })

  test('使用倒计时长参数 ms, 自动开始', async () => {
    const TestComponetn = {
      template: `
      <p>count down: {{Math.round(leftTime / 1000)}}</p>
      <button @click="reset">reset</button>
      `,
      setup() {
        const [leftTime, _, reset] = useCountdown({leftTime: 60 * 1000})
        return { leftTime, reset }
      }
    }

    // 开启模拟定时器
    jest.useFakeTimers()
    render(TestComponetn)
    
    expect(screen.queryByText('count down: 60')).toBeTruthy()

    await jest.advanceTimersByTime(10000)
    expect(screen.queryByText('count down: 60')).toBeTruthy()

    const button = screen.getByText('reset')

    await fireEvent.click(button)
    expect(screen.queryByText('count down: 60')).toBeTruthy()

    await jest.advanceTimersByTime(1000)
    expect(screen.queryByText('count down: 59')).toBeTruthy()
  })

  test('使用到达目标时间, 自动开始, 结束回调', async () => {
    const TestComponetn = {
      template: `
      <p>count down: {{Math.round(leftTime / 1000)}}</p>
      <p>onEnd: {{end}}</p>
      <button @click="reset">reset</button>
      `,
      setup() {
        const [end, setEnd] = useState('no')
        const [leftTime, _, reset] = useCountdown({targetDate: Date.now() +  20 * 1000, onEnd: () => setEnd('yes')}, true)
        return { leftTime, reset, end }
      }
    }

    // 开启模拟定时器
    jest.useFakeTimers()
    render(TestComponetn)
    
    expect(screen.queryByText('count down: 20')).toBeTruthy()

    await jest.advanceTimersByTime(1000)
    expect(screen.queryByText('count down: 19')).toBeTruthy()

    const button = screen.getByText('reset')

    await fireEvent.click(button)
    expect(screen.queryByText('count down: 19')).toBeTruthy()

    await jest.advanceTimersByTime(9000)
    expect(screen.queryByText('onEnd: no')).toBeTruthy()

    await jest.advanceTimersByTime(10000)
    expect(screen.queryByText('onEnd: yes')).toBeTruthy()
  })
});
