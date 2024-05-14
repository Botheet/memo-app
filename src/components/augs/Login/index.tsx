"use client";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Image from "next/image"; // Next.jsのImageコンポーネントをインポート
import { LoginFormCard } from "./LoginFormCard";

export const Login = () => {
	return (
		<Box style={{ position: "fixed", top: "0", left: "0", width: "100%", height: "100%", zIndex: "-1" }}>
			<Image src="/ログインページ背景.png" layout="fill" objectFit="cover" alt={""} />
			<Box style={{ position: "relative", minHeight: "100vh" }}>
				<Typography variant="h4" color={"white"} mt={14} textAlign={"center"}>
					MEMO app
				</Typography>
				<Box display="flex" justifyContent={"center"}>
					<LoginFormCard />
				</Box>
			</Box>
		</Box>
	);
};
