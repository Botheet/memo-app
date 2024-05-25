"use client";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { LoginFormCard } from "./LoginFormCard";

export const Login = () => {
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
				MEMO app
			</Typography>
			<Box display="flex" justifyContent={"center"}>
				<LoginFormCard />
			</Box>
		</Box>
	);
};
