

import locale from '@/locales';
import 'core-js';
import 'es6-promise/auto';
import { enableES5 } from 'immer';
import React from 'react';
import ReactDOM from 'react-dom';
import { hot, setConfig } from 'react-hot-loader';
import Root from './pages/Root';
import './theme.css';
import { tweakTwind } from './tailwind.config';

if (process.env.__ENV__ !== 'DEV') {
  // eslint-disable-next-line
  __webpack_public_path__ = 'https://vms-cdn.tezign.com/ui_product/' || '/';
} else {
  // eslint-disable-next-line
  __webpack_public_path__ = '/';
}

type ENV = 'development' | 'test' | 'stage' | 'production';

// * ------------------------------------------------------

enableES5();
tweakTwind();
foundationConfig.setConfig(process.env.RELEASE_ENV as ENV, { isTenant: true });
locale();
setAppConfig();
setHttp();
// 初始化oneid
initGlobalUserId();
// 初始化云服务商
initMultiCloud();

const root = (props?: any) => {
  const rootEl = props?.container ? props.container.querySelector('#root') : document.getElementById('root');
  let RootView = Root;

  if (process.env.__ENV__ === 'DEV') {
    setConfig({
      reloadHooks: true,
    });
    RootView = hot(module)(Root);
  }

  generateAuthBySSOTzCode(SSOLoginPlatformType.Vms).then(() => {
    ReactDOM.render(React.createElement(RootView), rootEl);
  });
};

root();
