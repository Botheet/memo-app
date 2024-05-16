import { createTheme } from "@mui/material";

export const theme = createTheme({
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				header: { padding: "0 !important" },
				body: {
					wordWrap: "break-word",
					wordBreak: "break-all",
					padding: "0 !important",
					margin: "0 !important"
				}
			}
		}
	},
	palette: {
		primary: {
			main: "#fff9cc",
			contrastText: "#4d4d4d"
		},
		secondary: {
			main: "#ffa74f",
			contrastText: "#ffffff"
		},
		error: {
			main: "#dc143c"
		}
		// info: {
		// 	main: "#00bfff"
		// }
		// text: {
		// 	primary:
		// },
		// warning: {
		// 	main:
		// },
		// darkPurple: {
		// 	main:
		// },
		// lightPurple: {
		// 	main:
		// },
		// whitePurple: {
		// 	main:
		// 	contrastText:
		// },
		// registrationPink: {
		// 	main:
		// 	contrastText:
		// }
	},
	typography: {
		fontFamily: "Inter, sans-serif"
	}
});
