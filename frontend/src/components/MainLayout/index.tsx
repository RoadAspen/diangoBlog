/**
 * tezign ownership
 * @owner weichenchen
 * @team N1
 */
import { GlobalWaterMark } from '@tezign/intelligence-common';
import Notice from '@tezign/intelligence-common/lib/components/notice';
import navbarService from '@tezign/intelligence-common/lib/services/navbar';
import classNames from 'classnames';
import React, { ReactNode, useEffect, useState } from 'react';
import Navbar from '../Navbar';
import style from './index.module.scss';

/** 网站主布局，包含导航栏 */
interface Props {
  title: string;
  navbarTab?: ReactNode;
  navbarRightNode?: ReactNode;
  children?: ReactNode;
  fullScreen?: boolean;
  navbarRoutes?: {
    path: string;
    name: string;
  }[];
}

export default (props: Props) => {
  const { title, navbarTab, navbarRightNode, children, fullScreen, navbarRoutes } = props;
  const [isNewNav, setIsNewNav] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    navbarService
      .getProjectVersion()
      .then((res) => {
        const { data } = res || {};
        setIsNewNav(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <>
      <Navbar
        title={title}
        isNewNav={isNewNav}
        loading={loading}
        navbarRoutes={navbarRoutes}
        tab={navbarTab}
        rightNode={navbarRightNode}
        languageVisible={false}
      />
      <Notice />
      <main
        className={classNames(style.main, 'bgc-bg-dark', {
          [style.main_full]: fullScreen,
          /** 新旧导航： 新导航总高56px 旧导航总高 56px + minor-navigation-heigh */
          [style.main__old_nav]: !isNewNav,
        })}
        id="main-layout"
      >
        <div className={classNames(style.main_container)}>{children}</div>
        <GlobalWaterMark />
      </main>
    </>
  );
};
