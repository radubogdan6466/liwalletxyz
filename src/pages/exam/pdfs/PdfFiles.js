import React from "react";
import "./PdfFiles.css";

const pdfFiles = [
  { name: "Curs 1", path: "/pdfs/m_curs1.pdf" }, // Am schimbat "m_curs1" cu "Curs 1"
  { name: "Curs 2", path: "/pdfs/m_curs2.pdf" }, // Am schimbat "m_curs2" cu "Curs 2"
  { name: "Curs 3", path: "/pdfs/m_curs3.pdf" },
  { name: "Curs 4", path: "/pdfs/m_curs4.pdf" },
  { name: "Curs 5", path: "/pdfs/m_curs5.pdf" },
  { name: "Curs 6", path: "/pdfs/m_curs6.pdf" },
  { name: "Curs 7", path: "/pdfs/m_curs7.pdf" },
  { name: "Curs 8", path: "/pdfs/m_curs8.pdf" },
  { name: "Curs 9", path: "/pdfs/m_curs9.pdf" },
  { name: "Curs 10", path: "/pdfs/m_curs10.pdf" },
  { name: "Curs 11", path: "/pdfs/m_curs11_UC_2_0.pdf" }, // Aici poți decide cum vrei să afișezi
  { name: "Curs 12", path: "/pdfs/m_curs12.pdf" },
  { name: "Curs 13", path: "/pdfs/m_curs13.pdf" },
  { name: "Curs 14", path: "/pdfs/m_curs14.pdf" },
  { name: "Întrebări", path: "/pdfs/intrebari.pdf" }, // Am schimbat "intrebari" cu "Întrebări"
];

const PdfPage = () => {
  return (
    <div className="pdf-container">
      <h2>Lista Fișierelor PDF</h2>
      <ul>
        {pdfFiles.map((file, index) => (
          <li key={index}>
            <a href={file.path} target="_blank" rel="noopener noreferrer">
              {file.name} {/* Acum se va afișa "Curs 1", "Curs 2" etc. */}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PdfPage;