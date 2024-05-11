// TextFieldを試作したが、index.tsxの行をそこまで省略できそうないため、未使用とする。相談後削除。

// import { TextField, ThemeProvider, createTheme } from "@mui/material";
// import React from "react";

// const LoginTextField = (props) => {
// 	const { error, helperText, label = "string", type, icon } = props;

// 	// カスタムテーマを作成
// 	const inputTheme = createTheme({
// 		components: {
// 			MuiInputLabel: {
// 				styleOverrides: {
// 					root: {
// 						color: "color" // ラベルの色
// 					}
// 				}
// 			}
// 		}
// 	});

// 	return (
// 		<ThemeProvider theme={inputTheme}>
// 			<TextField
// 				error={error}
// 				helperText={helperText}
// 				label={label}
// 				type={type}
// 				variant="outlined"
// 				size="small"
// 				InputProps={{
// 					endAdornment: icon // アイコンを表示
// 				}}
// 			/>
// 		</ThemeProvider>
// 	);
// };

// export default LoginTextField;
