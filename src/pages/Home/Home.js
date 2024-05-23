import React from "react";
import "./Home.css";
import logo from "../../favicon.ico";
import apk from "../../apk/liwallet.apk";
const Home = () => {
  return (
    <div className="home">
      {/* Create a container for logo and heading */}
      <div className="home-header">
        <img src={logo} alt="Liwallet" className="logo-small" />
        <h1>Welcome to Liwallet</h1>
      </div>

      <p>
        Liwallet is a secure and convenient crypto wallet. Manage your digital
        assets with ease, both on your desktop and mobile devices.
      </p>

      <div className="download-links">
        {/* Download links */}
        <a href={apk} className="download-link" download="app-release.apk">
          Download for Android
        </a>
        <a
          href="https://chrome.google.com/webstore/detail/liwallet/your_extension_id"
          className="download-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Add to Chrome
        </a>
      </div>
    </div>
  );
};

export default Home;
