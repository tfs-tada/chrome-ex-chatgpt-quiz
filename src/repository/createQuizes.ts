import { API_URL } from "./constant";
import { Platform, Quiz, Result } from "../type";

export const createQuizes = async ({
  author,
  articleId,
  platform,
}: {
  author: string;
  articleId: string;
  platform: Platform;
}): Promise<Result<Quiz[]>> => {
  const response = await fetch(`${API_URL}/quiz`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      author,
      articleId,
      platform: platform === "dev" ? "Zenn" : platform,
    }),
  });
  try {
    if (response.status !== 201) {
      throw new Error("Failed to create quizes");
    }
    const data = await response.json();
    return { data, error: false } as const;
  } catch (e) {
    return { data: null, error: true } as const;
  }
};
