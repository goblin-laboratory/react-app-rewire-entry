const paths = require('react-scripts/config/paths');
const rewireEntry = require('react-app-rewire-entry');

paths.appAdminJs = paths.appSrc + '/admin.js';
const {
  rewireWebpackEntryConfig,
  rewireDevServerkEntryConfig,
} = rewireEntry([paths.appIndexJs, paths.appAdminJs]);


module.exports = {
  webpack: (config, env) => {
    config = rewireWebpackEntryConfig(config, env);
    return config;
  },
  devServer: (configFunction) => {
    return (proxy, allowedHost) => {
      let config = configFunction(proxy, allowedHost);
      config = rewireDevServerkEntryConfig(config);
      return config;
    };
  },
};
