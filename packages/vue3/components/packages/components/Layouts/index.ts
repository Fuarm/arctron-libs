import type { Plugin } from "vue";
import { withInstall } from '../../utils'

import BaseBox, { BaseBoxProps } from './BaseBox'
import BaseLayout, { BaseLayoutProps } from './BaseLayout'

const ArcBaseBox = withInstall(BaseBox)
const ArcBaseLayout = withInstall(BaseLayout)

export { ArcBaseBox, ArcBaseLayout, BaseBoxProps, BaseLayoutProps }