import type { Plugin } from "vue";
import { withInstall } from '../../utils'

import BarChart1 from './Bar1'

const ArcBarChart1 = withInstall(BarChart1)

export { ArcBarChart1 }