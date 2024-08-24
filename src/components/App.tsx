import { useEffect, useState } from "react";
import { Article, Platform, Quiz } from "../type";
import { QuizBox } from "./QuizBox";
import { createQuizes } from "../repository/createQuizes";
import { fetchArticle } from "../repository/fetchArticle";

const hostRegex = {
  Qiita: /https:\/\/qiita\.com\/(?<author>[^/]+)\/items\/(?<id>[^/]+)/,
  Zenn: /https:\/\/zenn\.dev\/(?<author>[^/]+)\/articles\/(?<id>[^/]+)/,
  Mdn: /https:\/\/developer\.mozilla\.org\/ja\/docs\/(?<id>.+)/,
} as const satisfies Record<Platform, RegExp>;

const sortChoices = (quizList: Quiz[]) => {
  return quizList.map((e: Quiz) => ({
    ...e,
    quizChoices: e.quizChoices.toSorted(() => Math.random() - 0.5),
  }));
};

export const App = ({ platform }: { platform: Platform }) => {
  const [, setArticle] = useState<Article | null>(null);
  const [quizList, setQuizList] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<"loading" | "quizCreating" | false>(
    "loading"
  );
  const [isError, setIsError] = useState(false);
  const currentUrl = `${window.location.origin}${window.location.pathname}`;

  const handleCreateQuiz = async () => {
    setLoading("loading");
    const match = currentUrl.match(hostRegex[platform]);
    if (!match) {
      return null;
    }
    const { author, id } = match.groups!;
    const { error, data } = await createQuizes({
      author: platform === "Mdn" ? "mdn" : author,
      articleId: id,
      platform,
    });
    if (error) {
      setIsError(true);
      return;
    }
    if (data.length === 0) {
      setLoading("quizCreating");
      return;
    }
    setQuizList(sortChoices(data));
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      const match = currentUrl.match(hostRegex[platform]);
      if (!match) {
        return null;
      }
      const { author, id } = match.groups!;
      const { error, data } = await fetchArticle({
        author: platform === "Mdn" ? "mdn" : author,
        articleId: id,
        platform,
      });
      if (error) {
        setIsError(true);
        return;
      }
      const { quizes, ...d } = data;
      setArticle(d);
      setQuizList(sortChoices(quizes));
      setLoading(false);
    })();
  }, []);

  return (
    <div className="mb-4">
      {platform === "Zenn" ? (
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
          platform === "Zenn" ? "" : "font-bold dark:bg-yellow-700"
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
            href="https://quizenn-df3jqgubgq-an.a.run.app/about"
            target="_blank"
            className="underline"
          >
            こちら
          </a>
          ）
        </small>
      </div>
      {isError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-4 rounded relative">
          <strong className="font-bold">
            サーバーエラーが発生しました。時間をおいてリロードしてください。
          </strong>
        </div>
      )}
      {!isError && quizList.length === 0 && (
        <div className="text-center my-4">
          <button
            onClick={handleCreateQuiz}
            disabled={!!loading}
            className={`w-1/2 min-w-96 py-2 border rounded-full text-white ${
              loading
                ? "bg-gray-300 cursor-not-allowed"
                : platform === "Zenn"
                ? "bg-zenn-primary"
                : platform === "Qiita"
                ? "bg-qiita-primary"
                : "bg-mdn-primary"
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
        <QuizBox key={quiz.id} quiz={quiz} platform={platform} />
      ))}
    </div>
  );
};
