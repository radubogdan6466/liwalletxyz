import React from "react";

const pdfFiles = [
  { name: "intrebari", path: "/pdfs/intrebari.pdf" },
{name:"m_curs1", path: "/pdfs/m_curs1.pdf"},
{name:"m_curs2", path: "/pdfs/m_curs2.pdf"},
{name:"m_curs3", path: "/pdfs/m_curs3.pdf"},
{name:"m_curs4", path: "/pdfs/m_curs4.pdf"},
{name:"m_curs5", path: "/pdfs/m_curs5.pdf"},
{name:"m_curs6", path: "/pdfs/m_curs6.pdf"},
{name:"m_curs7", path: "/pdfs/m_curs7.pdf"},
{name:"m_curs8", path: "/pdfs/m_curs8.pdf"},
{name:"m_curs9", path: "/pdfs/m_curs9.pdf"},
{name:"m_curs10", path: "/pdfs/m_curs10.pdf"},
{name:"m_curs11_UC_2_0", path: "/pdfs/m_curs11_UC_2_0.pdf"},
{name:"m_curs12", path: "/pdfs/m_curs12.pdf"},
{name:"m_curs13", path: "/pdfs/m_curs13.pdf"},
{name:"m_curs14", path: "/pdfs/m_curs14.pdf"},

];

const PdfPage = () => {
  return (
    <div className="pdf-container">
      <h2>Lista Fișierelor PDF</h2>
      <ul>
        {pdfFiles.map((file, index) => (
          <li key={index}>
            <a href={file.path} target="_blank" rel="noopener noreferrer">
              {file.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PdfPage;
