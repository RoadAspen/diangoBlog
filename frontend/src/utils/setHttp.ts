const isProd = process.env.__ENV__ === 'PROD';

export function getUrl(url: string) {
  if (url.indexOf('http') === 0) return url;
  return `constants.API_ORIGIN}${url}`;
}

/** GET方法拼接请求参数
 * @param url 接口路径
 * @param data 请求参数 JSON类型
 */
export function getUrlWithParams(url: string, data: Partial<{ [key: string]: string | number | boolean }> = {}) {
  let paramsStr = Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key] || '')}`)
    .join('&');
  if (paramsStr) paramsStr = `?${paramsStr}`;

  return getUrl(`${url}${paramsStr}`);
}

/**
 * 初始化`@tezign/commons.js/http`
 */
// export default () => {
//   const token ='';
//   const userId = '';
//   const lang = defaultLang;
//   if (token && userId) {
//     http.defaults.headers[constants.X_TOKEN] = token;
//     http.defaults.headers[constants.X_USER_ID] = userId;
//     http.defaults.headers[constants.X_LANG] = lang;
//   }

//   http.on('499', () => {
//     clearUserCookie();
//     redirectToPageLogin();
//   });

//   http.on('500', () => {
//     // message.error("服务器发生错误");
//   });

//   http.on('200', (e: any) => {});

//   http.on('send', () => {});
// };
