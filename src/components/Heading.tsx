import { FC } from "react";
import { Platform } from "../type";

export const Heading: FC<{ platform: Platform }> = ({ platform }) => {
  if (platform === "Zenn") {
    return (
      <h1 className="text-2xl mt-7 mb-4 border-b border-gray-300">確認問題</h1>
    );
  }
  if (platform === "Qiita") {
    return <h2 className="font-bold text-[1.53em] mt-8 mb-4">確認問題</h2>;
  }
  if (platform === "Mdn" || platform === "Doc_PostgreSQL") {
    return <h2 className="mt-8 mb-4">確認問題</h2>;
  }
  platform satisfies never;
  return null;
};
