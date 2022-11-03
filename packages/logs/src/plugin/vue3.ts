import Logs from "../logs"

const makeInstaller = (logs: Logs) => {
  const install = app => {
    app.$logs = logs
  }

  return {
    install,
  }
}

export default makeInstaller