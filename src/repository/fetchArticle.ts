import { API_URL } from "./constant";
import { Article, Platform, Quiz, Result } from "../type";

export const fetchArticle = async ({
  author,
  articleId,
  platform,
}: {
  author: string;
  articleId: string;
  platform: Platform;
}): Promise<Result<Article & { quizes: Quiz[] }>> => {
  const response = await fetch(
    `${API_URL}/article?author=${author}&articleId=${articleId}&platform=${
      platform === "dev" ? "Zenn" : platform
    }`
  );
  try {
    if (response.status !== 200) {
      throw new Error("Failed to fetch article");
    }
    const data = await response.json();
    return { data, error: false } as const;
  } catch (e) {
    return { data: null, error: true } as const;
  }
};
