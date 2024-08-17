import { API_URL } from "./constant";

export const createAnswerLog = async ({
  quizId,
  choiceId,
}: {
  quizId: string;
  choiceId: string | null;
}) => {
  await fetch(`${API_URL}/answer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      quizId,
      choiceId,
    }),
  });
};
