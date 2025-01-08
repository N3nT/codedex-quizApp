import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";

export default function UserForm() {
  const [inputName, setInputName] = useState("");
  const { setName } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    if (inputName.trim() === "") {
      alert("Please enter your name to start the quiz!");
      return;
    }
    setName(inputName);
    window.history.pushState({}, "", "/quiz");
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
  }

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <label htmlFor="name">Enter Your Name:</label>
      <input
        type="text"
        id="name"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
        placeholder="Your Name"
      />
      <button type="submit">Start Quiz</button>
    </form>
  );
}
