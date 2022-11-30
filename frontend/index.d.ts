declare const __ENV__: string;

interface Window {
  // 直接拿来当成入口页面类型，为不同组件做业务定制操作
  PAGE_TYPE: string;
  // 全局字段 模板的产品推荐在用
  CATEGORY: string;
  $config: any;
}

declare const window: Window;

declare module '*.svg';
declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module 'js-cookie';
declare module 'classnames';
declare module 'styled-components';
declare module '*.module.scss';
declare module 'html2canvas';

declare module '*.json' {
  const value: any;
  export default value;
}

declare type TODO = any;
