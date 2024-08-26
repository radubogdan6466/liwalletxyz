import React, { useState, useEffect } from "react";
import "./Scramble.css";

const Scramble = () => {
  const [inputKey, setInputKey] = useState("");
  const [numberOfScrambles, setNumberOfScrambles] = useState(20);
  const [network, setNetwork] = useState("https://ethereum-rpc.publicnode.com");
  const [customRpcUrl, setCustomRpcUrl] = useState("");
  const [scrambleResults, setScrambleResults] = useState([]);
  const [addressesFound, setAddressesFound] = useState(0);
  const [autoCheckRunning, setAutoCheckRunning] = useState(false);
  const [providerUrl, setProviderUrl] = useState(network);
  const [currency, setCurrency] = useState("ETH");

  let autoCheckInterval;
  let socket;
  let isWebSocketOpen = false;

  useEffect(() => {
    setupWebSocket();
    updateProviderUrl(); // Setează provider-ul și moneda inițială
  }, [setupWebSocket, updateProviderUrl]); // Include setupWebSocket și updateProviderUrl în matricea de dependențe

  const setupWebSocket = React.useCallback(() => {
    socket = new WebSocket("wss://ethkey-o4ua.onrender.com");

    socket.onopen = () => {
      console.log("WebSocket connection established");
      isWebSocketOpen = true;
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const resultElement = (
        <div key={data.key}>
          <p
            style={{
              color: parseFloat(data.balance) > 0 ? "green" : "white",
              fontSize: "18px",
            }}
          >
            {data.key} - {data.balance} {data.currency}
          </p>
        </div>
      );

      setScrambleResults((prevResults) => [...prevResults, resultElement]);

      // Dacă balanța este mai mare de 0, oprește auto-check-ul
      if (parseFloat(data.balance) > 0) {
        setAddressesFound((prev) => prev + 1);
        clearInterval(autoCheckInterval);
        setAutoCheckRunning(false);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
      isWebSocketOpen = false;
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }, []); // Utilizează React.useCallback pentru a evita recrearea funcției la fiecare re-render

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

    if (!isWebSocketOpen) {
      console.log("WebSocket not open yet, retrying...");
      setTimeout(generateAndCheck, 1000);
      return;
    }

    socket.send(
      JSON.stringify({
        input: inputKey,
        providerUrl,
        currency,
        numberOfScrambles,
      })
    );
  };

  const startAutoCheck = () => {
    if (autoCheckRunning) return;
    setAutoCheckRunning(true);

    autoCheckInterval = setInterval(async () => {
      await generateAndCheck();
    }, 20000); // Verifică la fiecare 20 secunde
  };

  const stopAutoCheck = () => {
    clearInterval(autoCheckInterval);
    setAutoCheckRunning(false);
  };

  const updateProviderUrl = () => {
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
        <button
          className="AutoBtn"
          onClick={startAutoCheck}
          disabled={autoCheckRunning}
        >
          Start Autocheck
        </button>
        <button
          className="StopBtn"
          onClick={stopAutoCheck}
          disabled={!autoCheckRunning}
        >
          Stop Autocheck
        </button>
      </div>

      <div className="scrambleResults">{scrambleResults}</div>

      <button className="ClearBtn" onClick={clearResults}>
        Clear Results
      </button>
    </div>
  );
};

export default Scramble;
