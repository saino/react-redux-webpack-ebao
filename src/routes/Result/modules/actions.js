import * as t from './actionTypes'
import request from '../../../common/request'
import {requestData, receiveError} from '../../../common/actions'
import config from '../../../config'

function receiveOpenid(openid) {
  return {
    type: t.RECEIVE_OPENID,
    openid,
    meta: {
      loading: false
    }
  }
}

function receiveAgent(agent) {
  return {
    type: t.RECEIVE_AGENT,
    agent,
    meta: {
      loading: false
    }
  }
}

export function fetchOpenid(code, callback) {
  return (dispatch, getState) => {
    dispatch(requestData('fetchOpenid'));
    return request('https://api.weixin.qq.com/sns/oauth2/access_token?appid='+config.wxappid+'&secret='+config.wxappsecret+'&code='+code+'&grant_type=authorization_code')
      .then(data=> {
        dispatch(receiveOpenid(data.openid));
        callback && callback(null, data.openid);
      })
      .catch((err) => {
        console.log('server error', err);
        dispatch(receiveError(err.toString()));
        callback && callback(err.toString());
      });
  }
}

export function fetchAgent(openid, callback) {
  return (dispatch, getState) => {
    dispatch(requestData('fetchAgent'));
    return request(config.wxServiceBase + '/agent/'+openid)
      .then(data=> {
        if (data.data && data.data.user) {
          dispatch(receiveAgent(data.data.user));
          callback && callback(null, data.data.user);
        } else {
          dispatch(receiveAgent(null));
          callback && callback(null, null);
        }
      })
      .catch((err) => {
        console.log('server error', err);
        dispatch(receiveError(err.toString()));
        callback && callback(err.toString());
      });
  }
}

export function login(params, callback) {
  return (dispatch, getState) => {
    dispatch(requestData('login'));
    let settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    };
    return request(config.wxServiceBase + '/login', settings)
      .then(data=> {
        if (data.data && data.data.user) {
          dispatch(receiveAgent(data.data.user));
          callback && callback(null, data.data.user);
        } else {
          dispatch(receiveAgent(null));
          callback && callback(null, null);
        }
      })
      .catch((err) => {
        console.log('server error', err);
        dispatch(receiveError(err.toString()));
        callback && callback(err.toString());
      });
  }
}
