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
  calcPremium: null,
  proposalId: null,
}
function data(state = initDataState, action) {
  switch (action.type) {
    case t.RECEIVE_CALC_PREMIUM:
      return Object.assign({}, state, {
        calcPremium: {
          totalFirstYearPrem: action.data.totalFirstYearPrem,
          coveragePrems: action.data.coveragePrems,
          valueAddedList: action.data.valueAddedList,
        }
      })
    case t.RECEIVE_SAVE_PROPOSAL:
      return Object.assign({}, state, {
        proposalId: action.proposalId,
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
