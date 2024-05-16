// Header.tsx
//■ChatGPTそのまま引用←（修正したら削除）

import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import DrawerMenuIcon from "@/components/core/DrawerMenuIcon";

// アカウントアイコンとプルダウンメニューのコンポーネント
type HeaderProps = { children: React.ReactNode };

const Header: React.FC<HeaderProps> = ({ children }) => {
	// ログイン状態やアカウント情報によって表示を変える処理などを追加する必要があります

	return (
		<Box>
			<AppBar position="fixed" sx={{ backgroundColor: "rgba(2, 2, 2, 0)", boxShadow: "none", marginTop: 0 }}>
				<Toolbar sx={{ minHeight: 2, maxHeight: 3, width: "100%", flexWrap: "nowrap" }}>
					{/* ページアイコン */}
					<Link href="/">
						{/*最終的にここがトップページ*/}
						{/* ロゴ */}
						<Avatar alt="Logo" src="/memoIcon.png" sx={{ width: 35, height: 30, marginRight: 2, marginTop: 1 }} />
					</Link>
					{/* ヘッダータイトル */}
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Your App
					</Typography>

					{/* ログイン / 新規登録リンク */}

					{/* アカウントアイコンとプルダウンメニュー */}
					<Box marginRight={3}>
						<DrawerMenuIcon />
					</Box>
				</Toolbar>
			</AppBar>
			{children}
		</Box>
	);
};

export default Header;
