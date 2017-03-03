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
   salesPackages: [],
   hotkeywordsList: [],
   defaultSearchWords: {},
}
function data(state = initDataState, action) {
  switch (action.type) {
    case t.RECEIVE_PRODUCT_LIST:
      return Object.assign({}, state, {
        salesPackages: action.data.salesPackages,
        hotkeywordsList: action.data.hotkeywordsList,
        defaultSearchWords: action.data.defaultSearchWords,
      })
    default:
      return state
  }
}

const productsReducer = combineReducers({
  ui,
  data,
})

export default productsReducer
