import React, { useState } from "react";
import "./Home.css";
import logo from "../../favicon.ico";

const Home = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadClick = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
    }, 7000); // Simulează timpul de așteptare al descărcării
  };

  return (
    <div className="home">
      <div className="home-header">
        <img src={logo} alt="Liwallet" className="logo-small" />
        <h1 className="liw">Liwallet</h1>
      </div>

      <p>
        Liwallet is a secure and convenient crypto wallet. Manage your digital
        assets with ease, both on your desktop and mobile devices.
      </p>

      <div className="download-links">
        <div>
          <a
            href="https://drive.google.com/file/d/1TA-JkVAFTYOsEr9ho_D7xSpYYEcNsIaM/view?usp=drive_link"
            className={`download-link ${isDownloading ? "downloading" : ""}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleDownloadClick}
          >
            {isDownloading ? "Downloading..." : "Download for Android"}
          </a>
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
        </div>
      </div>
    </div>
  );
};

export default Home;
