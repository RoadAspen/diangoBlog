enum RoutePath {
  /** 登陆 */
  login = '/user/login',
  /** 无权限跳转页面 */
  no_auth = '/no_auth',
  /** blog 页面 */
  blog = '/blog',
}

export default { ...RoutePath };
