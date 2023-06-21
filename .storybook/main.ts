import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  // Required
  framework: '@storybook/react-webpack5',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  // Optional
  addons: [],
  docs: {
    autodocs: 'tag',
  },
};

export default config;