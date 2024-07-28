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
  {
    question: string; // 問題文。必ず「○○の××に関する問題です」で始めて、その後に問題文を記述してください
    choices: string[]; // 選択肢
    answer: string; // 正解となる選択肢
    explanation: string; // 解説。間違いの選択肢についても簡単に説明してください
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
  const innerText = `
  他のバージョンの文書
PostgreSQL 8.0.4 文書
前のページ	巻戻し	第 9章関数と演算子	早送り	次のページ
9.20. システム管理関数

表9-44に、実行時設定パラメータの問い合わせや変更に使用できる関数を示します。

表 9-44. パラメータを設定する関数

名前	戻り値型	説明
current_setting(setting_name)	text	現在の設定値
set_config(setting_name, new_value, is_local)	text	パラメータを設定し、その新規値を返す

current_settingは、setting_nameの現在の設定値を返します。 この関数は、SQLのSHOWコマンドと同じです。 以下に例を示します。

SELECT current_setting('datestyle');

 current_setting
-----------------
 ISO, MDY
(1 row)

set_config関数により、setting_nameパラメータの設定をnew_valueに変更することができます。 ただし、is_localがtrueに設定されている場合、新規値は現在のトランザクションにのみ適用されます。 新規値を現在のセッションに適用する場合は、代わりにfalseを使用してください。 この関数は、SQLのSETコマンドと同じです。 以下に例を示します。

SELECT set_config('log_statement_stats', 'off', false);

 set_config
------------
 off
(1 row)

表9-45に示す関数は、制御用シグナルを他のサーバプロセスに送信します。 この関数の使用はスーパーユーザのみに制限されています。

表 9-45. バックエンドシグナル送信関数

名前	戻り値型	説明
pg_cancel_backend(pid)	int	バックエンドの現在の問い合わせをキャンセル

この関数は成功時に1を、失敗時に0を返します。 実行中のバックエンドのプロセスID（pid）はpg_stat_activityビューの procpid列から、もしくは、psを使用してサーバ上のpostgresプロセスを監視することで得ることができます。

表9-46に示す関数はオンラインバックアップの作成を補助するものです。 これらの関数の使用はスーパーユーザに制限されています。

表 9-46. バックアップ制御関数

名前	戻り値型	説明
pg_start_backup(label_text)	text	オンラインバックアップの実行準備を実施
pg_stop_backup()	text	オンラインバックアップの実行を停止

pg_start_backupは、ユーザが任意に定義したバックアップラベルである、パラメータを1つ受付けます。 （通常、格納に使用するバックアップダンプファイルにちなんだ名前が付けられます。） この関数は、データベースクラスタのデータディレクトリにバックアップラベルファイルを書き出し、バックアップを始めるWALオフセットをテキスト形式で返します。 （ユーザはこの結果値に注意する必要はありません。しかし、使用されることもありますのでこの値が提供されています。）

pg_stop_backupは、pg_start_backupで作成されたラベルファイルを削除し、代わりに、WALアーカイブ領域にバックアップ履歴ファイルを作成します。 履歴ファイルにはpg_start_backupで付与されたラベル、バックアップのWALオフセットの開始位置、終了位置、バックアップ開始時刻、終了時刻が含まれます。 戻り値は、バックアップの終了WALオフセットです（これも同様に稀に使用されることがあります）。

この関数の正しい使用方法については、項22.3を参照してください。

前のページ	ホーム	次のページ
システム情報関数	上に戻る	型変換
  `;
  const res = await connectChatGpt(innerText);
  console.log(res.choices[0].message.content);
})();
