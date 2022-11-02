import { App, Plugin } from "vue";
import { INSTALLED_KEY } from '../constant'
import Components from './component'
export * from '../components'

const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App, options) => {
    if (app[INSTALLED_KEY]) return

    app[INSTALLED_KEY] = true
    components.forEach((c) => app.use(c))
  }

  return {
    install,
  }
}

const installer = makeInstaller([...Components])

// export const install = installer.install

export default installer
