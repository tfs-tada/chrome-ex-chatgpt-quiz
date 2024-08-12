export const createFeedback = async ({
  quizId,
  isPositive,
}: {
  quizId: string;
  isPositive: boolean;
}) => {
  const response = await fetch(`http://localhost:3000/api/feedback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      quizId,
      isPositive,
    }),
  });
  return await response.json();
};
