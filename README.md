# Suppaume — Nintendo-Style Playful Engineering Portfolio

[![GitHub Profile](https://img.shields.io/badge/GitHub-Suppaume1103-E60012?style=flat&logo=github)](https://github.com/Suppaume1103)
[![Aesthetic](https://img.shields.io/badge/Design-Nintendo%20Switch%20%2F%20Playful-E60012?style=flat)]()
[![Stack](https://img.shields.io/badge/Stack-Java25%20%7C%20TS%20%7C%20React%20%7C%20Three.js-00C3E3?style=flat)]()
[![Audio](https://img.shields.io/badge/Sound-Web%20Audio%20Switch%20SFX-FFB300?style=flat)]()
[![Zero Build](https://img.shields.io/badge/Zero--Build-100%25%20CDN%20Powered-00D26A?style=flat)]()

**任天堂（Nintendo Switch / Nintendo Direct）の世界観とあそび心を詰め込んだ、ワクワクするエンジニア・ポートフォリオです！**
100% CDN駆動（Zero-Build）で動作し、スマートフォン・タブレット・PC全画面に対応しています。

---

## 🌟 特徴と任天堂風デザインギミック

1. **任天堂アイデンティティ & Switch デザイン言語**
   - **任天堂レッド（`#E60012`） & Joy-Conカラー**: ネオンブルー（`#00C3E3`）、ネオングリーン（`#00D26A`）、スーパーイエロー（`#FFB300`）。
   - **親しみやすい丸ゴシック**: Google Fonts の `M PLUS Rounded 1c` × `Nunito` を採用。
   - **押し込み感のある3Dプッシュボタン**: 押したくなる立体的なボタン（`btn-nintendo-red` / `btn-nintendo-white`）。
   - **Switchソフト風パッケージカード**: Joy-Conカラーストライプやポップなバッジが付いたゲームソフトセレクター風カード。

2. **Web Audio API による Nintendo Switch サウンド演出**
   - 外部音声ファイル不要！ブラウザの周波数シンセサイズにより完全スタンドアロンで再生。
   - **Switchクリック音**: ボタンタップ時やリンク選択時の心地よい「カチッ！」というJoy-Con着脱/決定音。
   - **コインゲット音**: メールアドレスコピー時の「チャリン♪」という2音ジングル。
   - ナビ右上の **🔊 サウンドボタン** でいつでもワンタップでON/OFF切り替え可能。

3. **Three.js によるポップな3Dトイ・ブロックワールド**
   - センターの回転する赤いクエスチョン風ブロックと、周りをぽよんと浮遊・自転するカラフルなJoy-Conカラースフィア＆キューブ。
   - マウスやスマホのタッチスワイプ（`touchmove`）にバウンシーに追従。

4. **任天堂カラーの紙吹雪（Confetti）演出**
   - 赤・青・黄・緑の任天堂カラーがパッと弾けるマイクロインタラクション。

5. **スマートフォン・完全レスポンシブ対応**
   - モバイルハンバーガーメニュー、ボトムシート型Switch風ダイアログ、指一本でスワイプできる丸型フィルタータブ。

---

## 🚀 掲載プロジェクト（GitHub リポジトリ）

GitHub（[@Suppaume1103](https://github.com/Suppaume1103)）で公開されている3つの本格的なリポジトリを、ワクワクするタイトルとして掲載しています。

### 1. DOT STICKER CHAT
- **ジャンル**: マルチプレイ Web / WebSocket
- **主要技術**: `React`, `TypeScript`, `Node.js`, `Express`, `Socket.IO`, `PostgreSQL`, `HTML5 Canvas`, `Render`
- **概要**: 16×16ドット絵をお題に合わせて描き、リアルタイム広場やチャットで流通！時間による失効と、みんなの保存数でぐんぐん育つソーシャルあそび空間。

### 2. 茶柱立ち 3D (Tea Bowl Physics)
- **ジャンル**: 3D 物理演算 / WebGL
- **主要技術**: `TypeScript`, `Three.js`, `Cannon-es`, `Simplex Noise`, `Tween.js`, `lil-gui`, `Vite`
- **概要**: 日本の縁起物「茶柱」を、剛体物理演算（Cannon-es）と液面波紋（Simplex Noise）でリアルタイム3Dシミュレーションしたインタラクティブ作品。

### 3. Mood-Bridge 映画レコメンダー
- **ジャンル**: 知能情報処理 / NLP & AI
- **主要技術**: `Java 25`, `Apache Lucene 9`, `Kuromoji`, `OpenNLP`, `OpenAI API`, `TMDB API`, `OkHttp3`, `Maven`
- **概要**: 言葉にしづらい「今のキブン」から、形態素解析・TF-IDFベクトル検索・OpenAI LLM推論で最適な映画を導き出す知能型レコメンドエンジン。

---

## 📂 ディレクトリ構成

```
handon_antigravity_portfolio/
├── index.html              # メインエントリーポイント（任天堂風UI・全CDN読み込み）
├── assets/
│   ├── css/
│   │   └── style.css       # 任天堂レッド、Switchボタン、Joy-Conスタイル
│   └── js/
│       └── main.js         # Web Audio API音源、Three.jsトイワールド、多言語切替
└── README.md               # プロジェクト解説ドキュメント
```

---

## 💻 プレビュー・実行方法

### 1. 最も手軽な方法
`index.html` をお好みのWebブラウザ（Google Chrome, Edge, Safari など）にドラッグ＆ドロップまたはダブルクリックで開くだけで動作します。

### 2. ローカルサーバーで確認する場合
```powershell
# Python を使用する場合
python -m http.server 3000

# Node.js (npx) を使用する場合
npx serve .
```
ブラウザで `http://localhost:3000` にアクセスしてください。

### 3. GitHub Pages への公開手順
1. 本リポジトリを GitHub の任意のリポジトリ（例: `portfolio` または `<username>.github.io`）にプッシュします。
2. GitHub のリポジトリ設定（Settings）→「Pages」へ進みます。
3. **Branch** を `main`、**Folder** を `/ (root)` に設定して「Save」をクリックします。
4. 数十秒で公開URLが発行され、世界中からアクセス可能になります。
