import { combineReducers } from 'redux';
import common from "./common";
import policy from "./policy";
import optin from "./optin";
import account from "./account";
import transfer from "./transfer";

const reducer = combineReducers({
  common,
  policy,
  optin,
  account,
  transfer,
});

export default reducer;