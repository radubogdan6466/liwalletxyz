import React from "react";
import "./Exam.css"
import uml from "./uml.png"
const questions = [
    {
      "id": 1,
      "question": "Sistemele de timp real sunt proiectate ca procese cooperante controlate de un executiv de timp real. Care este rolul analizei de timp și care sunt factorii considerați?",
      "answer": "Rolul analizei de timp este de a determina frecvența de execuție a fiecărui proces astfel încât să se respecte termenele limită și cerințele de timp. Factorii considerați includ: termenele limită, frecvența de execuție, timpul de execuție și tipul sistemului de timp real (hard sau soft)."
    },
    {
      "id": 2,
      "question": "Care sunt cele 2 zone de descriere a unui subsistem ? De ce este necesară separarea acestora ?",
      "answer": "Cele două zone sunt zona de interfață, care definește funcționalitățile publice ale subsistemului, și zona internă, care conține detaliile de implementare. Separarea este necesară pentru modularitate, interschimbabilitate și dezvoltarea independentă a componentelor."
    },
    {
      "id": 3,
      "question": "Prin ce se caracterizează abordarea MDE în dezvoltarea de software ?",
      "answer": "MDE (Model Driven Engineering) este o abordare în care sistemele sunt reprezentate prin modele care pot fi transformate automat în cod executabil. Modelele pot fi: ca schiță, ghid de implementare sau ca program. Se folosește pentru comunicarea cu clienții, documentarea deciziilor de proiectare, generarea automată de aplicații și inginerie inversă."
    },
    {
      "id": 4,
      "question": "Realizați corespondența corectă între model și diagramele UML folosite.",
      "answer": "./uml.png"
    },
    {
      "id": 5,
      "question": "Elementele definiției unui serviciu software sunt interfața (CE), modul de acces (CUM) și punct(e) de acces (UNDE). Explicați ce simplificări aduce abordarea RESTful comparativ cu WSDL ? CE = interfața • Operațiile • Formatele mesajelor trimise și recepționate de serviciu CUM = binding • Corespondența între interfața abstractă și un set concret de protocoale; specifică detaliile tehnice ale comunicării cu serviciul Web. UNDE • Localizarea implementării serviciului (endpoint).",
      "answer": "RESTful simplifică interfața prin utilizarea metodelor HTTP standardizate, reduce complexitatea binding-urilor și permite identificarea resurselor prin URI-uri intuitive. În comparație, WSDL impune un set complex de structuri XML și configurări explicite ale endpoint-urilor."
    },
    {
      "id": 6,
      "question": "Care este elementul central al unui framework MVC tipic și ce rol are acesta?",
      "answer": "Elementul central al unui framework MVC tipic este Controller-ul, care gestionează fluxul de date între Model și View, primește solicitările utilizatorului și selectează View-ul corespunzător."
    },
    {
      "id": 7,
      "question": "Care sunt operatiile interfetei HandleInterceptor din framework-ul Spring Web MVC? Ce se intercepteaza si de ce?",
      "answer": ""
    },
    {
      "id": 8,
      "question": "Ce contine documentarea, realizata in UML de arhitectul Software, pentru un mecanism de implementare? / Ce conține documentația realizată de arhitectul software pentru un mecanism de implementare?",
      "answer": "Documentarea conține descrierea detaliată a arhitecturii, a interfețelor și a fluxurilor de date, împreună cu diagrame de clase, secvență și componente."
    },
    {
      "id": 9,
      "question": "Precizați din ce elemente ale modelului analiză al aplicației rezultă fiecare dintre componentele M, V și C.",
      "answer": "Modelul (M) provine din entitățile domeniului și structura bazei de date. View-ul (V) derivă din scenariile de interacțiune și interfața vizuală. Controller-ul (C) provine din cazurile de utilizare și regulile de business."
    },
    {
      "id": 10,
      "question": "Care sunt criteriile calitative de evaluare a independenței funcționale și care este relația independenței funcționale cu fiecare dintre acestea ?",
      "answer": "Independența funcțională este evaluată prin coeziune (care arată cât de bine sunt legate între ele funcțiile unui modul) și cuplare (care măsoară dependența între module). O coeziune mare și o cuplare mică indică o independență funcțională mai mare."
    },
    {
      "id": 11,
      "question": "Explicați următoarea afirmație / Justificati urmatoarea concluzie : “Legarea serviciului la aplicație se face la instalare sau la execuție. Rezultă că aplicațiile pot fi reactive și își pot adapta operarea la modificările din contextul de execuție.“",
      "answer": "Prin legarea serviciilor la instalare sau execuție, aplicațiile pot selecta dinamically cel mai potrivit serviciu disponibil, adaptându-se la contextul de execuție, pentru a optimiza performanța sau resursele."
    },
    {
      "id": 12,
      "question": "De ce este importantă crearea și evaluarea mai multor variante ale arhitecturii unui sistem software ?",
      "answer": "Crearea și evaluarea mai multor variante ale arhitecturii ajută la identificarea celei mai potrivite soluții, reducând riscurile și optimizând performanța, securitatea și mentenabilitatea."
    },
    {
      "id": 13,
      "question": "Fie “Student” o clasa din modelul unei aplicatii in arhitectura MVC. Cu ce sunt puse automat in corespondenta atributele acesteia de catre un framework MVC?",
      "answer": "Atributele clasei Student sunt puse automat în corespondentă cu câmpurile formularului (View), iar Controller-ul gestionează modificările acestora și actualizează Modelul."
    }
  ]
  ;

  const Exam = () => {
    return (
      <div className="exam-form">
        <h1 className="form-title">Formular Exam</h1>
        <form>
          {questions.map((q) => (
            <div key={q.id} className="question-item">
              <p className="question-text">{q.question}</p>
              {q.id === 4 ? (
                <img src={uml} alt="Răspuns vizual" className="answer-image" />
              ) : (
                <textarea className="answer-text" defaultValue={q.answer}></textarea>
              )}
            </div>
          ))}
        </form>


      </div>
    );
  };
  
  export default Exam;