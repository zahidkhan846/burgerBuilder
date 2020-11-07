import { takeEvery, all, takeLatest } from "redux-saga/effects";
import * as actionTypes from "../Store/Actions/actionTypes";
import {
  authLogoutSaga,
  checkAuthSessionSaga,
  authSaga,
  checkAuthExpStateSaga,
} from "./authSaga";
import { initIngredientsSaga } from "./burgerBuilderSaaga";
import { purchaseBurgerSaga, fetchOrdersSaga } from "./orderSaga";

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_CHECK_SESSION, checkAuthSessionSaga),
    takeEvery(actionTypes.AUTH_INIT_LOGOUT, authLogoutSaga),
    takeEvery(actionTypes.AUTH_USER, authSaga),
    takeEvery(actionTypes.AUTH_CHECK_EXP_STATE, checkAuthExpStateSaga),
  ]);
}

export function* watchBurger() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}
export function* watchOrder() {
  yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}
