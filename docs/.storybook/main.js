module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
      },
  ],
  "framework": "@storybook/vue3",
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config) => {
    // console.log(config.module.rules)
    config.module.rules = [
      ...config.module.rules.filter((_, i) => [2,3,7,8,10,11,12,13].includes(i)),
			{
				test: /\.(ts|tsx|js|jsx)$/,
				use: {
					loader: 'swc-loader',
				},
			}
		]

    return config
  }
}