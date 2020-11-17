import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL } from '../types/loginTypes';
import axios from 'axios';

export const loginAction = (data) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const res = await axios.post(
      'https://phantom-cabal-staging.herokuapp.com/api/v1/auth/login',
      data
    );
    return dispatch(loginSuccess(res));
  } catch (error) {
    if (error.response) {
      const errorMessage = await error.response.data.message;
      return dispatch(loginFails(errorMessage));
    } else {
      return dispatch(loginFails('Network Error'));
    }
  }
};

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};

export const loginFails = (error) => {
  return {
    type: LOGIN_FAIL,
    payload: error,
  };
};
