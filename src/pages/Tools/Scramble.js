import React, { useState, useCallback, useRef, useEffect } from "react";
import "./Scramble.css";

const Scramble = () => {
  const [inputKey, setInputKey] = useState("");
  const [numberOfScrambles, setNumberOfScrambles] = useState(20);
  const [network, setNetwork] = useState("https://ethereum-rpc.publicnode.com");
  const [customRpcUrl, setCustomRpcUrl] = useState("");
  const [scrambleResults, setScrambleResults] = useState([]);
  const [addressesFound, setAddressesFound] = useState(0);
  const [providerUrl, setProviderUrl] = useState(network);
  const [currency, setCurrency] = useState("ETH");

  const socketRef = useRef(null);
  const isWebSocketOpenRef = useRef(false);

  const setupWebSocket = useCallback(() => {
    socketRef.current = new WebSocket("wss://ethkey-o4ua.onrender.com");

    socketRef.current.onopen = () => {
      console.log("WebSocket connection established");
      isWebSocketOpenRef.current = true;
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const resultElement = (
        <div key={data.key}>
          <p
            style={{
              color: parseFloat(data.balance) > 0 ? "green" : "white",
              fontSize: "10px",
            }}
          >
            {data.key} - {data.balance} {data.currency}
          </p>
        </div>
      );

      setScrambleResults((prevResults) => [...prevResults, resultElement]);

      if (parseFloat(data.balance) > 0) {
        setAddressesFound((prev) => prev + 1);
      }
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket connection closed");
      isWebSocketOpenRef.current = false;
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }, []);

  const updateProviderUrl = useCallback(() => {
    if (network === "custom") {
      setProviderUrl(customRpcUrl);
      setCurrency("CUSTOM");
    } else {
      setProviderUrl(network);
      const selectedNetwork = document.querySelector(
        `option[value="${network}"]`
      );
      setCurrency(selectedNetwork?.getAttribute("data-name") || "ETH");
    }
  }, [network, customRpcUrl]);

  useEffect(() => {
    setupWebSocket();
    updateProviderUrl();
  }, [setupWebSocket, updateProviderUrl]);

  const isValidEthereumKey = (key) => /^[0-9a-fA-F]{64}$/.test(key.trim());

  const generateAndCheck = async () => {
    if (!isValidEthereumKey(inputKey)) {
      alert("Invalid private key.");
      return;
    }

    if (numberOfScrambles <= 0) {
      alert("Invalid number of scrambles.");
      return;
    }

    if (!isWebSocketOpenRef.current) {
      console.log("WebSocket not open yet, retrying...");
      setTimeout(generateAndCheck, 1000);
      return;
    }

    socketRef.current.send(
      JSON.stringify({
        input: inputKey,
        providerUrl,
        currency,
        numberOfScrambles,
      })
    );
  };

  const clearResults = () => {
    setScrambleResults([]);
    setAddressesFound(0);
  };

  return (
    <div className="MainContent">
      <h1>Ethereum Key Scramble & Balance Checker</h1>

      <input
        className="InputKey"
        type="text"
        placeholder="Insert private key"
        value={inputKey}
        onChange={(e) => setInputKey(e.target.value)}
      />
      <input
        className="InputKey"
        type="number"
        placeholder="Number of Scrambles"
        value={numberOfScrambles}
        onChange={(e) => setNumberOfScrambles(parseInt(e.target.value))}
      />

      <div>
        <label htmlFor="network">Select Network:</label>
        <select
          id="network"
          value={network}
          onChange={(e) => setNetwork(e.target.value)}
        >
          <option value="https://ethereum-rpc.publicnode.com" data-name="ETH">
            Ethereum
          </option>
          <option value="https://bsc-dataseed.binance.org/" data-name="BNB">
            Binance Smart Chain
          </option>
          <option value="https://polygon.llamarpc.com" data-name="MATIC">
            Polygon (MATIC)
          </option>
          <option value="https://arb1.arbitrum.io/rpc" data-name="ARB">
            Arbitrum
          </option>
          <option value="custom" data-name="CUSTOM">
            Custom RPC
          </option>
        </select>
      </div>

      {network === "custom" && (
        <div>
          <label htmlFor="customRpcUrl">Custom RPC URL:</label>
          <input
            type="text"
            id="customRpcUrl"
            placeholder="Enter custom RPC URL"
            value={customRpcUrl}
            onChange={(e) => setCustomRpcUrl(e.target.value)}
          />
        </div>
      )}

      <p>Addresses found with balance > 0: {addressesFound}</p>

      <div className="buttons">
        <button className="GenerateBtn" onClick={generateAndCheck}>
          Generate & Check
        </button>
      </div>

      <div className="scrambleResults">
        <span className="spanresult">{scrambleResults}</span>
      </div>

      <button className="ClearBtn" onClick={clearResults}>
        Clear Results
      </button>
    </div>
  );
};

export default Scramble;
