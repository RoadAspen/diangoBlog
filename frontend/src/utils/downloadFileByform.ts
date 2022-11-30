/**
 * tezign ownership
 * @owner xuchengjian
 * @team M3
 */
import constants from '@/configs/constants';
import getUrl from '@tezign/intelligence-common-dam/lib/utils/getUrl';
import cookies from 'js-cookie';
// import { isNil } from 'lodash';

export default function downloadFileByForm(url: string, customParams: { [key: string]: any }) {
  const turnForm = document.createElement('form');
  document.body.appendChild(turnForm);
  turnForm.style.display = 'none';
  turnForm.method = 'post';
  turnForm.action = getUrl(url);
  turnForm.enctype = turnForm.encoding = 'multipart/form-data';
  turnForm.target = '_blank'; // 创建隐藏表单
  const params: Object = {
    userId: cookies.get(constants.COOKIE_X_USER_ID),
    tenantId: cookies.get(constants.C_XTENANTID),
    ...customParams,
  };

  // Object.keys(params).forEach((p) => {
  //   if (isNil(params[p])) return;

  //   const newElement = document.createElement('input');
  //   newElement.setAttribute('name', p);
  //   newElement.setAttribute('type', 'hidden');
  //   if (typeof params[p] === 'string') {
  //     newElement.setAttribute('value', params[p]);
  //   } else {
  //     newElement.setAttribute('value', JSON.stringify(params[p]));
  //   }
  //   turnForm.appendChild(newElement);
  // });

  turnForm.submit();
  document.body.removeChild(turnForm);
}
