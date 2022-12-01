import { useMemo, useState } from "../src/package";

describe('useMemo', () => {
  test('缓存函数执行结果，依赖更新时重新更改调用', async () => {
    const [state, setState] = useState(0)
    // 可以不用通过他执行
    const target = useMemo<number>(() => 10 + state.value, [state])

    expect(target.value).toBe(10)

    await setState(1)
    expect(target.value).toBe(11)
  })
});