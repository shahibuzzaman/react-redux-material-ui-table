import axios from 'axios';
import {
  USER_ROLE_REQUEST,
  USER_ROLE_SUCCESS,
  USER_ROLE_FAIL,
} from '../constants/userRoleConstant';

export const userRoleList = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_ROLE_REQUEST,
    });

    const { data } = await axios.get(
      'http://bbox.clonestudiobd.com/api/userroles',
    );

    dispatch({
      type: USER_ROLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_ROLE_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};
