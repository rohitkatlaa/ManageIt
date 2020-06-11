import axios from 'axios';
import { returnErrors } from './errorActions';

import {
  MASS_REGISTRATION_SUCCESS,
  MASS_REGISTRATION_FAIL
} from './types';

export const mass_register = (emailIds) => (dispatch, getState) => {

  // Request body
  const body = JSON.stringify({emailIds: emailIds});

  axios
    .post('/api/users/multiple', body, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: MASS_REGISTRATION_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'MASS_REGISTRATION_FAIL')
      );
      dispatch({
        type: MASS_REGISTRATION_FAIL
      });
    });
};

export const tokenConfig = getState => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};

