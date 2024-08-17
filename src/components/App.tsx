import { useEffect, useState } from "react";
import { Article, Platform, Quiz } from "../type";
import { QuizBox } from "./QuizBox";
import { createQuizes } from "../repository/createQuizes";
import { fetchArticle } from "../repository/fetchArticle";

const hostRegex = {
  dev: /https:\/\/zenn\.dev\/(?<author>[^/]+)\/articles\/(?<id>[^/]+)/,
  Qiita: /https:\/\/qiita\.com\/(?<author>[^/]+)\/items\/(?<id>[^/]+)/,
  Zenn: /https:\/\/zenn\.dev\/(?<author>[^/]+)\/articles\/(?<id>[^/]+)/,
} as const satisfies Record<Platform, RegExp>;
const dummyHref = "https://zenn.dev/kurashiki0ecma/articles/83097b7945201b";

export const App = ({ platform }: { platform: Platform }) => {
  const [, setArticle] = useState<Article | null>(null);
  const [quizList, setQuizList] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<"loading" | "quizCreating" | false>(
    "loading"
  );
  const handleCreateQuiz = async () => {
    setLoading("loading");
    const currentUrl = platform === "dev" ? dummyHref : window.location.href;
    const match = currentUrl.match(hostRegex[platform]);
    if (!match) {
      return null;
    }
    const { author, id } = match.groups!;
    const data = await createQuizes({ author, articleId: id, platform });
    if (data.length === 0) {
      setLoading("quizCreating");
      return;
    }
    setQuizList(data);
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      const currentUrl = platform === "dev" ? dummyHref : window.location.href;
      const match = currentUrl.match(hostRegex[platform]);
      if (!match) {
        return null;
      }
      const { author, id } = match.groups!;
      const { quizes, ...data } = await fetchArticle({
        author,
        articleId: id,
        platform,
      });
      setArticle(data);
      setQuizList(quizes);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="mb-4">
      {platform === "dev" || platform === "Zenn" ? (
        <h1 className="text-2xl mt-7 mb-4 border-b border-gray-300">
          確認問題
        </h1>
      ) : (
        <h2
          style={{
            fontSize: "1.53em",
            margin: "1.8em 0 1.1rem",
            borderBottom: "1px solid rgb(255 255 255 / 20%)",
            fontWeight: "bold",
          }}
        >
          確認問題
        </h2>
      )}
      <div
        className={`flex items-center bg-[#fff6e4] my-8 py-4 px-4 rounded-lg ${
          platform === "Qiita" ? "font-bold dark:bg-yellow-700" : ""
        }`}
      >
        <div
          className={`flex items-center justify-center bg-[#d4af37] text-black w-[1.25em] h-[1.25em] rounded-full m-4`}
        >
          <i>i</i>
        </div>
        <small>
          確認問題はブラウザ拡張によって挿入された非公式モジュールです（詳細は
          <a
            href="https://quizenn-df3jqgubgq-an.a.run.app"
            target="_blank"
            className="underline"
          >
            こちら
          </a>
          ）
        </small>
      </div>
      {quizList.length === 0 && (
        <div className="text-center my-4">
          <button
            onClick={handleCreateQuiz}
            disabled={!!loading}
            className={`w-1/2 min-w-96 py-2 border rounded-full text-white ${
              loading
                ? "bg-gray-300"
                : platform === "dev" || platform === "Zenn"
                ? "bg-zenn-primary"
                : platform === "Qiita"
                ? "bg-qiita-primary"
                : ""
            }`}
          >
            {loading === "loading"
              ? "ローディング中です"
              : loading === "quizCreating"
              ? "時間をおいてリロードしてください"
              : "確認問題を作成する"}
          </button>
        </div>
      )}
      {quizList.map((quiz) => (
        <QuizBox
          key={quiz.id}
          quiz={quiz}
          platform={platform === "dev" ? "Zenn" : platform}
        />
      ))}
    </div>
  );
};
