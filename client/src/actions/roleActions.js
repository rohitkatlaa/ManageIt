import axios from 'axios';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';

import {
  ROLE_CREATION_SUCCESS,
  ROLE_CREATION_FAIL,
  GET_ROLES
} from './types';

// Register Role
export const createRole = ({ name, primaryCategory, subCategory, deletePermission, statusPermission, minDays, minVotes, pushComplain }) => (dispatch,getState) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify({ name, primaryCategory, subCategory, deletePermission, statusPermission, minDays, minVotes, pushComplain });
  axios
  
    .post('/api/roles', body,  tokenConfig(getState))
    .then(res =>{
      dispatch({
        type: ROLE_CREATION_SUCCESS,
        payload: res.data
      })
    }
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'ROLE_CREATION_FAIL')
      );
      dispatch({
        type: ROLE_CREATION_FAIL
      });
    });
};

export const getRoles = () => (dispatch, getState) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  axios
    .get('/api/roles', config)
    .then(res =>{
      console.log(res);
      dispatch({
        type: GET_ROLES,
        payload: res.data
      })
    }
    )
    .catch(err =>{
      dispatch(returnErrors(err.response.data, err.response.status))
    }
    );
};
