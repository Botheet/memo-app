"use client";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import AuthButton from "./AuthButton";

// import { LoginFormCard } from "./LoginCard";

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
			<Typography variant="h4" color={"white"} textAlign={"center"}></Typography>
			<Box display="flex" justifyContent={"center"}>
				<AuthButton />
				{/* <LoginFormCard /> */}
			</Box>
		</Box>
	);
};
