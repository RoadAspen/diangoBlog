/**
 * tezign ownership
 * @owner weichenchen
 * @team N1
 */
import intl from '@tezign/intelligence-common/lib/utils/intl';
import React from 'react';
import style from './index.module.scss';
import NoPrivilegePic from './no-privilege.svg';

export default function NoPrivilege() {
  return (
    <div className={`text-center ${style.wrap}`}>
      <div className={`display-inline-block ${style.wrap_content}`}>
        <img src={NoPrivilegePic} alt="" />
        <p>{intl.get('ui_no_permission')}</p>
      </div>
    </div>
  );
}
