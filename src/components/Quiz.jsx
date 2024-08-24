import React, { useState } from "react";
import "./Quiz.css";
import { data } from "./../assets/data";

const Quiz = () => {
  // State variables
  const [index, setIndex] = useState(0); // Index of current question
  const [lock, setLock] = useState(false); // Lock to prevent multiple answers
  const [score, setScore] = useState(0); // Score counter

  // Function to handle clicking on an answer
  const handleCorrect = (e, num) => {
    if (lock === false) { // Check if not locked (answer not submitted)
      if (num === data[index].ans) { // If selected answer is correct
        e.target.classList.add("correct"); // Add 'correct' style to selected option
        setLock(true); // Lock further answers for this question
        setScore((prev) => prev + 1); // Increment score
      } else { // If selected answer is incorrect
        e.target.classList.add("incorrect"); // Add 'incorrect' style to selected option
        const correctOption = document.querySelector(
          `.options li:nth-child(${data[index].ans})`
        );
        correctOption.classList.add("correct"); // Highlight correct answer
        setLock(true); // Lock further answers for this question
      }
    }
  };

  // Function to handle moving to the next question
  const handleNext = () => {
    if (lock) { // Check if answer has been submitted
      setIndex((prev) => prev + 1); // Move to the next question
      setLock(false); // Unlock to allow selecting answers for the next question
      const options = document.querySelectorAll(".options li");
      options.forEach((option) => {
        option.classList.remove("correct", "incorrect"); // Reset styles for options
      });
    } else {
      alert("Please choose an answer."); // Alert if no answer has been selected
    }
  };

  // Function to reset the quiz
  const handleReset = () => {
    setIndex(0); // Reset index to start from the first question
    setLock(false); // Unlock to allow selecting answers
    setScore(0); // Reset score to zero
  };

  return (
    <div className="quiz">
      <div className="header">Quiz App</div>
      <hr />

      {/* Render result if all questions have been answered */}
      {index > data.length - 1 ? (
        <>
          <p className="result">Your Score Is {score} of {data.length}</p>
          <button type="button" className="reset-btn" onClick={handleReset}>
            Reset
          </button>
        </>
      ) : (
        // Render current question and answer options
        <>
          <div className="question">
            <h2>
              {index + 1}. {data[index].question}
            </h2>
          </div>
          <ul className="options">
            {/* Render each answer option */}
            <li
              onClick={(e) => {
                handleCorrect(e, 1); // Call handleCorrect with option number 1
              }}
            >
              {data[index].option1}
            </li>
            <li
              onClick={(e) => {
                handleCorrect(e, 2); // Call handleCorrect with option number 2
              }}
            >
              {data[index].option2}
            </li>
            <li
              onClick={(e) => {
                handleCorrect(e, 3); // Call handleCorrect with option number 3
              }}
            >
              {data[index].option3}
            </li>
            <li
              onClick={(e) => {
                handleCorrect(e, 4); // Call handleCorrect with option number 4
              }}
            >
              {data[index].option4}
            </li>
          </ul>
          
          <button type="button" onClick={handleNext}>
            Next
          </button>
          
          <p>
            {index + 1} of {data.length} questions
          </p>
        </>
      )}
    </div>
  );
};

export default Quiz;
