import * as t from './actionTypes'
import request from '../../../common/request'
import {requestData, receiveError} from '../../../common/actions'
import config from '../../../config'

function setProposalId(proposalId) {
  return {
    type: t.RECEIVE_SAVE_PROPOSAL,
    proposalId,
    receivedAt: Date.now()
  }
}

function setCalcPremiumData(data) {
  return {
    type: t.RECEIVE_CALC_PREMIUM,
    data,
    receivedAt: Date.now()
  }
}

export function calcPremium(plan, callback) {
  return (dispatch, getState) => {
    dispatch(requestData('calcPremium'))
    let settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(plan)
    };
    return request(config.spPlanServiceBase + '/calcPremium', settings)
      .then(data => {
        dispatch(setCalcPremiumData(data));
        callback && callback(null, data.totalFirstYearPrem);
      })
      .catch((err) => {
        console.log('server error', err);
        dispatch(receiveError(err.toString()));
        callback && callback(err.toString());
      });
  }
}

export function saveProposal(proposalRequest, callback) {
  return (dispatch, getState) => {
    dispatch(requestData('saveProposal'))
    let settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(proposalRequest)
    };
    return request(config.proposalService + '/saveProposal', settings)
      .then(data => {
        dispatch(setProposalId(data.proposalId));
        callback && callback(null, data.proposalId);
      })
      .catch((err) => {
        console.log('server error', err);
        dispatch(receiveError(err.toString()));
        callback && callback(err.toString());
      });
  }
}
