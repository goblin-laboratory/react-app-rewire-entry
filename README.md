# react-app-rewire-entry
Configure Entry in Create React App without ejecting

## Install

```bash
$ yarn add react-app-rewire-entry --dev
```

## Add it to your project

* [Rewire your app](https://github.com/timarney/react-app-rewired#how-to-rewire-your-create-react-app-project) than modify `config-overrides.js`

```javascript
/* config-overrides.js */
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
```
或者使用下面的方式初始化
```javascript
const {
  rewireWebpackEntryConfig,
  rewireDevServerkEntryConfig,
} = rewireEntry({
  index: paths.appIndexJs,
  admin: paths.appAdminJs,
});
```
