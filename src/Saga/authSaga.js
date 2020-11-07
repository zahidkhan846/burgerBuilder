import { put, delay, call } from "redux-saga/effects";
import * as actions from "../Store/Actions/index";
import axios from "axios";

const DEFAULT_URL =
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBk1iNCNf49KnKA4Zjws2sl8zMciOYjMD0";
const SIGNIN_URL =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBk1iNCNf49KnKA4Zjws2sl8zMciOYjMD0";

export function* authLogoutSaga(action) {
  yield call([localStorage, "removeItem"], "token");
  yield call([localStorage, "removeItem"], "expDate");
  yield call([localStorage, "removeItem"], "userId");
  yield put(actions.authLogoutSuccess());
}

export function* checkAuthSessionSaga(action) {
  yield delay(action.expTime * 1000);
  yield put(actions.authLogout());
}

export function* authSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  let url = DEFAULT_URL;
  if (!action.isSignUp) {
    url = SIGNIN_URL;
  }
  try {
    const response = yield axios.post(url, authData);
    const expDate = new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("expDate", expDate);
    yield localStorage.setItem("userId", response.data.localId);
    yield put(
      actions.authSuccess(response.data.idToken, response.data.localId)
    );
    yield put(actions.authCheckTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(actions.authFail(error.response.data.error));
  }
}

export function* checkAuthExpStateSaga(action) {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actions.authLogout());
  } else {
    const expDate = yield new Date(localStorage.getItem("expDate"));
    if (expDate <= new Date()) {
      yield put(actions.authLogout());
    } else {
      const userId = yield localStorage.getItem("userId");
      yield put(actions.authSuccess(token, userId));
      yield put(
        actions.authCheckTimeout(
          (expDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
}
// expDate as in future date & new Date() as in current date
// and if future date is greater then the current date that means we have token
// and expiresIn(token expriration time) so user is logged in
