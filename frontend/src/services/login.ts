import http from '@/utils/http';
import { getUrl } from '@/utils/setHttp';
/**
 * 登陆相关
 */

export async function login(username: string, password: string) {
  return http.post(getUrl('/api/admin/login/'), { username, password });
}
