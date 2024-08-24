export type Platform = "Zenn" | "Qiita" | "Mdn" | "dev";

export type Quiz = {
  quizChoices: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
} & {
  id: string;
  articleId: string;
  question: string;
  explanation: string;
  likes: number;
  unlikes: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Article = {
  tags: {
    id: string;
    name: string;
  }[];
  id: string;
  articleId: string;
  title: string;
  author: string;
  platform: Platform;
  quizStatus: "NONE" | "FETCHING" | "SUCCESS" | "ERROR";
  createdAt: Date;
  updatedAt: Date;
};

export type Result<T> =
  | {
      data: T;
      error: false;
    }
  | {
      data: null;
      error: true;
    };
