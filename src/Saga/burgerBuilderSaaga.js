import Axios from "../AxiosInstance/InstanceOrder";
import * as actions from "../Store/Actions/index";
import { put } from "redux-saga/effects";

export function* initIngredientsSaga(action) {
  const response = yield Axios.get("ingredients.json");
  try {
    yield put(actions.setIngredients(response.data));
  } catch (error) {
    yield put(actions.fetchIngsFailed());
  }
}
