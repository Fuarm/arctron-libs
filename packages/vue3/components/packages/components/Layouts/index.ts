import type { Plugin } from "vue";
import { withInstall } from '../../utils'

import BaseBox from './BaseBox'

export const ArcBaseBox = withInstall(BaseBox)
export default ArcBaseBox