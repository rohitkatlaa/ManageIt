import axios from 'axios';
import {
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_SUCCESS
} from './types';
import { returnErrors, clearErrors } from './errorActions';
import { tokenConfig } from './authActions';

//resets Password
export const resetPassword = ({newPassword, verifyPassword}) => (dispatch, getState) => {

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

   // Request body
   const body = JSON.stringify({ newPassword, verifyPassword });

   axios.post('/api/reset', body, tokenConfig(getState))
        .then(res => {
          dispatch({
            type: PASSWORD_RESET_SUCCESS
          });
        })
        .catch(err => {
          dispatch(
            returnErrors(err.response.data, err.response.status, 'PASSWORD_RESET_FAIL')
          );
          dispatch({
            type: PASSWORD_RESET_FAIL
        });
      })
};