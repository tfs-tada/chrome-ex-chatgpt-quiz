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
    <div className="py-5 font-sans">
      <div className="mb-5 font-bold">{quiz.question}</div>
      <div>
        {quiz.quizChoices.map((choice, index) => (
          <label
            key={index}
            className={`flex rounded-md mb-2 p-3 cursor-pointer transition-colors duration-300 
                            ${platform === "Zenn" ? "bg-gray-100" : ""} 
                            ${
                              platform === "Qiita"
                                ? `bg-gray-400 ${
                                    isAnswered ? "" : "bg-opacity-20"
                                  }`
                                : ""
                            } 
                            ${
                              isAnswered
                                ? choice.isCorrect
                                  ? "bg-green-500 text-white"
                                  : selectedOption === choice.id
                                  ? "bg-red-500 text-white"
                                  : ""
                                : ""
                            }`}
          >
            <input
              type="radio"
              name="option"
              value={index}
              disabled={isAnswered}
              onChange={() => setSelectedOption(choice.id)}
              className="mr-2"
            />
            <span style={{ lineHeight: "normal" }} className="text-[0.8em]">
              {choice.text}
            </span>
          </label>
        ))}
      </div>
      <div className="py-4 min-h-40">
        {isAnswered ? (
          <div className="flex flex-col justify-around h-full">
            <div className="text-[12px]">{quiz.explanation}</div>
            <div className="flex justify-end gap-2">
              <button
                disabled={
                  typeof feedbacked === "string" || storageFeedback !== null
                }
                onClick={() => handleFeedback(true)}
                aria-label="good feedback"
                className="bg-transparent border-none"
              >
                <GoodIcon
                  fillColor={
                    storageFeedback === "positive" || feedbacked === "positive"
                      ? "#4caf50"
                      : "gray"
                  }
                />
              </button>
              <button
                disabled={
                  typeof feedbacked === "string" || storageFeedback !== null
                }
                onClick={() => handleFeedback(false)}
                aria-label="bad feedback"
                className="bg-transparent border-none"
              >
                <BadIcon
                  fillColor={
                    storageFeedback === "negative" || feedbacked === "negative"
                      ? "#f44336"
                      : "gray"
                  }
                />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-end">
            <button
              onClick={handleAnswer}
              className={`text-white border-none px-4 py-2 rounded-full font-bold cursor-pointer text-[14px] 
                  ${platform === "Zenn" ? "bg-zenn-primary " : ""}
                  ${platform === "Qiita" ? "bg-qiita-primary" : ""}
                `}
            >
              回答
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
