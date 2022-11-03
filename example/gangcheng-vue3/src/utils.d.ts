import type { Logs } from "@arctron-cim/logs";

declare module 'vue' {
  export interface App {
    $logs: Logs
  }
}
