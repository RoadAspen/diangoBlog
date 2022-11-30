/**
 * tezign ownership
 * @owner weichenchen
 * @team N1
 */
import constants from '@/configs/constants';
import setHttp from '@/utils/setHttp';
import http from '@tezign/commons.js/http';
import { hasSSOLogin, setSSOToken, setSSOUid, SSOLoginPlatformType } from '@tezign/foundation-common/lib/utils/auth';
import { IEnterpriseUser as IUser } from '@tezign/intelligence-common-dam/lib/configs/interface/user';
import getUrl from '@tezign/intelligence-common-dam/lib/utils/getUrl';

export async function login(username: string, password: string) {
  const res = await http.postForm<IUser>(`${constants.API_ORIGIN}/user/login`, {
    username,
    password,
  });
  if (res.token && res.base.id) {
    setSSOToken(SSOLoginPlatformType.Vms, res.token);
    setSSOUid(SSOLoginPlatformType.Vms, `${res.base.id}`);
    setHttp();
  }
  return res;
}

export function checkLogin() {
  return hasSSOLogin(SSOLoginPlatformType.Vms);
}

/** @todo 供应商帐号访问这个接口应该报 499 吧？需要后端处理吗 */
export async function fetchUser(): Promise<IUser> {
  return http.get(getUrl('/user/proCompany/user/get'));
}
