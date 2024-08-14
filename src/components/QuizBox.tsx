import { useState, useSyncExternalStore } from "react";
import { Platform, Quiz } from "../type";
import { BadIcon, GoodIcon } from "./svg";
import { getStorageFeedback, setStorageFeedback } from "../storage/feedback";
import { createFeedback } from "../repository/createFeedback";
import { createAnswerLog } from "../repository/createAnswerLog";

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
    () => getStorageFeedback(quiz.id),
    () => "waiting"
  );

  const handleAnswer = () => {
    setIsAnswered(true);
    createAnswerLog({ quizId: quiz.id, choiceId: selectedOption });
  };
  const handleFeedback = (isPositive: boolean) => {
    const feedback = isPositive ? "positive" : "negative";
    setFeedbacked(feedback);
    setStorageFeedback(quiz.id, feedback);
    createFeedback({ quizId: quiz.id, isPositive });
  };

  const disabledFeedback =
    typeof feedbacked === "string" || typeof storageFeedback === "string";

  return (
    <div className="py-2 font-sans">
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
                                    isAnswered &&
                                    (choice.isCorrect ||
                                      selectedOption === choice.id)
                                      ? ""
                                      : "bg-opacity-20"
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
            <span className="text-[0.8em]">{choice.text}</span>
          </label>
        ))}
      </div>
      <div className="py-2 h-32">
        {isAnswered ? (
          <div className="flex flex-col justify-between h-full">
            <div className="text-[12px]">{quiz.explanation}</div>
            <div className="flex justify-end gap-2">
              <button
                disabled={disabledFeedback}
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
                disabled={disabledFeedback}
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
