import { put } from "redux-saga/effects";
import * as actions from "../Store/Actions/index";
import Axios from "../AxiosInstance/InstanceOrder";

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());
  const response = Axios.post(
    "/orders.json?auth=" + action.token,
    action.orderData
  );
  try {
    yield put(actions.purchaseBurgerSuccess(response.data, action.orderData));
  } catch (error) {
    yield put(actions.purchaseBurgerFailed(error));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrdersStart());
  const queryParam =
    "?auth=" +
    action.token +
    '&orderBy="userId"&equalTo="' +
    action.userId +
    '"';
  try {
    const res = yield Axios.get("/orders.json" + queryParam);
    const orders = [];
    for (let key in res.data) {
      orders.push({ ...res.data[key], id: key });
    }
    yield put(actions.fetchOrdersSuccess(orders));
  } catch (err) {
    yield put(actions.fetchOrdersFailed(err));
  }
}
