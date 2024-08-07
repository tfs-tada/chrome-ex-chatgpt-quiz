import { useEffect, useState } from "react";
import { Quiz } from "./type";
import { QuizBox } from "./QuizBox";

const urlRegex =
  /https:\/\/zenn\.dev\/(?<author>[^/]+)\/articles\/(?<id>[^/]+)/;
export const App = () => {
  const [quizList, setQuizList] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      const currentUrl = window.location.href;
      const match = currentUrl.match(urlRegex);
      if (!match) {
        return null;
      }
      const { author, id } = match.groups!;
      const response = await fetch(
        `http://localhost:3000/api/quiz?author=${author}&id=${id}`
      );
      const data = await response.json();
      setQuizList(data);
      setLoading(false);
    })();
  }, []);
  if (loading) {
    return <>loading...</>;
  }
  return (
    <>
      {quizList.map((quiz) => (
        <QuizBox key={quiz.id} quiz={quiz} />
      ))}
    </>
  );
};
