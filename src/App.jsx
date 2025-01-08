import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import UserForm from "./components/UserForm";
import Question from "./components/Question";
import Results from "./components/Results";
import { UserProvider } from "./components/UserContext";

const App = () => {
  const questions = [
    {
      question: "What's your favorite color?",
      options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
    },
    {
      question: "What's your favorite activity?",
      options: ["Swimming 🏊", "Hiking 🥾", "Reading 📚", "Dancing 💃"],
    },
  ];

  const elements = {
    "Red 🔴": "Fire",
    "Blue 🔵": "Water",
    "Green 🟢": "Earth",
    "Yellow 🟡": "Air",
    "Swimming 🏊": "Water",
    "Hiking 🥾": "Earth",
    "Reading 📚": "Air",
    "Dancing 💃": "Fire",
  };

  const keywords = {
    Fire: "fire",
    Water: "water",
    Earth: "earth",
    Air: "air",
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [element, setElement] = useState("");
  const [artwork, setArtwork] = useState(null);

  const handleAnswer = (answer) => {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const determineElement = (answers) => {
    const counts = {};
    answers.forEach((answer) => {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
  };

  const fetchArtwork = async (keyword) => {
    const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${keyword}`
    );
    const data = await response.json();
    if (data.objectIDs && data.objectIDs.length > 0) {
      const objectId = data.objectIDs[0];
      const artworkResponse = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`
      );
      const artworkData = await artworkResponse.json();
      setArtwork(artworkData);
    } else {
      setArtwork(null);
    }
  };

  React.useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      const selectedElement = determineElement(answers);
      setElement(selectedElement);
      fetchArtwork(keywords[selectedElement]);
    }
  }, [currentQuestionIndex]);

  return (
    <UserProvider>
      <Router>
        <Header />
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<UserForm />} />
          {/* Quiz Page */}
          <Route
            path="/quiz"
            element={
              currentQuestionIndex < questions.length ? (
                <Question
                  question={questions[currentQuestionIndex].question}
                  options={questions[currentQuestionIndex].options}
                  onAnswer={handleAnswer}
                />
              ) : (
                <Results element={element} artwork={artwork} />
              )
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
