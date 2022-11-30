import { login } from '@/services/userServices';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, Input } from 'antd';
import style from './index.module.scss';

/** 开发登录页，生产环境不可访问 */
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const history = useHistory();
  const query = new URLSearchParams(location.search);

  return (
    <div className={style.login}>
      <Panel className={style.login_panel} name="登录">
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
        <Button
          className={style.login_input}
          onClick={async () => {
            await login(username, password);
            history.push(query.get('redirect') || '/platform');
          }}
        >
          <span>登录</span>
        </Button>
      </Panel>
    </div>
  );
}
