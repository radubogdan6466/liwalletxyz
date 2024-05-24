import React, { useState } from "react";
import "./Home.css";
import logo from "../../favicon.ico";

const Home = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadClick = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
    }, 7000); // Simulates a download wait time
  };

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
        <div>
          <a
            href="https://drive.google.com/uc?export=download&id=1HfVk14RVms0xqunOUmBMvC8QJ0MocSBo"
            className="download-link"
            onClick={handleDownloadClick}
          >
            {isDownloading ? "On the way..." : "Download for Android"}
          </a>
          <span className="announce">
            apk file available, soon on Play Store
          </span>
        </div>
        <div>
          <a
            href="https://chrome.google.com/webstore/detail/liwallet/kmlbkiknogfenebpeaohpljdpbicijim"
            className="download-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Add to Chrome
          </a>
          <span className="announce"> (Soon on Chrome web store)</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
