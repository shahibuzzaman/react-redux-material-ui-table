import {
  USER_ROLE_REQUEST,
  USER_ROLE_SUCCESS,
  USER_ROLE_FAIL,
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
