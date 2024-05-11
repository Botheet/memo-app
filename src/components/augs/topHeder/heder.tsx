// Header.tsx
//■ChatGPTそのまま引用←（修正したら削除）

import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import { AccountIcon } from "@/components/core/Icons/avatar";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

// アカウントアイコンとプルダウンメニューのコンポーネント

const Header: React.FC = () => {
	// ログイン状態やアカウント情報によって表示を変える処理などを追加する必要があります

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" sx={{ backgroundColor: "#e6e6e6", boxShadow: "none" }}>
				<Toolbar sx={{ minHeight: 50 }}>
					{/* ページアイコン */}
					<Link href="/page.tsx">
						{/*最終的にここがトップページ*/}
						{/* ロゴ */}
						<Avatar alt="Logo" src="/memoIcon.png" sx={{ width: 50, height: 50, marginRight: 2 }} />
					</Link>
					{/* ヘッダータイトル */}
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Your App
					</Typography>

					{/* ログイン / 新規登録リンク */}
					<nav>
						<p>
							<Link href="/login">
								<a>*</a>
							</Link>
						</p>
						<p>
							<Link href="/signup">
								<a>アカウント新規登録</a>
							</Link>
						</p>
					</nav>
					{/* アカウントアイコンとプルダウンメニュー */}
					<AccountIcon />
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Header;
