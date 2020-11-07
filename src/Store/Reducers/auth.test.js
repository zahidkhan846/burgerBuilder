import reducer from "./auth";
import * as actionTypes from "../Actions/actionTypes";

describe("auth reducer", () => {
  it("should render the initial state of auth reducer", () => {
    expect(reducer(undefined, {})).toEqual({
      //initial state = undifined, action = no action so empty object {}
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });
  it("should store key on login", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: "/",
        },
        { type: actionTypes.AUTH_SUCCESS, idToken: "token", userId: "userId" }
      )
    ).toEqual({
      token: "token",
      userId: "userId",
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });
});
