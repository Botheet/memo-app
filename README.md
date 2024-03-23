# メモアプリ作成用リポジトリ

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

```auth/token/```で取得したアクセストークンをAuthorizeで入力しておくと、実際リクエストしてレスポンスの確認が可能

この仕様書を見ながらメモアプリ機能を実装していく

### メモアプリ機能要件
- ユーザーの新規登録機能
- ユーザーのログイン認証機能
- メモの登録(Create)
- メモの一覧を表示(Read)
- メモの編集(Update)
- メモの削除(Delete)
- completed_flagは使っても使わなくてもよい
