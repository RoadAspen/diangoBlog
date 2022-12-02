import 'core-js';
import 'es6-promise/auto';
import { enableES5 } from 'immer';
import React from 'react';
import ReactDOM from 'react-dom';
import { hot, setConfig } from 'react-hot-loader';
import Root from './pages/Root';
import locale from '@/locales';

type ENV = 'development' | 'test' | 'stage' | 'production';

// * ------------------------------------------------------

enableES5();
locale();

const root = (props?: any) => {
  const rootEl = props?.container ? props.container.querySelector('#root') : document.getElementById('root');
  let RootView = Root;

  if (process.env.__ENV__ === 'DEV') {
    setConfig({
      reloadHooks: true,
    });
    RootView = hot(module)(Root);
  }

  ReactDOM.render(React.createElement(RootView), rootEl);
};

root();
