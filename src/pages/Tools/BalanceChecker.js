import React, { useState } from "react";
import axios from "axios";
import "./BalanceChecker.css";

const BalanceChecker = () => {
  const [wallet, setWallet] = useState("");
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setWallet(e.target.value);
  };

  const handleCheckBalance = async () => {
    if (!wallet) {
      setError("Please enter a wallet address.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/getBalances", {
        wallet,
      });
      setBalance(response.data);
      setError("");
    } catch (err) {
      setError("Error fetching balance. Please try again.");
      setBalance(null);
    }
  };

  return (
    <div>
      <h1>Check Wallet Balance</h1>
      <input
        className="InputKey"
        type="text"
        value={wallet}
        onChange={handleInputChange}
        placeholder="Enter wallet address"
      />
      <button className="GenerateBtn" onClick={handleCheckBalance}>
        Check Balance
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {balance && (
        <div>
          <h2>Balance</h2>
          {Object.entries(balance).map(([blockchain, data]) => (
            <div key={blockchain}>
              <h3>
                {blockchain.charAt(0).toUpperCase() + blockchain.slice(1)}
              </h3>
              <p>ETH: {data.eth}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BalanceChecker;
