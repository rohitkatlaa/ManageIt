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

   // Checking password matching in frontend itself before sending request to server
   const body = JSON.stringify({ newPassword, verifyPassword });

   if(newPassword!==verifyPassword){
        dispatch(
          returnErrors({msg: "Passwords Don't Match"}, 400, 'PASSWORD_RESET_FAIL')
        );
        dispatch({
          type: PASSWORD_RESET_FAIL
        });
   }

   //post request to server if passwords match
   else{
      axios.post('/api/reset', body, tokenConfig(getState))
      .then(res => {
        dispatch({
          type: PASSWORD_RESET_SUCCESS,
          payload: res.data
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
  }
};