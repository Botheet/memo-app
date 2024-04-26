## メモアプリ作成用リポジトリ

**フロントエンド開発環境**

- TypeScript
- Next.js
- MUI

**バックエンド用のAPIメモ**

```
Email: memo-api@example.com
Username: admin-user
pass:**********
```

**実装されているバックエンド**

- Python
- Django
- MySQL
- AWS(EC2)

**リポジトリ**は[こちら](https://github.com/dende-h/sampleMemoApi)

### How to use

**管理画面ログイン**
http://sampleMemoApi-239289635.ap-northeast-1.elb.amazonaws.com/admin

ログインするとデータベースの操作をブラウザ画面で直接行うことができる。
ユーザーを追加することも可能

**API仕様書の閲覧**
http://sampleMemoApi-239289635.ap-northeast-1.elb.amazonaws.com/schema/swagger-ui
http://sampleMemoApi-239289635.ap-northeast-1.elb.amazonaws.com/schema/redoc

`auth/token/`で取得したアクセストークンをAuthorizeで入力しておくと、実際リクエストしてレスポンスの確認が可能

この仕様書を見ながらメモアプリ機能を実装していく

### メモアプリ機能要件

- ユーザーの新規登録機能
- ユーザーのログイン認証機能
- メモの登録(Create)
- メモの一覧を表示(Read)
- メモの編集(Update)
- メモの削除(Delete)
- completed_flagは使っても使わなくてもよい

### プロジェクトルール

**命名規則**

- appディレクトリ配下のディレクトリ名はキャメルケース
- コンポーネント名、コンポーネント配下のディレクトリ名はパスカルケース
- 通常の関数や変数名はキャメルケース
- 型を作成する場合はパスカルケース
- カスタムフックはuseで始まるキャメルケース
- 命名にスネークケース、ケバブケースは禁止

**ディレクトリ構成**

```tree
├── next-env.d.ts 基本いじらない
├── next.config.js 基本いじらない
├── node_modules
├── package.json
├── public 画像ファイルを入れる
├── src
│   ├── app ページコンポーネントを置く
│   ├── components
│   │   ├── core 色んな箇所で使用する共通コンポーネント
│   │   └── augs pageコンポーネント配下で使用されるコンポーネント
│   ├── constants 定数系のアイテムを入れておく
│   ├── libs ライブラリ由来のファイル（拡張等）
│   ├── modules グローバルステートやカスタムhooks, データフェッチなどをまとめる
│   ├── styles css等のスタイリング（本構成ではMUIのTheme拡張のみ）
│   └── types 色んな箇所で使用する型の定義をまとめる
└── tsconfig.json 基本いじらない
```

**コーディングルール(ここは随時話し合いながら変えていく)**

- /src/app
  - ページコンポーネントを置く
  - /dashboard/page.tsx というファイルを設置すると `http://localhost:3000/dashboard` というページに展開される
  - /dashboard/[id]/page.tsx というファイルを設置すると`http://localhost:3000/dashboard/:id`というページに展開される
    - これは Dynamic Routing と呼ばれるもので id によって動的にページを変更してくれるもの
  - ページコンポーネントでは主に下記の処理をする
    - その page の pathname や id を取得する
    - 現在ログインしている情報を取得する
  - ロジックなどやデータフェッチは/src/components/augs 配下で行う
- /src/components/core
  - 共通コンポーネントを置く
  - index.tsx ファイルが主のコンポーネントとする
    - index.tsx で使用するがファイルを切り分けたい場合はその配下に\*\*\*.tsx という形で配置して ok
  - ディレクトリ名はパスカルケース
  - ページ固有のコンポーネントは /src/components/augs 配下に置く
  - デザインが異なり、props でも表現ができないものはそのディレクトリ配下にさらにディレクトリ作成化
    - 例）/src/components/core/Card をご覧ください
  - ロジック記述禁止
    - /src/components/augs などで記述し、props を渡してください
  - 直接のデータフェッチ禁止
    - /src/modules で記述した hooks を/src/components/augs などで記述し、props を渡してください
- /src/components/augs
  - ページ固有のコンポーネントを置く
  - index.tsx ファイルが主のコンポーネントとする
  - 基本、ページと同じディレクトリ名でパスカルケースで命名
  - ロジックを記述して/src/components/core に渡して ok
  - 直接のデータフェッチ禁止
    - /src/modules で記述した hooks を import して使用
  - ディレクトリをネストしても良い
    - 例えば/src/components/orgs/SearchAroundEstate は/searchAroundEstate ページのコンポーネントに関するコードを記載しているが、/searchAroundEstate/rental ページに関するディレクトリを配下に設置して ok
    - /src/components/orgs/SearchAroundEstate がわかりやすい例
- /src/modules
  - カスタムフック、グローバルステート、データフェッチに関するコードを置く
  - データフェッチしたデータやフェッチ関数はカスタムフックで提供する
  - グローバルステートが絡む関数もカスタムフックで提供
