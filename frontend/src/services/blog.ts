import http from '@/utils/http';
import { getUrl } from '@/utils/setHttp';
/**
 * 登陆相关
 */

export async function getAllBlogList() {
  return http.get(getUrl('/api/blog/list/'));
}
