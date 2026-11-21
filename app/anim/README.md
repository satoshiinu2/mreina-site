# トップページ アニメーション案（検討用）

本体トップには未反映の提案置き場。各案は現行の文言・配色を前提に、ヒーロー周りの動きだけを変えたモック。

- `/anim` — 案一覧と総評
- `/anim/a-terminal` — A ターミナル / タイプライター
- `/anim/b-glitch` — B グリッチ / 文字デコード
- `/anim/c-wave` — C 波メッシュ（Canvas）
- `/anim/d-particles` — D パーティクル（Canvas）
- `/anim/e-aurora` — E オーロラ（CSSのみ）
- `/anim/f-scroll` — F スクロール連動 / 最小モーション

全案 `prefers-reduced-motion` 対応。採用する案が決まったら、その動きだけを `app/page.tsx` 側へ移植する。
