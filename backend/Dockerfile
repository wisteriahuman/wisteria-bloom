FROM python:3.12.3

# 作業ディレクトリの設定
WORKDIR /app

# Poetry のインストール
RUN pip install poetry

# 必要なファイルをコピー
COPY poetry.lock pyproject.toml /app/

# 依存関係をインストール
RUN poetry install --no-root

#　アプリケーションのソースコードをコピー
COPY . .

# ポートの公開
EXPOSE 8000

#　アプリケーションの起動
CMD ["poetry", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]