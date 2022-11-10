import dayjs from 'dayjs';
import useEffect from '../core/useEffect';
import useState from '../core/useState';
import useInterval from '../event/useInterval';
import useMemo from '../extra/useMemo';
import { isNumber } from '../../utils';

export type TDate = dayjs.ConfigType;

export interface Options {
  leftTime?: number;
  targetDate?: TDate;
  interval?: number;
  onEnd?: () => void;
}

export interface Timer {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

/**
 * 计算剩余时间
 * @param target 
 * @returns 
 */
function calcLeftTime(target?: TDate) {
  if (!target) {
    return 0
  }

  const leftTime = dayjs(target).valueOf() - Date.now()

  return leftTime < 0 ? 0 : leftTime
}
/**
 * 剩余时间从number类型转换成时间 Timer 对象
 * @param milliseconds
 * @returns 时间的 Object 对象
 */
function parseMs(milliseconds: number): Timer {
  return {
    days: Math.floor(milliseconds / 86400000),
    hours: Math.floor(milliseconds / 3600000) % 24,
    minutes: Math.floor(milliseconds / 60000) % 60,
    seconds: Math.floor(milliseconds / 1000) % 60,
    milliseconds: Math.floor(milliseconds) % 1000,
  };
};

/**
 * 倒计时 hook
 * 默认级别为秒（s）支持级别微妙（ms） - 微妙不精准
 * @param options 倒计时参数配置
 * @param immediate 是否立即启动
 * @returns 
 */
function useCountdown(options: Options = {}, immediate?: boolean) {
  const { leftTime, targetDate, interval = 1000, onEnd } = options

  const [updateTarget, setUpdateTarget] = useState(Date.now())

  const target = useMemo<TDate>(() => {
    return 'leftTime' in options 
      ? isNumber(leftTime) && leftTime > 0 ? updateTarget.value + leftTime : undefined
      :  targetDate
  }, [updateTarget])

  // 距离目标时间的剩余时间
  const [timeleft, setTimeLeft] = useState(calcLeftTime(target.value))

  const [start, stop] = useInterval(() => {
    setTimeLeft(calcLeftTime(target.value))
    if (timeleft.value === 0) {
      stop()
      onEnd?.()
    }
  }, interval, true)

  // 监测 target 更新，自动触发定时器重置
  useEffect(() => start(), [updateTarget])

  const formatTimer = useMemo<Timer>(() => parseMs(timeleft.value), [timeleft])

  // 默认不启动倒计时
  !immediate && useEffect(() => stop(), [])

  // 重置
  const reset = () => setUpdateTarget(Date.now())

  return [timeleft, formatTimer, reset] as const
}

export default useCountdown