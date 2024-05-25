import React from "react";
import { Container, Typography, Button, Stack } from "@mui/material";
import { styled } from "@mui/system";
import Link from "next/link";

const MainContainer = styled(Container)({
	height: "100vh",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	textAlign: "center",
	background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
});

const StyledButton = styled(Button)({
	margin: "10px",
	padding: "10px 20px",
	fontSize: "1.2rem",
	borderRadius: "30px",
	backgroundColor: "#4CAF50",
	color: "#fff",
	"&:hover": {
		backgroundColor: "#45A049"
	}
});

export const Home: React.FC = () => {
	return (
		<MainContainer>
			<Typography variant="h2" component="h1" gutterBottom>
				Welcome to SimpleMemo
			</Typography>
			<Typography variant="h6" component="p" gutterBottom>
				Keep your notes organized and accessible.
			</Typography>
			<Stack direction="row" spacing={2} justifyContent="center">
				<Link href="/login" passHref>
					<StyledButton variant="contained">Login</StyledButton>
				</Link>
				<Link href="/register" passHref>
					<StyledButton variant="contained">Sign Up</StyledButton>
				</Link>
			</Stack>
		</MainContainer>
	);
};
