import { useState } from "react";
import { Quiz } from "./type";

export const QuizBox = ({ quiz }: { quiz: Quiz }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "20px 0",
        fontFamily: "Arial, sans-serif",
        color: "#333",
      }}
    >
      <>
        <div
          style={{ marginBottom: "20px", borderBottom: "1px solid #d6e3ed" }}
        >
          {quiz.question}
        </div>
        <div>
          {quiz.choices.map((choice, index) => (
            <label
              key={index}
              style={{
                display: "block",
                backgroundColor: "#edf2f7",
                border: "none",
                borderRadius: "5px",
                margin: "5px 0",
                padding: "10px",
                cursor: "pointer",
                transition: "background-color 0.3s",
                ...(isAnswered &&
                  (index === quiz.choices.indexOf(quiz.answer)
                    ? {
                        backgroundColor: "#4caf50",
                        color: "white",
                      }
                    : selectedOption === index
                    ? {
                        backgroundColor: "#f44336",
                        color: "white",
                      }
                    : {})),
              }}
            >
              <input
                type="radio"
                name="option"
                value={index}
                disabled={isAnswered}
                onChange={() => setSelectedOption(index)}
                style={{ marginRight: "10px" }}
              />
              {choice}
            </label>
          ))}
        </div>
        {isAnswered ? (
          <div style={{ marginTop: "20px", fontSize: "small" }}>
            {quiz.explanation}
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "end" }}>
            <button
              onClick={() => setIsAnswered(true)}
              style={{
                backgroundColor: "#3ea8ff",
                color: "white",
                border: "none",
                padding: "10px 20px",
                cursor: "pointer",
                borderRadius: "99rem",
                marginTop: "20px",
                fontWeight: "bold",
              }}
            >
              解答
            </button>
          </div>
        )}
      </>
    </div>
  );
};
