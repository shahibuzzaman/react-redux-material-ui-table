import axios from 'axios';
import {
  USER_ROLE_REQUEST,
  USER_ROLE_SUCCESS,
  USER_ROLE_FAIL,
  USER_ROLE_CREATE_REQUEST,
  USER_ROLE_CREATE_SUCCESS,
  USER_ROLE_CREATE_FAIL,
  USER_ROLE_UPDATE_REQUEST,
  USER_ROLE_UPDATE_SUCCESS,
  USER_ROLE_UPDATE_FAIL,
  USER_ROLE_UPDATE_RESET,
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

export const userRoleCreateAction = (
  role_name,
  role_descriotion,
  role_status,
  created_by,
  modified_by,
) => async (dispatch) => {
  try {
    dispatch({
      type: USER_ROLE_CREATE_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    const { data } = await axios.post(
      'http://bbox.clonestudiobd.com/api/userroles',
      {
        role_name,
        role_descriotion,
        role_status,
        created_by,
        modified_by,
      },
      config,
    );

    console.log(
      'data4',
      role_name,
      role_descriotion,
      role_status,
      created_by,

      modified_by,
    );

    dispatch({
      type: USER_ROLE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_ROLE_CREATE_FAIL,
      payload:
        error.response && error.response.data.errors
          ? error.response.data.errors
          : error.errors,
    });
  }
};

export const userRoleUpdateAction = (roleCreates) => async (dispatch) => {
  try {
    dispatch({
      type: USER_ROLE_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    const { data } = await axios.put(
      `http://bbox.clonestudiobd.com/api/userroles/${roleCreates.id}`,
      roleCreates,
      config,
    );

    dispatch({
      type: USER_ROLE_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_ROLE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.errors
          ? error.response.data.errors
          : error.errors,
    });
  }
};
