export const getStorageFeedback = (quizId: string) => {
  const feedback = localStorage.getItem(`${quizId}_feedback`);
  if (feedback === "positive" || feedback === "negative") {
    return feedback;
  }
  return undefined;
};

export const setStorageFeedback = (
  quizId: string,
  feedback: "positive" | "negative"
) => {
  localStorage.setItem(`${quizId}_feedback`, feedback);
};
