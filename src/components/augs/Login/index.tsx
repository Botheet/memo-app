"use client";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { LoginFormCard } from "./LoginFormCard";
import { useRecoilValue } from "recoil";
import { test } from "@/globalState/Atom/test";

export const Login = () => {
	const ex = useRecoilValue(test);
	return (
		<Box
			pt={14}
			sx={{
				minHeight: "100vh",
				backgroundImage: "url(./loginPageBackground.png)",
				backgroundSize: "cover"
			}}
		>
			<Typography variant="h4" color={"white"} textAlign={"center"}>
				{ex}
			</Typography>
			<Box display="flex" justifyContent={"center"}>
				<LoginFormCard />
			</Box>
		</Box>
	);
};
