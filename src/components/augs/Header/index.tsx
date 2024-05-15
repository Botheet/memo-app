// Header.tsx
//■ChatGPTそのまま引用←（修正したら削除）

import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import { AccountIcon } from "@/components/core/Icons/accountIcon";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

// アカウントアイコンとプルダウンメニューのコンポーネント
type HeaderProps = { children: React.ReactNode };

const Header: React.FC<HeaderProps> = ({ children }) => {
	// ログイン状態やアカウント情報によって表示を変える処理などを追加する必要があります

	return (
		<Box>
			<AppBar position="fixed" sx={{ backgroundColor: "rgba(50, 230, 230, 0.2)" }}>
				<Toolbar sx={{ minHeight: 5, maxHeight: 5, width: "100%", flexWrap: "nowrap" }}>
					{/* ページアイコン */}
					<Link href="/">
						{/*最終的にここがトップページ*/}
						{/* ロゴ */}
						<Avatar alt="Logo" src="/memoIcon.png" sx={{ width: 35, height: 35, marginRight: 2 }} />
					</Link>
					{/* ヘッダータイトル */}
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Your App
					</Typography>

					{/* ログイン / 新規登録リンク */}
					<nav>
						<p>
							<Link href="/login">ログイン</Link>
						</p>
						<p>
							<Link href="/signup">アカウント新規登録</Link>
						</p>
					</nav>
					{/* アカウントアイコンとプルダウンメニュー */}
					<AccountIcon />
				</Toolbar>
			</AppBar>
			{children}
		</Box>
	);
};

export default Header;
