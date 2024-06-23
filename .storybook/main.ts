import { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  // Required
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  // Optional
  addons: [
    '@storybook/addon-themes',
    '@chromatic-com/storybook',
  ],
  docs: {},
  typescript: {
    check: true,
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
