import { API_URL } from "./constant";

export const createFeedback = async ({
  quizId,
  isPositive,
}: {
  quizId: string;
  isPositive: boolean;
}) => {
  const response = await fetch(`${API_URL}/feedback`, {
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
