
import {
  ROLE_CREATION_SUCCESS,
  ROLE_CREATION_FAIL,
  GET_ROLES
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
    case ROLE_CREATION_SUCCESS:
      return{
        ...state
      }
    case GET_ROLES:
      return {
        ...state,
        roles: action.payload,
        token: localStorage.getItem("token"),
        loading: false
      }
  }
}