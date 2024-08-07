export type Quiz = {
  id: string;
  articleId: string;
  question: string;
  answer: string;
  choices: string[];
  explanation: string;
  likes: number;
  unlikes: number;
  createdAt: Date;
  updatedAt: Date;
};
