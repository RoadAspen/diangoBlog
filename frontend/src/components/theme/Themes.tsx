import React, { FC, ReactNode, useState, useEffect } from 'react';
import cssVars from 'css-vars-ponyfill';
import { defaultTheme } from './default';

const Theme: FC<{
  children: ReactNode;
  onFetchThemes?: () => Promise<[{ name: string; state: 1 | 0; content: [{ key: string; val: string }] }]>;
}> = ({ onFetchThemes, children }) => {
  const hexToRgb = (hex: string) => {
    return (
      parseInt('0x' + hex.slice(1, 3), 10) +
      ',' +
      parseInt('0x' + hex.slice(3, 5), 10) +
      ',' +
      parseInt('0x' + hex.slice(5, 7), 10)
    );
  };
  const setCssVars = (theme) => {
    const variables = {};
    const themes = theme?.content?.length > 0 ? theme?.content : defaultTheme;
    themes.forEach((variable) => {
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
  };

  const [loaded, setL] = useState<boolean>(false);

  useEffect(() => {
    onFetchThemes?.()
      .then((thems) => {
        const theme = thems.find((item) => item.state);
        setCssVars(theme);
      })
      .catch((ex) => {
        setL(true);
        setCssVars(defaultTheme);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{loaded && children}</>;
};

export default Theme;
