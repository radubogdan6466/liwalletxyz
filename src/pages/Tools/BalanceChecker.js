import React, { useState } from "react";
import axios from "axios";
import "./BalanceChecker.css";
const BalanceChecker = () => {
  const [wallet, setWallet] = useState("");
  const [blockchain, setBlockchain] = useState("ethereum");
  const [balance, setBalance] = useState(null);
  const [allTokens, setAllTokens] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setWallet(e.target.value);
  };

  const handleBlockchainChange = (e) => {
    setBlockchain(e.target.value);
  };

  const handleCheckBalance = async () => {
    try {
      const response = await axios.post("http://localhost:5000/getBalances", {
        wallet,
        blockchain,
      });
      setBalance(response.data);
      setError("");
    } catch (err) {
      setError("Error fetching balance. Please try again.");
      setBalance(null);
    }
  };

  const handleGetAllTokens = async () => {
    try {
      const response = await axios.post("http://localhost:5000/getAllTokens", {
        wallet,
      });
      setAllTokens(response.data);
      setError("");
    } catch (err) {
      setError("Error fetching all tokens. Please try again.");
      setAllTokens(null);
    }
  };

  return (
    <div>
      <h1>Check Wallet Balance</h1>
      <input
        type="text"
        value={wallet}
        onChange={handleInputChange}
        placeholder="Enter wallet address"
      />
      <select value={blockchain} onChange={handleBlockchainChange}>
        <option value="ethereum">Ethereum</option>
        <option value="bsc">Binance Smart Chain</option>
        <option value="polygon">Polygon Matic</option>
      </select>
      <button onClick={handleCheckBalance}>Check Balance</button>
      <button onClick={handleGetAllTokens}>Get All Tokens</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {balance && (
        <div>
          <h2>Balance</h2>
          {balance.eth && <p>ETH: {balance.eth}</p>}
          <h3>Tokens:</h3>
          <ul>
            {Object.keys(balance.tokens).map(
              (token) =>
                balance.tokens[token] > 0 && (
                  <li key={token}>
                    {token}: {balance.tokens[token]}
                  </li>
                )
            )}
          </ul>
        </div>
      )}

      {allTokens && (
        <div>
          <h2>All Tokens</h2>
          <ul>
            {Object.keys(allTokens).map((contractAddress) => (
              <li key={contractAddress}>
                {allTokens[contractAddress].tokenName} (
                {allTokens[contractAddress].tokenSymbol}):{" "}
                {allTokens[contractAddress].balance}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BalanceChecker;
