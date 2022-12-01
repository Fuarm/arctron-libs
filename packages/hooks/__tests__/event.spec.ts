import { render, screen, fireEvent } from "@testing-library/vue";
import { mount } from '@vue/test-utils'
import { Ref } from "vue";
import { useInterval, useState, useTimeout, useEventListener, useEffect } from "../src/package";

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

  test('默认定时， 默人不立即执行', async () => {
    const TestComponetn = {
      template: `
      <p>auto record: {{state}}</p>
      `,
      setup() {
        const [state, setState] = useState(0)
        useInterval(() => setState(c => ++c))
        return { state }
      }
    }

    // 开启模拟定时器
    jest.useFakeTimers()
    render(TestComponetn)

    // await 等待一下，等待定时器立即执行更新 state 有延迟
    await jest.advanceTimersByTime(100)
    expect(screen.queryByText('auto record: 0')).toBeTruthy()

    await jest.advanceTimersByTime(200)
    expect(screen.queryByText('auto record: 1')).toBeTruthy()
  })
});

describe('useTimeout', () => {
  test('启动和关闭, 手动定时', async () => {
    const TestComponetn = {
      template: `
      <p>auto record: {{state}}</p>
      <button @click="start">reset</button>
      `,
      setup() {
        const [state, setState] = useState(0)
        const [start, stop] = useTimeout(() => setState(c => ++c), 1000, true)
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

    await jest.advanceTimersByTime(1000)
    expect(screen.queryByText('auto record: 2')).toBeTruthy()

    const reset = screen.getByText('reset')
    await fireEvent.click(reset)
    await jest.advanceTimersByTime(1000)
    expect(screen.queryByText('auto record: 3')).toBeTruthy()
  })

  test('默认定时， 默人不立即执行', async () => {
    const TestComponetn = {
      template: `
      <p>auto record: {{state}}</p>
      `,
      setup() {
        const [state, setState] = useState(0)
        useTimeout(() => setState(c => ++c))
        return { state }
      }
    }

    // 开启模拟定时器
    jest.useFakeTimers()
    render(TestComponetn)

    // await 等待一下，等待定时器立即执行更新 state 有延迟
    await jest.advanceTimersByTime(100)
    expect(screen.queryByText('auto record: 0')).toBeTruthy()

    await jest.advanceTimersByTime(200)
    expect(screen.queryByText('auto record: 1')).toBeTruthy()
  })
})

describe('useEventListener', () => {
  
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });
  test('window 事件监听', async () => {

    const TestComponent = {
      template: `
      <p>auto record: {{state}}</p>
      `,
      setup() {
        const [state, setState] = useState(0)
        useEventListener('click', () => {
          setState(++state.value)
        })
        return { state }
      }
    }

    render(TestComponent)
    expect(screen.queryByText('auto record: 0')).toBeTruthy()

    await document.body.click()
    expect(screen.queryByText('auto record: 1')).toBeTruthy()
  })

  test('DOM 事件监听', async () => {

    const TestComponent = {
      template: `
      <p>auto record: {{state}}</p>
      `,
      setup() {
        const [state, setState] = useState(0)
        const [element] = useState(container)
        useEventListener('click', () => {
          setState(++state.value)
        }, element)
        return { state }
      }
    }

    render(TestComponent)
    expect(screen.queryByText('auto record: 0')).toBeTruthy()

    await container.click()
    expect(screen.queryByText('auto record: 1')).toBeTruthy()
    
  })

  test('目标元素不存在 addEventListener 方法', async () => {

    const TestComponent = {
      template: `
      <p>auto record: {{state}}</p>
      `,
      setup() {
        const [state, setState] = useState(0)
        const [element] = useState({})
        useEventListener('click', () => {
          setState(++state.value)
        }, element as any)
        return { state }
      }
    }

    render(TestComponent)
    expect(screen.queryByText('auto record: 0')).toBeTruthy()

    await document.body.click()
    expect(screen.queryByText('auto record: 0')).toBeTruthy()
    
  })
})
