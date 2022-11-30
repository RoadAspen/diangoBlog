import React, { ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import style from './index.module.scss';


export default (props: any) => {


  if (loading) return null;
  return <header className={style.navbar}>{'header'}</header>;
};
