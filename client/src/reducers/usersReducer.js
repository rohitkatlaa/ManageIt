
import {
  MASS_REGISTRATION_SUCCESS,
  MASS_REGISTRATION_FAIL
} from '../actions/types';

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
  role: []
};

export default function(state = initialState, action){
  switch(action.type){
    case MASS_REGISTRATION_SUCCESS:
      return{
        ...state
      }
    case MASS_REGISTRATION_FAIL:
      return {
        ...state,
      }
  }
}