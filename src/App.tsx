import { useEffect, useState } from "react";
import { Article, Platform, Quiz } from "./type";
import { QuizBox } from "./QuizBox";

const hostRegex = {
  dev: /https:\/\/zenn\.dev\/(?<author>[^/]+)\/articles\/(?<id>[^/]+)/,
  Qiita: /https:\/\/qiita\.com\/(?<author>[^/]+)\/items\/(?<id>[^/]+)/,
  Zenn: /https:\/\/zenn\.dev\/(?<author>[^/]+)\/articles\/(?<id>[^/]+)/,
} as const satisfies Record<Platform, RegExp>;
const dummyHref = "https://zenn.dev/kurashiki0ecma/articles/83097b7945201b";

export const App = ({ platform }: { platform: Platform }) => {
  const [, setArticle] = useState<Article | null>(null);
  const [quizList, setQuizList] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const createQuiz = async () => {
    setLoading(true);
    const currentUrl = platform === "dev" ? dummyHref : window.location.href;
    const match = currentUrl.match(hostRegex[platform]);
    if (!match) {
      return null;
    }
    const { author, id } = match.groups!;
    const response = await fetch(`http://localhost:3000/api/quiz`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author,
        articleId: id,
        platform: platform === "dev" ? "Zenn" : platform,
      }),
    });
    const data = await response.json();
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
      const response = await fetch(
        `http://localhost:3000/api/article?author=${author}&articleId=${id}&platform=${
          platform === "dev" ? "Zenn" : platform
        }`
      );
      const data = await response.json();
      setArticle(data);
      setLoading(false);
    })();
  }, []);

  // const shwoLoading =
  //   loading || quizList.length === 0 || article?.quizStatus === "NONE";

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
      <div>
        <small>
          確認問題はブラウザ拡張によって挿入された非公式モジュールです
        </small>
      </div>
      {quizList.length === 0 && (
        <div className="text-center my-4">
          <button
            onClick={createQuiz}
            disabled={loading}
            className={`w-1/2 py-2 border rounded-full text-white
            ${
              loading
                ? "bg-gray-300"
                : platform === "dev" || platform === "Zenn"
                ? "bg-zenn-primary"
                : platform === "Qiita"
                ? "bg-qiita-primary"
                : ""
            }
            `}
          >
            {loading ? "ローディング中です" : "問題を作成"}
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
