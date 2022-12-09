import forEach from 'lodash/forEach';

export default function (obj: { [key: string]: string | number }) {
  let str = '';
  forEach(obj, function (value, key) {
    if (value === undefined || value === null) return;
    str += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(value);
  });
  return str.substring(1);
}
