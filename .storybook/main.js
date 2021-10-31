const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-actions',
    '@storybook/addon-essentials',
  ],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ?  !/node_modules/.test(prop.parent.fileName) : true),
  }},
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve?.alias,
      'components': path.resolve(__dirname, '../src/components'),
    };
    return config;
  },
};
