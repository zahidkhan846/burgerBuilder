import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_INIT_LOGOUT,
  };
};

export const authLogoutSuccess = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const authCheckTimeout = (expTime) => {
  return {
    type: actionTypes.AUTH_CHECK_SESSION,
    expTime: expTime,
  };
};

export const auth = (email, password, isSignUp) => {
  return {
    type: actionTypes.AUTH_USER,
    email: email,
    password: password,
    isSignUp: isSignUp,
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const checkAuthExpState = () => {
  return {
    type: actionTypes.AUTH_CHECK_EXP_STATE,
  };
};
