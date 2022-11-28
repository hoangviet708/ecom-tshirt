import { createContext, useReducer } from "react";

const defaultState = {
  auth: {
    username: "",
    isLogged: false,
  },
  cart: [],
};

const stateReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_AUTH":
      return {
        ...state,
        auth: {
          ...state.auth,
          isLogged: true,
          username: payload.username,
        },
      };

    case "ADD_TO_CART":
      const newState = { ...state };
      newState.cart.push(payload);
      return newState;
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.keyId !== payload),
      };
    case "UPDATE_CART":
      const newStateUpdate = {
        ...state,
        cart: state.cart.map((obj) => {
          if (obj.keyId === payload.keyId) {
            return { ...obj, quantity: payload.qty };
          }
          return obj;
        }),
      };
      return newStateUpdate;

    default:
      return state;
  }
};

export const StateContext = createContext({ state: defaultState });

const StateContextProvider = ({ children }) => {
  const [state, dispatchState] = useReducer(
    stateReducer,
    Object.assign({}, defaultState)
  );

  return (
    <StateContext.Provider value={{ state, dispatchState }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
