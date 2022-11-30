import LoginEN from './login/en-US';
import LoginCN from './login/zh-CN';

export default () => {
  const langMap = {
    'en-US': { ...UILocalesEN },
    'zh-CN': { ...UILocalesCN },
  };
};
