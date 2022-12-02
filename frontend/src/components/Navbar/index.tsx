import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import style from './index.module.scss';

export default (props: any) => {
  const [loading, setLoading] = useState(false);

  if (loading) return null;
  return <header className={style.navbar}>header</header>;
};
