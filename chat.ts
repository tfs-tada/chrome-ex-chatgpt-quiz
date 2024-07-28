// type Content = {
//   role: "system" | "assistant" | "user";
//   content: string;
// };

const OPENAPI_TOKEN = process.argv[2];
const endpointUrl = "https://api.openai.com/v1/chat/completions";
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${OPENAPI_TOKEN}`,
};
const systemContext = `
- いまからwebページのbodyに関するinnerTextの情報が渡されます。bodyの内容を分析した上で、その情報に関する4択クイズを作成してください。
  - 回答者は事前情報なしでクイズを解きます。何に関するクイズなのかを明示してください
- bodyの内容は、プログラミングに関する仕様書であることが多いです。
- クイズの構造は、以下の型に倣った配列形式のjsonで返してください。
  - mdにjsonを埋め込むときのような \`\`\`json は不要です。絶対に書いてはいけません。
  - 受け取った値は、そのままjsonファイルに保存されます。必ずjsonファイルに保存できる形で返してください。

{
  "question": string; // 問題文。必ず「○○の××に関する問題です」で始めて、その後に問題文を記述してください
  "choices": string[]; // 選択肢
  "answer": string; // 正解となる選択肢
  "explanation": string; // 解説。間違いの選択肢についても簡単に説明してください
}[]

- 5問以上のクイズを作成してください。
  - 全ての問題文に対して、回答者が事前情報なしで回答できるようにしてください。
`;

const connectChatGpt = async (text: string) => {
  const data = await fetch(endpointUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0.5,
      messages: [
        { role: "system", content: systemContext },
        { role: "user", content: text },
      ],
    }),
  }).then((res) => res.json());
  return data;
};

(async () => {
  const innerText = `innerText`;
  const res = await connectChatGpt(innerText);
  console.log(res.choices[0].message.content);
})();
