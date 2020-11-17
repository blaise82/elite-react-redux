import { cleanup } from '@testing-library/react';
import reducer from '../redux/reducers/loginReducer';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from '../redux/types/loginTypes';

describe('REDUCERS', () => {
  const initialState = {
    loading: 'none',
    data: [],
    error: '',
  };
  const payload = {
    status: 200,
    message: 'Login true',
    data: {
      id: 123,
      email: 'email@gmail.com',
    },
  };

  afterEach(cleanup);

  it('INIT', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('LOGIN_REQUEST', () => {
    expect(reducer(initialState, { type: LOGIN_REQUEST })).toEqual({
      ...initialState,
      loading: 'block',
    });
  });

  it('LOGIN_SUCCESS', () => {
    expect(
      reducer(initialState, {
        type: LOGIN_SUCCESS,
        payload,
      })
    ).toEqual({
      loading: 'none',
      data: payload,
      error: '',
    });
  });

  it('LOGIN_FAIL', () => {
    const action = {
      type: LOGIN_FAIL,
      payload: 'Login error',
    };

    expect(reducer(initialState, action)).toEqual({
      loading: 'none',
      data: [],
      error: 'Login error',
    });
  });
});
