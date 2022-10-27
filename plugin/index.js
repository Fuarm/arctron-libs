const plugin = require('tailwindcss/plugin')
const viStylesComponents = require('./vi-styles')

module.exports = plugin(
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
