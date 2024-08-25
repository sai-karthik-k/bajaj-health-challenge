import React, { useState } from "react";
import "./App.css";

function App() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState(null);
  const [rollNumber, setRollNumber] = useState("YOUR_ROLL_NUMBER"); // Replace with your roll number

  const handleChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Clear any previous errors
    try {
      const jsonData = JSON.parse(userInput); // Validate JSON input
      const response = await fetch("/bfhl", {
        // Make a POST request to your backend
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: jsonData }),
      });
      const data = await response.json();
      setResponse(data);
      setShowDropdown(true);
    } catch (error) {
      setError("Invalid JSON format");
    }
  };

  const handleOptionChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    }
  };

  return (
    <div className="App">
      <h1>Bajaj Finserv Health Challenge</h1>
      <h2>Roll Number: {rollNumber}</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="userInput">API Input:</label>
        <textarea id="userInput" value={userInput} onChange={handleChange} />
        <button type="submit">Submit</button>
        {error && <p className="error">{error}</p>}
      </form>

      {showDropdown && (
        <div>
          <label htmlFor="options">Multi Filter:</label>
          <div>
            <input
              type="checkbox"
              id="alphabets"
              value="alphabets"
              checked={selectedOptions.includes("alphabets")}
              onChange={handleOptionChange}
            />
            <label htmlFor="alphabets">Alphabets</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="numbers"
              value="numbers"
              checked={selectedOptions.includes("numbers")}
              onChange={handleOptionChange}
            />
            <label htmlFor="numbers">Numbers</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="highestLowercaseAlphabet"
              value="highestLowercaseAlphabet"
              checked={selectedOptions.includes("highestLowercaseAlphabet")}
              onChange={handleOptionChange}
            />
            <label htmlFor="highestLowercaseAlphabet">
              Highest Lowercase Alphabet
            </label>
          </div>
        </div>
      )}

      {response && (
        <div>
          <h3>Filtered Response</h3>
          {selectedOptions.includes("alphabets") && (
            <div>Alphabets: {response.alphabets.join(", ")}</div>
          )}
          {selectedOptions.includes("numbers") && (
            <div>Numbers: {response.numbers.join(", ")}</div>
          )}
          {selectedOptions.includes("highestLowercaseAlphabet") && (
            <div>
              Highest Lowercase Alphabet:{" "}
              {response.highest_lowercase_alphabet.join(", ")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
