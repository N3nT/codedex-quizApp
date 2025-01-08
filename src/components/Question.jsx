import React from "react";

export default function Question({ question, options, onAnswer }) {
  return (
    <div>
      <h2>{question}</h2>
      <div className="options">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onAnswer(option)}
            className="option-button"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
