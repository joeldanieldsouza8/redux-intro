// import store from "../../store";

import { Dispatch } from "redux";

export interface AccountState {
  balance: number;
  loan: number;
  loanPurpose: string;
  isLoading: boolean;
}

const intialStateAccount: AccountState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

export type AccountAction =
  | { type: "account/deposit"; depositPayload: number }
  | { type: "account/withdraw"; withdrawPayload: number }
  | {
      type: "account/requestLoan";
      requestLoanPayload: { loanAmount: number; loanPurpose: string };
    }
  | { type: "account/payLoan" }
  | { type: "account/convertingCurrency" };

export default function accountReducer(
  state: AccountState = intialStateAccount,
  action: AccountAction
): AccountState {
  switch (action.type) {
    case "account/deposit": {
      return {
        ...state,
        balance: state.balance + action.depositPayload,
        isLoading: false,
      };
    }

    case "account/withdraw": {
      return {
        ...state,
        balance: state.balance - action.withdrawPayload,
      };
    }

    case "account/requestLoan": {
      // Check if there isn't a loan already
      if (state.loan > 0) return state;

      return {
        ...state,
        loan: action.requestLoanPayload.loanAmount,
        loanPurpose: action.requestLoanPayload.loanPurpose,
        balance: state.balance + action.requestLoanPayload.loanAmount,
      };
    }

    case "account/payLoan": {
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        loanPurpose: "",
      };
    }

    case "account/convertingCurrency": {
      return {
        ...state,
        isLoading: true,
      };
    }

    default:
      return state;
  }
}

// Action creators
// function deposit(amount: number) {
//   store.dispatch({ type: "account/deposit", depositPayload: amount });
// }

// function withdraw(amount: number) {
//   store.dispatch({ type: "account/withdraw", withdrawPayload: amount });
// }

// function requestLoan(loanAmount: number, loanPurpose: string) {
//   store.dispatch({
//     type: "account/requestLoan",
//     requestLoanPayload: { loanAmount, loanPurpose },
//   });
// }

// function payLoan() {
//   store.dispatch({ type: "account/payLoan" });
// }

// Action creators
function deposit(amount: number, currency: string) {
  if (currency === "USD") {
    return { type: "account/deposit", depositPayload: amount };
  }

  return async function (dispatch: Dispatch<AccountAction>): Promise<void> {
    dispatch({ type: "account/convertingCurrency" });

    try {
      // API call
      const host = "api.frankfurter.app";
      const response = await fetch(
        `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`
      );
      const data = await response.json();
      console.log(data); // debug

      const convertedAmount = data.rates.USD;

      // Return the action
      dispatch({ type: "account/deposit", depositPayload: convertedAmount });
    } catch (error) {
      console.error(error);
    }
  };
}

function withdraw(amount: number) {
  return { type: "account/withdraw", withdrawPayload: amount };
}

function requestLoan(loanAmount: number, loanPurpose: string) {
  return {
    type: "account/requestLoan",
    requestLoanPayload: { loanAmount, loanPurpose },
  };
}

function payLoan() {
  return { type: "account/payLoan" };
}

export { deposit, withdraw, requestLoan, payLoan };
