"use client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@/styles/theme";
import Header from "@/components/augs/Header";
import { CssBaseline } from "@mui/material";
import { RecoilRoot } from "recoil";

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<RecoilRoot>
						<Header>{children}</Header>
					</RecoilRoot>
				</ThemeProvider>
			</body>
		</html>
	);
}
