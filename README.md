# Simple Calculator

## 開発環境準備

```bash
# .envファイル作成、内容を追記・修正
$ cp .env.sample .env

# パッケージをインストール
$ pnpm i
```

## スクリプト実行方法

```bash
# Type Check
$ pnpm typecheck

# Lint
$ pnpm lint:fix

# Format
$ pnpm fmt:fix

# Dev Server
$ pnpm dev

# Build
$ pnpm build

# Preview
$ pnpm start
```

## Drizzle

```bash
# src/db/schema.tsを修正

# マイグレーションファイル作成
$ pnpm db:generate --name="create t_xxxxx"
$ pnpm db:generate --name="modify t_xxxxx"

# DBへ反映
$ pnpm db:migrate
```
