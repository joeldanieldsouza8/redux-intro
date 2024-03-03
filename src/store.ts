import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

// Use combineReducers to combine slices into a rootReducer
// No need to explicitly type this as TypeScript can infer the type
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// Store type
export type RootState = ReturnType<typeof rootReducer>;

// Create the store
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
