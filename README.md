# ⚠️このリポジトリは開発中のプロジェクトです

---

# Kantan Play MIDIプレイヤー

Kantan Play MIDIプレイヤーは、Webブラウザ上で動作し、数字入力によるシーケンスをMIDI（BLE MIDI対応）経由でKantan Play（MIDI機器）へ送信・演奏できるアプリケーションです。

## 概要

- ブラウザからMIDI機器（Kantan Play）をMIDIまたはBLE MIDI経由で演奏
- ユーザーが画面上で数字（1〜7）を入力し、シーケンスを作成
- BPM・倍数・繰り返し回数などの設定が可能
- 入力したシーケンスを任意のタイミングで再生・停止

## 主な機能

- Web MIDI API/BLE MIDIによるMIDI機器接続
- シーケンス入力UI（数字キーで1〜7を入力、ステップ表示・カーソル移動）
- BPM・倍数・繰り返し回数の設定UI
- 再生・停止ボタンによるシーケンス演奏制御
- 入力数字をMIDIノート（1→60, 2→62, ...）にマッピングし、正しいタイミングで送信
- MIDI接続状態の画面表示
- モダンかつレスポンシブなUI/UX

## セットアップ

1. このリポジトリをクローン

```sh
git clone https://github.com/necobit/kantanplay-player.git
cd kantanplay-player
```

2. 必要な依存パッケージをインストール（※今後追加予定）

```sh
# 例: npm install
```

3. 開発サーバー起動（例: Vite/Next.js等を利用予定）

```sh
# 例: npm run dev
```

4. 対応ブラウザ（Chrome推奨）でアクセス

## 使い方

1. MIDI/BLE MIDIデバイスを接続
2. 画面上でシーケンス（1〜7の数字）を入力
3. BPM・倍数・繰り返し回数を設定
4. 再生ボタンでシーケンスを演奏
5. 停止ボタンで演奏停止

## 動作環境

- Web MIDI API/BLE MIDI対応ブラウザ（Google Chrome推奨）
- Kantan Play等のMIDI機器

## ライセンス

このプロジェクトのライセンスは [LICENSE](./LICENSE) をご参照ください。

---

## 注意事項

- 本プロジェクトは現在開発中です。仕様・UI・機能は今後大きく変更される可能性があります。
- IssueやPRによるフィードバック・コントリビュート歓迎です。
