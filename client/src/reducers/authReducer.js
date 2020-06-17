import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  ROLE_CREATION_SUCCESS,
  ROLE_CREATION_FAIL, 
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_SUCCESS,
  CLEAR_SUCCESS
} from '../actions/types';

const initialState = {
  token: null,
  isAuthenticated: null,
  isLoading: false,
  user: null,
  success: false,
  msg: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
        token:localStorage.getItem('token')
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
        // token:localStorage.getItem('token')
      };
    case LOGIN_SUCCESS:
        localStorage.setItem('token', action.payload.token);
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          isLoading: false,
          token:action.payload.token
        };
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        token:action.payload.token
      };
    case PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        success: true
      }
    case PASSWORD_RESET_FAIL:
      return {
        ...state,
      }
    case CLEAR_SUCCESS:
      return {
        ...state,
        success: false
      }
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    default:
      return state;
  }
}
