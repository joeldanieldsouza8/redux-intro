// import store from "../../store";

export interface CustomerState {
  fullName: string;
  nationalID: string;
  createdAt: string;
}

const initialStateCustomer: CustomerState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

export type CustomerAction =
  | { type: "customer/create"; customerCreatePayload: CustomerState }
  | { type: "customer/updateName"; customerUpdateNamePayload: string }
  | { type: "customer/delete" };

export default function customerReducer(
  state: CustomerState = initialStateCustomer,
  action: CustomerAction
): CustomerState {
  switch (action.type) {
    case "customer/create": {
      return {
        ...state,
        fullName: action.customerCreatePayload.fullName,
        nationalID: action.customerCreatePayload.nationalID,
        createdAt: action.customerCreatePayload.createdAt,
      };
    }

    case "customer/updateName": {
      return {
        ...state,
        fullName: action.customerUpdateNamePayload,
      };
    }

    case "customer/delete": {
      return {
        ...state,
        fullName: "",
        nationalID: "",
        createdAt: "",
      };
    }

    default:
      return state;
  }
}

// Action creators
// function createCustomer(fullName: string, nationalID: string) {
//   store.dispatch({
//     type: "customer/create",
//     customerCreatePayload: {
//       fullName,
//       nationalID,
//       createdAt: new Date().toISOString(),
//     },
//   });
// }

// function updateCustomerName(fullName: string) {
//   store.dispatch({
//     type: "customer/updateName",
//     customerUpdateNamePayload: fullName,
//   });
// }

// function deleteCustomer() {
//   store.dispatch({ type: "customer/delete" });
// }

// Action creators
function createCustomer(fullName: string, nationalID: string) {
  return {
    type: "customer/create",
    customerCreatePayload: {
      fullName,
      nationalID,
      createdAt: new Date().toISOString(),
    },
  };
}

function updateCustomerName(fullName: string) {
  return {
    type: "customer/updateName",
    customerUpdateNamePayload: fullName,
  };
}

function deleteCustomer() {
  return {
    type: "customer/delete",
  };
}

export { createCustomer, updateCustomerName, deleteCustomer };
