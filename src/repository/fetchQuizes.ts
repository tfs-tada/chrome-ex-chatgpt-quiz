import { Platform } from "../type";

export const fetchQuizes = async ({
  author,
  articleId,
  platform,
}: {
  author: string;
  articleId: string;
  platform: Platform;
}) => {
  const response = await fetch(
    `http://localhost:3000/api/quiz?author=${author}&articleId=${articleId}&platform=${
      platform === "dev" ? "Zenn" : platform
    }`
  );
  return await response.json();
};
