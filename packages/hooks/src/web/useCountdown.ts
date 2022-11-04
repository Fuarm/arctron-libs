import dayjs from 'dayjs';
import useState from '../core/useState';
import useInterval from '../event/useInterval';
import useMemo from '../extra/useMemo';
import { isNumber } from '../utils';

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
// 2、剩余时间从number类型转换成时间 FormattedRes 对象
function parseMs(milliseconds: number): Timer {
  return {
    days: Math.floor(milliseconds / 86400000),
    hours: Math.floor(milliseconds / 3600000) % 24,
    minutes: Math.floor(milliseconds / 60000) % 60,
    seconds: Math.floor(milliseconds / 1000) % 60,
    milliseconds: Math.floor(milliseconds) % 1000,
  };
};
// 3、默认级别为秒（s）支持级别微妙（ms） - 微妙不精准
function useCountdown(options: Options = {}) {
  const { leftTime, targetDate, interval = 1000, onEnd } = options

  const target = useMemo<TDate>(() => {
    return 'leftTime' in options 
      ? isNumber(leftTime) && leftTime > 0 ? Date.now() + leftTime : undefined
      :  targetDate
  }, [])

  // 距离目标时间的剩余时间
  const [timeleft, setTimeLeft] = useState(calcLeftTime(target.value))

  // 方案1：leftTime 优先级更高
  const [_, stop] = useInterval(() => {
    setTimeLeft(calcLeftTime(target.value))
    if (timeleft.value === 0) {
      stop()
      onEnd?.()
    }
  }, interval, true)

  const formatTimer = useMemo<Timer>(() => parseMs(timeleft.value), [timeleft])

  return [timeleft, formatTimer] as const
}

export default useCountdown