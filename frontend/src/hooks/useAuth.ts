/**
 * tezign ownership
 * @owner weichenchen
 * @team N1
 */
import useService from '@tezign/intelligence-common-dam/lib/hooks/useService';
import { authCache } from '@tezign/intelligence-common/lib/utils/user-cache';

/**
 * 权限查询
 *
 * @param { string } code - 权限码
 * @param { boolean } disableSuperManager - 是否限制超管帐号的权限
 */
const useAuth = (code?: string, disableSuperManager?: boolean) => {
  const [{ data: useAuthsCache }] = useService(() => authCache.get(), []);
  // @ts-ignore
  const auth = useAuthsCache?.auths?.find((e) => e.code === code);

  if (!useAuthsCache || !code) return false;
  if (auth === undefined) return false;
  return Boolean(auth || (disableSuperManager ? false : useAuthsCache.isSuperManager));
};

export default useAuth;

export const useAuthMap = () => {
  return {
    /** UI模版中心 */
    canAccessUITemplate: useAuth('TEMPLATE_CENTER_VIEW_AND_EXPORT'),
    /** UI list */
    canAccessUIProductManagement: useAuth('PRODUCT_MANAGEMENT_PRODUCTS'),
    /** UI 详情页面 */
    canAccessUIProductManagementView: useAuth('PRODUCT_MANAGEMENT_VIEW'),
    /** UI 编辑页面 */
    canAccessUIProductManagementEdit: useAuth('PRODUCT_MANAGEMENT_EDIT'),
    /** UI 下载权限 */
    canExportUIProduct: useAuth('PRODUCT_MANAGEMENT_DOWNLOAD'),
  };
};
