import * as t from './actionTypes'
import request from '../../../common/request'
import {requestData, receiveError} from '../../../common/actions'
import config from '../../../config'

//private actions start
function receiveProductList(data) {
  return {
    type: t.RECEIVE_PRODUCT_LIST,
    data,
    meta: {
      loading: false
    }
  }
}

//export actions start

//export async actions start
export function fetchProductList(searchCondition, callback) {
  return (dispatch, getState) => {
    dispatch(requestData('fetchProductList'))
    let settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(searchCondition)
    };
    return request(config.spProductServiceBase + '/searchProducts', settings)
    .then(data=> {
      dispatch(receiveProductList(data));
      callback && callback(null);
    })
    .catch((err) => {
      console.log('server error', err);
      dispatch(receiveError(err.toString()));
      callback && callback(err.toString());
    });
  }
}
