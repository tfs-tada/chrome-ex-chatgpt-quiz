import { API_URL } from "./constant";
import { Platform, Quiz, Result } from "../type";

export const fetchQuizes = async ({
  author,
  articleId,
  platform,
}: {
  author: string;
  articleId: string;
  platform: Platform;
}): Promise<Result<Quiz[]>> => {
  const response = await fetch(
    `${API_URL}/quiz?author=${author}&articleId=${articleId}&platform=${platform}`
  );
  try {
    if (response.status !== 200) {
      throw new Error("Failed to fetch quizes");
    }
    const data = await response.json();
    return { data, error: false } as const;
  } catch (e) {
    return { data: null, error: true } as const;
  }
};
