/* eslint-disable no-param-reassign */
import fetch from 'isomorphic-fetch';
import merge from 'lodash/merge';
import parseObjectToUrlParams from './parseObjectToUrlParams';

let events = {};

/**
 * http 方法
 * @param {string} url - 请求地址
 * @param {object} options - 请求参数
 * @param {string} options.method - 方法类型
 * @param {json} options.body - 请求内容
 * @param {object} options.headers - 请求头
 * @return {Promise} Http 返回结果.
 * @memberof http
 */
function http(url: string, options: any) {
  const { original, params } = options;
  // eslint-disable-next-line no-param-reassign
  if (params) url += '?' + parseObjectToUrlParams(params);
  return fetch(url, options).then(
    function (response) {
      if (original) return response;
      // HTTP请求异常
      if (response.status !== 200) {
        http.trigger(response.status, response);
        // throw response;
      }

      // 业务数据正常返回
      return response.json().then(
        function (res) {
          // 业务逻辑
          if (res.code !== '0') {
            http.trigger(res.code, response);
            throw res;
          }

          return res.result;
        },
        function (err) {
          http.trigger('DATA-ERROR', response);
          throw err;
        },
      );
    },
    function (err) {
      http.trigger('FETCH-ERROR', err);
      throw err;
    },
  );
}

http.defaults = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
};

/**
 * http.get 方法
 * @function http.get
 * @param {string} url - 请求地址
 * @param {object} options - 请求参数
 * @param {object} options.headers - 请求头
 * @return {Promise} Http 返回结果.
 * @memberof http
 */
http.get = function (url: string, options?: any) {
  options = options || {};
  options.method = 'GET';
  options = merge({}, http.defaults, options);
  return http(url, options);
};

/**
 * http.post 方法
 * @function http.post
 * @param {string} url - 请求地址
 * @param {object} data - 请求内容
 * @param {object} options - 请求参数
 * @param {object} options.headers - 请求头
 * @return {Promise} Http 返回结果.
 * @memberof http
 */
http.post = function (url: string, data: any, options?: any) {
  options = options || {};
  options.body = JSON.stringify(data);
  options.method = 'POST';
  options = merge({}, http.defaults, options);
  return http(url, options);
};

http.put = function (url: string, data: any, options?: any) {
  options = options || {};
  options.body = JSON.stringify(data);
  options.method = 'PUT';
  options = merge({}, http.defaults, options);
  return http(url, options);
};

http.patch = function (url: string, data: any, options?: any) {
  options = options || {};
  options.body = JSON.stringify(data);
  options.method = 'PATCH';
  options = merge({}, http.defaults, options);
  return http(url, options);
};

http.delete = function (url: string, options?: any) {
  options = options || {};
  options.method = 'DELETE';
  options = merge({}, http.defaults, options);
  return http(url, options);
};

http.on = function (name: string, handler: any) {
  if (!events[name]) events[name] = [];
  events[name].push(handler);
};

http.trigger = function (name: string | number, data: any) {
  let handlers = events[name];
  if (handlers) {
    handlers.forEach((handler: any) => handler(data));
  }
};

/**
 * @namespace http
 */
export default http;
