import { render, screen, fireEvent } from "@testing-library/vue";
import { useInterval, useState } from "../src/package";

describe('useInterval', () => {
  test('启动和关闭, 手动定时', async () => {
    const TestComponetn = {
      template: `
      <p>auto record: {{state}}</p>
      <button @click="start">reset</button>
      <button @click="stop">stop</button>
      `,
      setup() {
        const [state, setState] = useState(0)
        const [start, stop] = useInterval(() => setState(c => ++c), 1000, true)
        return { state, start, stop }
      }
    }

    // 开启模拟定时器
    jest.useFakeTimers()
    render(TestComponetn)

    // await 等待一下，等待定时器立即执行更新 state 有延迟
    await jest.advanceTimersByTime(10)
    expect(screen.queryByText('auto record: 1')).toBeTruthy()

    await jest.advanceTimersByTime(1000)
    expect(screen.queryByText('auto record: 2')).toBeTruthy()

    const stop = screen.getByText('stop')
    await fireEvent.click(stop)
    await jest.advanceTimersByTime(1000)
    expect(screen.queryByText('auto record: 2')).toBeTruthy()

    const reset = screen.getByText('reset')
    await fireEvent.click(reset)
    await jest.advanceTimersByTime(1000)
    expect(screen.queryByText('auto record: 4')).toBeTruthy()
  })
});