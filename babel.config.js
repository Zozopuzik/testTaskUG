module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'babel-plugin-module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@components/*': './src/components/*',
          '@screens': './src/screens',
          '@screens/*': './src/screens/*',
          '@hooks': './src/hooks',
          '@hooks/*': './src/hooks/*',
          '@stores': './src/stores',
          '@stores/*': './src/stores/*',
          '@services': './src/services',
          '@services/*': './src/services/*',
          '@navigation': './src/navigation',
          '@navigation/*': './src/navigation/*',
          '@hocs': './src/hocs',
          '@hocs/*': './src/hocs/*',
          '@types': './src/types',
          '@types/*': './src/types/*',
          '@mocks': './src/mocks',
          '@mocks/*': './src/mocks/*',
          '@api': './src/api',
          '@api/*': './src/api/*',
          '@utils': './src/utils',
          '@utils/*': './src/utils/*',
        },
      }
    ],
    'react-native-worklets/plugin',
  ],
};
