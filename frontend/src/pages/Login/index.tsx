import { login } from '@/services/login';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, Input } from 'antd';
import style from './index.module.scss';
import useService from '@/hooks/useService';

/** 开发登录页，生产环境不可访问 */
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirectUrl = params?.['redirectUrl'] ?? '/blog';
  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await login(username, password);
      if (res) {
        localStorage.setItem('token', res.token);
        window.location.href = redirectUrl;
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={style.login}>
      <div className={style.login_panel}>
        <h1 className={style.login_title}>登录</h1>
        <Input
          value={username}
          onInput={(e) => setUsername(e.currentTarget.value)}
          className={style.login_input}
          placeholder="用户名"
        />
        <br />
        <Input
          value={password}
          onInput={(e) => setPassword(e.currentTarget.value)}
          className={style.login_input}
          placeholder="密码"
          type="password"
        />
        <br />
        <Button type="primary" className={style.login_input} onClick={handleLogin}>
          <span>登录</span>
        </Button>
      </div>
    </div>
  );
}
