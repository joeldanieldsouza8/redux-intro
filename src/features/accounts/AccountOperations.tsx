import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AccountAction,
  deposit,
  payLoan,
  requestLoan,
  withdraw,
} from "./accountSlice";
import { RootState } from "../../store";
import { Dispatch } from "redux";

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [withdrawalAmount, setWithdrawalAmount] = useState<string>("");
  const [loanAmount, setLoanAmount] = useState<string>("");
  const [loanPurpose, setLoanPurpose] = useState<string>("");
  const [currency, setCurrency] = useState<string>("USD");

  const dispatch: Dispatch<AccountAction> = useDispatch();
  const currentLoan = useSelector((state: RootState) => state.account.loan);
  const currentLoanPurpose = useSelector(
    (state: RootState) => state.account.loanPurpose
  );
  const isLoading = useSelector((state: RootState) => state.account.isLoading);

  function handleDeposit() {
    // Guard clause
    if (!depositAmount) return;

    const action = deposit(Number(depositAmount), currency);
    dispatch(action as AccountAction);

    // Clear the input field
    setDepositAmount("");

    // Reset the currency to USD
    setCurrency("USD");
  }

  function handleWithdrawal() {
    // Guard clause
    if (!withdrawalAmount) return;

    const action = withdraw(Number(withdrawalAmount));
    dispatch(action as AccountAction);

    // Clear the input field
    setWithdrawalAmount("");
  }

  function handleRequestLoan() {
    // Guard clause
    if (!loanAmount || !loanPurpose) return;

    const action = requestLoan(Number(loanAmount), loanPurpose);
    dispatch(action as AccountAction); // Type assertion to AccountAction type to avoid TypeScript error on dispatch call

    // Clear the input field
    setLoanAmount("");
  }

  function handlePayLoan() {
    const action = payLoan();
    dispatch(action as AccountAction);

    // Clear the input field
    setLoanAmount("");
    setLoanPurpose("");
  }

  function handleDepositChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDepositAmount(e.target.value);
  }

  function handleWithdrawalChange(e: React.ChangeEvent<HTMLInputElement>) {
    setWithdrawalAmount(e.target.value);
  }

  function handleLoanChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLoanAmount(e.target.value);
  }

  function handlePurposeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLoanPurpose(e.target.value);
  }

  function handleCurrencyChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setCurrency(e.target.value);
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={handleDepositChange}
          />
          <select value={currency} onChange={handleCurrencyChange}>
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          <button onClick={handleDeposit} disabled={isLoading}>
            {isLoading ? "Converting..." : `Deposit ${depositAmount}`}
          </button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={handleWithdrawalChange}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={handleLoanChange}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={handlePurposeChange}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>

        {currentLoan > 0 && (
          <div>
            <span>
              Pay back ${currentLoan} ({currentLoanPurpose})
            </span>
            <button onClick={handlePayLoan}>Pay loan</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountOperations;
