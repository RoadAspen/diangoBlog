/**
 * tezign ownership
 * @owner weichenchen
 * @team N1
 */
import '@/assets/scss/common.scss';
import RoutePath from '@/configs/RoutePath';
import Themes from '@/components/theme/Themes';
import moment from 'moment';
import 'moment/locale/es-us';
import 'moment/locale/zh-cn';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { LocaleProvider } from 'antd';
import './Root.scss';
const lang = 'zh-CN';
moment.locale(lang);

const Login = lazy(() => import(/* webpackChunkName: "Login" */ './Login'));

export default () => {
  return (
    <LocaleProvider>
      <Themes>
        <RecoilRoot>
          <BrowserRouter>
            <Suspense fallback={null}>
              <Switch>
                {/* 本地开发用的登陆页 */}
                {process.env.REACT_APP_ENV !== 'production' && (
                  <Route exact path={[RoutePath.login, '/login']} component={Login} />
                )}
              </Switch>
            </Suspense>
          </BrowserRouter>
        </RecoilRoot>
      </Themes>
    </LocaleProvider>
  );
};
