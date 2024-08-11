import { useState, useSyncExternalStore } from "react";
import { Platform, Quiz } from "./type";
import { BadIcon, GoodIcon } from "./svg";

export const QuizBox = ({
  quiz,
  platform,
}: {
  quiz: Quiz;
  platform: Platform;
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedbacked, setFeedbacked] = useState<
    "positive" | "negative" | undefined
  >(undefined);
  const storageFeedback = useSyncExternalStore(
    () => () => {},
    () => localStorage.getItem(`${quiz.id}_feedback`),
    () => "waiting"
  );

  const handleAnswer = () => {
    setIsAnswered(true);
    fetch("http://localhost:3000/api/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quizId: quiz.id,
        choiceId: selectedOption,
      }),
    });
  };
  const handleFeedback = (isPositive: boolean) => {
    setFeedbacked(isPositive ? "positive" : "negative");
    localStorage.setItem(
      `${quiz.id}_feedback`,
      isPositive ? "positive" : "negative"
    );
    fetch("http://localhost:3000/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quizId: quiz.id,
        isPositive,
      }),
    });
  };

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
            <div>
              <div style={{ fontSize: "small" }}>{quiz.explanation}</div>
              <div
                style={{ display: "flex", justifyContent: "end", gap: "8px" }}
              >
                <button
                  disabled={
                    typeof feedbacked === "string" || storageFeedback !== null
                  }
                  onClick={() => handleFeedback(true)}
                  style={{
                    ...(storageFeedback === "positive" ||
                    feedbacked === "positive"
                      ? {
                          backgroundColor: "#4caf50",
                          color: "white",
                        }
                      : {}),
                  }}
                  aria-label="good feedback"
                >
                  <GoodIcon
                    fillColor={
                      storageFeedback === "positive" ||
                      feedbacked === "positive"
                        ? "#4caf50"
                        : "#000"
                    }
                  />
                </button>
                <button
                  disabled={
                    typeof feedbacked === "string" || storageFeedback !== null
                  }
                  onClick={() => handleFeedback(false)}
                  aria-label="bad feedback"
                >
                  <BadIcon
                    fillColor={
                      storageFeedback === "negative" ||
                      feedbacked === "negative"
                        ? "#f44336"
                        : "#000"
                    }
                  />
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", justifyContent: "end" }}>
              <button
                onClick={handleAnswer}
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
