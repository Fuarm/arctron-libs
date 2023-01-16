import { Test } from '../../../packages/components/packages/components';
import { defineComponent } from 'vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'VUE3/components/ECharts',
  component: Test,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    label: {}
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args


// const Template = (args) => <div>ce
//   <ArcECharts props={args} />
// </div>;
const Template = (args) => <Test {...args} />

export const Primary = Template.bind({});
// // More on args: https://storybook.js.org/docs/vue/writing-stories/args
Primary.args = {
  label: '测试组件label'
};
