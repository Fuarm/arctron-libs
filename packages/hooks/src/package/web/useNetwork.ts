import { Ref } from 'vue';
import useEffect from '../core/useEffect';
import useState from '../core/useState';
import useEventListener from '../event/useEventListener';
import { isObject } from '../../utils';

export interface NetworkState {
  since?: Date;
  online?: boolean;
  rtt?: number;
  type?: string;
  downlink?: number;
  saveData?: boolean;
  downlinkMax?: number;
  effectiveType?: string;
}

enum NetworkEventType {
  ONLINE = 'online',
  OFFLINE = 'offline',
  CHANGE = 'change',
}

function getConnection() {
  const nav = navigator as any;
  if (!isObject(nav)) return null;
  return nav.connection || nav.mozConnection || nav.webkitConnection;
}

function getConnectionProperty(): NetworkState {
  const c = getConnection();
  if (!c) return {};
  return {
    rtt: c.rtt,
    type: c.type,
    saveData: c.saveData,
    downlink: c.downlink,
    downlinkMax: c.downlinkMax,
    effectiveType: c.effectiveType,
  };
}

/**
 * useNetwork 网络链接情况
 * @public
 * @returns 
 */
function useNetwork(): Ref<NetworkState> {
  const [state, setState] = useState({
    since: undefined,
    online: navigator?.onLine,
    ...getConnectionProperty(),
  });

  const onOnline = () => {
    setState((prevState) => ({
      ...prevState,
      online: true,
      since: new Date(),
    }));
  };

  const onOffline = () => {
    setState((prevState) => ({
      ...prevState,
      online: false,
      since: new Date(),
    }));
  };

  const onConnectionChange = () => {
    setState((prevState) => ({
      ...prevState,
      ...getConnectionProperty(),
    }));
  };
  
  window.addEventListener(NetworkEventType.ONLINE, onOnline);
  window.addEventListener(NetworkEventType.OFFLINE, onOffline);

  const connection = getConnection();
  connection?.addEventListener(NetworkEventType.CHANGE, onConnectionChange);

  return state;
}

export default useNetwork;