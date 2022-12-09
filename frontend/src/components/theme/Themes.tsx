import React, { FC, ReactNode, useState, useEffect } from 'react';
import cssVars from 'css-vars-ponyfill';
import { defaultTheme } from './default';

const Theme: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const hexToRgb = (hex: string) => {
    return (
      parseInt('0x' + hex.slice(1, 3), 10) +
      ',' +
      parseInt('0x' + hex.slice(3, 5), 10) +
      ',' +
      parseInt('0x' + hex.slice(5, 7), 10)
    );
  };

  const [loaded, setL] = useState<boolean>(false);

  useEffect(() => {
    const variables = {};
    defaultTheme.forEach((variable) => {
      variables[`${variable.key}`] = variable.val;
      if (variable.key === '--color-primary') {
        variables[`${variable.key}-rgb`] = hexToRgb(variable.val);
      }
    });
    cssVars({
      watch: true,
      variables,
    });
    setL(true);
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{loaded && children}</>;
};

export default Theme;
