export const createAnswerLog = async ({
  quizId,
  choiceId,
}: {
  quizId: string;
  choiceId: string | null;
}) => {
  const response = await fetch(`http://localhost:3000/api/answer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      quizId,
      choiceId,
    }),
  });
  return await response.json();
};
