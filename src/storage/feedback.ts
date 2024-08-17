import Dexie, { type EntityTable } from "dexie";

type QuizFeedbackDbRecord = {
  quizId: string;
  feedback: "positive" | "negative";
};

const db = new Dexie("QuizFeedback") as Dexie & {
  quizFeedback: EntityTable<QuizFeedbackDbRecord, "quizId">;
};

db.version(1).stores({
  quizFeedback: "quizId, feedback",
});

export const getStorageFeedback = async (quizId: string) => {
  const record = await db.quizFeedback.where("quizId").equals(quizId).first();
  return record?.feedback;
};

export const setStorageFeedback = (
  quizId: string,
  feedback: "positive" | "negative"
) => {
  db.quizFeedback.put({ quizId, feedback });
};
