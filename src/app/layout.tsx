"use client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@/styles/theme";
import Header from "@/components/core/Header";
import { CssBaseline } from "@mui/material";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

const queryClient = new QueryClient();

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
					<QueryClientProvider client={queryClient}>
						<RecoilRoot>
							<Header>{children}</Header>
						</RecoilRoot>
					</QueryClientProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
