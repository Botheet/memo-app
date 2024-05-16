"use client";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Image from "next/image"; // Next.jsのImageコンポーネントをインポート
import { LoginFormCard } from "./loginFormCard";

type LoginFormBody = { email: string; password: string };

export const Login = () => {
	return (
		<Box
			sx={{
				position: "fixed",
				top: "0",
				left: "0",
				width: "100%",
				height: "100%",
				overflow: "auto",
				backgroundImage: "url('/ログインページ背景.png')", //背景崩れ回避のため、cssにて記述
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat"
			}}
		>
			<Box
				sx={{
					position: "relative",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					height: "100%"
				}}
			>
				<Typography variant="h4" color="white" mt={2} textAlign="center">
					MEMO app
				</Typography>
				<Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
					<LoginFormCard />
				</Box>
			</Box>
		</Box>
	);
};
