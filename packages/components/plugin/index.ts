import plugin from 'tailwindcss/plugin'
import viStylesComponents from './vi-styles'

export default plugin(
  ({ addBase, addComponents, theme }) => {
    console.log(
      '🐮 arctron-custom-tailwind-plugin 启动成功！',
      addBase,
      addComponents,
      theme
    )
    addComponents(viStylesComponents)
  },
  {
    theme: {}
  }
)
