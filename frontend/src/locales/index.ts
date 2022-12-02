import LoginEN from './login/en-US';
import LoginCN from './login/zh-CN';

export default () => {
  const langMap = {
    'en-US': { ...LoginEN },
    'zh-CN': { ...LoginCN },
  };
  return langMap;
};
