import React, { useContext } from "react";
import { UserContext } from "./UserContext";

export default function Results({ element, artwork }) {
  const { name } = useContext(UserContext);

  return (
    <div className="results">
      <h2>Quiz Results</h2>
      <p>
        <strong>{name}</strong>, your element is: <strong>{element}</strong> 🌟
      </p>
      {artwork ? (
        <div className="artwork">
          <h3>{artwork.title}</h3>
          <img src={artwork.primaryImage} alt={artwork.title} />
          <p><strong>Artist:</strong> {artwork.artistDisplayName || "Unknown"}</p>
          <p><strong>Date:</strong> {artwork.objectDate || "Unknown"}</p>
        </div>
      ) : (
        <p>No artwork found for your element.</p>
      )}
    </div>
  );
}
