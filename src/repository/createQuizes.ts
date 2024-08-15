import { API_URL } from "./constant";
import { Platform } from "../type";

export const createQuizes = async ({
  author,
  articleId,
  platform,
}: {
  author: string;
  articleId: string;
  platform: Platform;
}) => {
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
  return await response.json();
};
