import axios, { AxiosResponse } from "axios";
import { push } from "connected-react-router";

export const SIGNUP_REQUESTED = "user/SIGNUP_REQUESTED";
export const SIGNUP_SUCCESS = "user/SIGNUP_SUCCESS";
export const SIGNUP_FAIL = "user/SIGNUP_FAIL";

const initialState = {
  isLoading: false
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SIGNUP_REQUESTED:
      return {
        ...state,
        isLoading: true
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        error: undefined,
        isLoading: false,
        email: action.email,
        token: action.token
      };

    case SIGNUP_FAIL:
      return {
        ...state,
        error: action.error.message,
        isLoading: false
      };
    default:
      return state;
  }
};

export const signup = (email: string) => {
  return (dispatch: any) => {
    dispatch({
      type: SIGNUP_REQUESTED
    });

    const url = "https://api-iddog.idwall.co/signup";
    axios
      .post(url, {
        email
      })
      .then(response => {
        dispatch(push("/feed"));
        dispatch({
          type: SIGNUP_SUCCESS,
          email: response.data.user.email,
          token: response.data.user.token
        });
      })
      .catch((response: AxiosResponse) => {
        dispatch({
          type: SIGNUP_FAIL,
          error: response
        });
      });
  };
};
