const { getDefaultConfig } = require('@expo/metro-config');

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);

  config.resolver.extraNodeModules = {
    ...config.resolver.extraNodeModules,
    'react-native-web': require.resolve('react-native-web'),
  };

  config.resolver.alias = {
    ...config.resolver.alias,
    'react-native-web/dist/vendor/react-native/NativeEventEmitter/RCTDeviceEventEmitter':
      'react-native/Libraries/EventEmitter/RCTDeviceEventEmitter',
  };

  return config;
})();
