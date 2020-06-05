import {

  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_SUCCESS

} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  user: null
};

export default function(state=initialState, action){
  switch(action.type){
    case PASSWORD_RESET_SUCCESS:
      return {
        ...state,
      }
    case PASSWORD_RESET_FAIL:
      return {
        ...state,
      }
  }
};
