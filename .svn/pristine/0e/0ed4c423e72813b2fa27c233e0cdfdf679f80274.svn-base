import { combineReducers } from 'redux'
import * as t from './actionTypes'

const initUiState = {

}

function ui(state = initUiState, action) {
  switch (action.type) {
    default:
      return state
  }
}

const initDataState = {
  openid: null,
  agent: null,
}
function data(state = initDataState, action) {
  switch (action.type) {
    case t.RECEIVE_OPENID:
      return Object.assign({}, state, {
        openid: action.openid,
      })
    case t.RECEIVE_AGENT:
      return Object.assign({}, state, {
        agent: action.agent,
      })
    default:
      return state
  }
}

const proposalReducer = combineReducers({
  ui,
  data,
})

export default proposalReducer
