# chrome-ex-chatgpt-quiz

技術記事に確認問題モジュールを自動挿入する Chrome 拡張機能です。特定のwebページを開くと、記事の内容に沿った確認問題モジュールが自動で挿入されます

![確認問題モジュール](https://github.com/user-attachments/assets/d3b90927-3dfe-4c3b-9134-301de771ad13)

## 注意

- **拡張対象のページでは Content Security Policy が無効化されます。自己責任でお使いください**
- apiサーバに接続してクイズを取得します。サーバーサイドが突然死ぬ可能性があります
  - サーバーサイド: https://quizenn-df3jqgubgq-an.a.run.app/
- クイズ生成には外部AIサービスを使用しています。クイズや解説の正確性については保証できません

## インストール

### 1. このリポジトリをクローンするか、ZIP ファイルをダウンロードして解凍。

```bash
git clone git@github.com:tfs-tada/chrome-ex-chatgpt-quiz.git
```

### 2. Chrome の拡張機能のページを開く

* <a href="chrome://extensions/">chrome://extensions/</a>

### 3. 右上の「デベロッパーモード」を有効にする

![デベロッパーモードを有効にする](https://github.com/user-attachments/assets/a6950d8c-ce9d-43c2-8d92-75c118fa8746)

### 4. 「パッケージ化されていない拡張機能を読み込む」をクリックし、先ほどクローンしたディレクトリの中にある ex フォルダを選択

![パッケージ化されていない拡張機能を読み込む](https://github.com/user-attachments/assets/b9eae562-e090-4d11-b15b-c459455d670f)

読み込みが成功したら、拡張一覧に chrome-ex-chatgpt-quiz が表示されます。
![選択したらこの画面になります](https://github.com/user-attachments/assets/f1beafaf-a0dd-4613-a49c-58000d4cf792)

### 5. 拡張対象のwebページを開く

対応ページを訪問すると、ページの下部に「確認問題」モジュールが自動挿入されます
現在対応しているページは以下の通りです

- Zenn（記事）: https://zenn.dev/
- Qiita（記事）: https://qiita.com/
- MDN（ドキュメント）: https://developer.mozilla.org/
