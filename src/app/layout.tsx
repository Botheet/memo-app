"use client";
import { Inter } from "next/font/google";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@/styles/theme";
import Header from "@/components/augs/Header";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<ThemeProvider theme={theme}>
					<Header>{children}</Header>
				</ThemeProvider>
			</body>
		</html>
	);
}
