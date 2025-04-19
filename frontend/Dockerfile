FROM node:22.14.0

# 1. Corepack を有効化して pnpm を利用可能にする
RUN corepack enable pnpm

# 2. pnpm の仮想ストアを PATH に追加
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /app

# 3. 依存インストール用にマニフェストのみ先にコピー
COPY package*.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 4. アプリケーションコードをコピー
COPY . .

# 5. Next.js のデフォルト開発ポートを公開
EXPOSE 3000

# 6. 開発サーバーをすべてのインターフェースで起動
CMD ["pnpm", "exec", "next", "dev", "-H", "0.0.0.0"]
