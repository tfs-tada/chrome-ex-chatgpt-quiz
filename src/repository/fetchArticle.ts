import { API_URL } from "./constant";
import { Platform } from "../type";

export const fetchArticle = async ({
  author,
  articleId,
  platform,
}: {
  author: string;
  articleId: string;
  platform: Platform;
}) => {
  const response = await fetch(
    `${API_URL}/article?author=${author}&articleId=${articleId}&platform=${
      platform === "dev" ? "Zenn" : platform
    }`
  );
  return await response.json();
};
