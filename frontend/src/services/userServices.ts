/**
 * tezign ownership
 * @owner weichenchen
 * @team N1
 */

export async function login(username: string, password: string) {
  return (await fetch('/user/login')).json();
}
