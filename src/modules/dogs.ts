import axios, { AxiosResponse } from "axios";
import { store } from "../store";

export const LIST_REQUESTED = "dogs/LIST_REQUESTED";
export const LIST_SUCCESS = "dogs/LIST_SUCCESS";
export const LIST_FAIL = "dogs/LIST_FAIL";
export const SELECT_DOG = "dogs/SELECT_DOG";
export const UNSELECT_DOG = "dogs/UNSELECT_DOG";

const initialState = {
  isLoading: false,
  dogs: [],
  selectedDog: undefined
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case LIST_REQUESTED:
      return {
        ...state,
        isLoading: true
      };

    case LIST_SUCCESS:
      return {
        ...state,
        error: undefined,
        isLoading: false,
        list: action.list
      };

    case LIST_FAIL:
      return {
        ...state,
        error: action.error.message,
        isLoading: false
      };

    case SELECT_DOG:
      return {
        ...state,
        selectedDog: action.selectedDog
      };

    case UNSELECT_DOG:
      return {
        ...state,
        selectedDog: undefined
      };
    default:
      return state;
  }
};

export const listDogs = (category: string) => {
  return (dispatch: any) => {
    dispatch({
      type: LIST_REQUESTED
    });

    const url = "https://api-iddog.idwall.co/feed";
    axios
      .get(url, {
        headers: {
          Authorization: store.getState().user.token
        },
        params: {
          category
        }
      })
      .then(response => {
        dispatch({
          type: LIST_SUCCESS,
          list: response.data.list
        });
      })
      .catch((response: AxiosResponse) => {
        dispatch({
          type: LIST_FAIL,
          error: response
        });
      });
  };
};

export const selectDog = (category: string, index: number) => {
  return (dispatch: any) => {
    dispatch({
      type: SELECT_DOG,
      selectedDog: {
        category,
        index
      }
    });
  };
};

export const unselectDog = () => {
  return (dispatch: any) => {
    dispatch({
      type: UNSELECT_DOG
    });
  };
};
