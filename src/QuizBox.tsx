import { useState } from "react";
import { Platform, Quiz } from "./type";

export const QuizBox = ({
  quiz,
  platform,
}: {
  quiz: Quiz;
  platform: Platform;
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  return (
    <div
      style={{
        padding: "20px 0",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <>
        <div
          style={{ marginBottom: "20px", borderBottom: "1px solid #d6e3ed" }}
        >
          {quiz.question}
        </div>
        <div>
          {quiz.quizChoices.map((choice, index) => (
            <label
              key={choice.id}
              style={{
                display: "block",
                borderRadius: "5px",
                margin: "5px 0",
                padding: "10px",
                cursor: "pointer",
                transition: "background-color 0.3s",
                ...(platform === "Zenn" && {
                  backgroundColor: "#edf2f7",
                  border: "none",
                }),
                ...(platform === "Qiita" && {
                  border: "1px solid",
                }),
                ...(isAnswered &&
                  (choice.isCorrect
                    ? {
                        backgroundColor: "#4caf50",
                        color: "white",
                      }
                    : selectedOption === choice.id
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
                onChange={() => setSelectedOption(choice.id)}
                style={{ marginRight: "10px" }}
              />
              {choice.text}
            </label>
          ))}
        </div>
        <div style={{ height: "80px", paddingTop: "20px" }}>
          {isAnswered ? (
            <div style={{ fontSize: "small" }}>{quiz.explanation}</div>
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
                  fontWeight: "bold",
                }}
              >
                回答
              </button>
            </div>
          )}
        </div>
      </>
    </div>
  );
};
