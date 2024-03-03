import { useSelector } from "react-redux";
import { RootState } from "../../store";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay() {
  const accountBalance = useSelector(
    (state: RootState) => state.account.balance
  );

  return <div className="balance">{formatCurrency(accountBalance)}</div>;
}

export default BalanceDisplay;
