import { useSelector } from "react-redux";
import { RootState } from "../../store";

function Customer() {
  const customer = useSelector((state: RootState) => state.customer.fullName);

  // console.log(customer); // debug

  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
