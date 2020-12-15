import {
  USER_ROLE_REQUEST,
  USER_ROLE_SUCCESS,
  USER_ROLE_FAIL,
  USER_ROLE_CREATE_REQUEST,
  USER_ROLE_CREATE_SUCCESS,
  USER_ROLE_CREATE_FAIL,
  USER_ROLE_CREATE_RESET,
  USER_ROLE_UPDATE_REQUEST,
  USER_ROLE_UPDATE_SUCCESS,
  USER_ROLE_UPDATE_FAIL,
  USER_ROLE_UPDATE_RESET,
} from '../constants/userRoleConstant';

export const userRoleReducer = (state = { roles: [] }, action) => {
  switch (action.type) {
    case USER_ROLE_REQUEST:
      return { loading: true, roles: [] };
    case USER_ROLE_SUCCESS:
      return { loading: false, roles: action.payload };
    case USER_ROLE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userRoleCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ROLE_CREATE_REQUEST:
      return { loading: true };
    case USER_ROLE_CREATE_SUCCESS:
      return { loading: false, roleCreates: action.payload };
    case USER_ROLE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_ROLE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const userRoleUpdateReducer = (state = { roleCreates: {} }, action) => {
  switch (action.type) {
    case USER_ROLE_UPDATE_REQUEST:
      return { loading: true };
    case USER_ROLE_UPDATE_SUCCESS:
      return { loading: false, roleCreates: action.payload };
    case USER_ROLE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_ROLE_UPDATE_RESET:
      return { roleCreates: {} };
    default:
      return state;
  }
};
