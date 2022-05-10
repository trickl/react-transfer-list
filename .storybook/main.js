const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [],
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

    // https://github.com/mui-org/material-ui/issues/24282
    // Waiting for Storybook 6.4 to resolve
    delete config.resolve.alias['emotion-theming'];
    delete config.resolve.alias['@emotion/styled'];
    delete config.resolve.alias['@emotion/core'];
    return config;
  },
};
