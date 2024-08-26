import React, { useState, useCallback, useRef, useEffect } from "react";
import "./Scramble.css";
import { FaCopy } from "react-icons/fa"; // Ensure react-icons is installed

const Scramble = () => {
  const [inputKey, setInputKey] = useState("");
  const [numberOfScrambles, setNumberOfScrambles] = useState();
  const [network, setNetwork] = useState("https://ethereum-rpc.publicnode.com");
  const [customRpcUrl, setCustomRpcUrl] = useState("");
  const [scrambleResults, setScrambleResults] = useState([]);
  const [addressesFound, setAddressesFound] = useState(0);
  const [providerUrl, setProviderUrl] = useState(network);
  const [currency, setCurrency] = useState("ETH");
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
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
        <div key={data.key} className="scrambleResultItem">
          <p
            style={{
              color: parseFloat(data.balance) > 0 ? "green" : "white",
              fontSize: "8px",
            }}
          >
            {data.key} - {data.balance} {data.currency}
          </p>
          <FaCopy
            className="copyIcon"
            onClick={() => copyToClipboard(data.key)}
            title="Copy to clipboard"
          />
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
  }, [copyToClipboard]); // Include copyToClipboard in dependencies

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

  const showErrorFor = (message) => {
    setErrorMessage(message);
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 2000);
  };

  const generateAndCheck = async () => {
    if (!isValidEthereumKey(inputKey)) {
      showErrorFor(
        "Invalid private key. Check again the private key and be sure to not include the `0x` "
      );
      return;
    }

    if (numberOfScrambles <= 0) {
      showErrorFor("Invalid number of scrambles.");
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

  const copyToClipboard = useCallback((text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => showErrorFor("Copied to clipboard!"))
      .catch((err) => console.error("Failed to copy: ", err));
  }, []); // No dependencies here, as it does not depend on external variables

  const getDisplayKey = (key) => {
    if (key.length <= 10) return key; // Handle very short keys
    return `${key.slice(0, 5)}...${key.slice(-5)}`;
  };

  const exampleKeys = [
    "0000000000000000000000000000000000000000000000000000000000000100",
    "dee12d08f1e4b432bac7435a0e4509b2d66620fa96c289049474c9732f672d8b",
    "1111111111111111111111111111111111111111111111111111111111111111",
    "dee12d08f1e4b432bac7435a0e4509b2d66620fa96c289049474c9732f672dab",
  ];

  return (
    <div className="MainContent">
      <h1>Ethereum Key Scramble & Balance Checker</h1>
      <div className="pkeyexamples">
        <span className="pkeyexample-label">pkey examples:</span>
        {exampleKeys.map((key, index) => (
          <div key={index} className="pkeyexample-container">
            <span className="pkeyexample">{getDisplayKey(key)}</span>
            <FaCopy
              className="copyIcon"
              onClick={() => copyToClipboard(key)}
              title="Copy to clipboard"
            />
          </div>
        ))}
      </div>
      <input
        className="InputKey"
        type="text"
        placeholder="Insert private key without 0x"
        value={inputKey}
        onChange={(e) => setInputKey(e.target.value)}
      />
      <input
        className="InputKey"
        type="number"
        placeholder="Number of Scrambles. As many as you want"
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
      {showError && <span className="ErrorMessage">{errorMessage}</span>}
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
