"use client";

import axios from "axios";
import { useState } from "react";
import { SubmitButton } from "@/components/augs/Login/SubmitButton";

import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone";
import { Button, IconButton, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import { PrimaryButton } from "@/components/core/Button";
import { createTheme, styled } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import { Margin } from "@mui/icons-material";

// interface LoginFormProps {
// 	onSubmit: (email: string, password: string) => void;
// }

export const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const colorTheme = createTheme({
		palette: {
			primary: {
				main: "#ffab91",
				contrastText: "#fff"
			}
		}
	});

	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
		...theme.typography.body2,
		padding: theme.spacing(1),
		textAlign: "center",
		color: theme.palette.text.secondary
	}));

	return (
		<Box
			component="form"
			sx={{
				"& .MuiTextField-root": { m: 1, width: "25ch" },
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column"
			}}
			noValidate
			autoComplete="off"
		>
			<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
				<Typography variant="h3" component="h2">
					MEMOアプリ
				</Typography>
				<Typography>ログインフォーム</Typography>
			</Box>

			<Box mt={4}>
				<Card>
					<CardContent>
						<Grid container spacing={1} alignItems="center" justifyContent="center" direction="column">
							{/* Email 入力フィールド */}
							<Grid item xs={12}>
								<TextField
									label="Email"
									type="email"
									variant="outlined"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									size="small"
								/>
							</Grid>
							{/* Password 入力フィールド */}
							<Grid item xs={12}>
								<TextField
									label="Password"
									type={showPassword ? "text" : "password"}
									variant="outlined"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={togglePasswordVisibility}
													edge="end"
												>
													{showPassword ? <VisibilityOff /> : <Visibility />}
												</IconButton>
											</InputAdornment>
										)
									}}
									size="small"
								/>
							</Grid>
							{/* ログインボタン */}
							<Grid item xs={12} md={2}>
								<ThemeProvider theme={colorTheme}>
									<PrimaryButton
										fullWidth
										size="large"
										icon={<LoginTwoToneIcon />}
										buttonText="ログイン"
										onClickButton={function (number: number): void {
											throw new Error("Function not implemented.");
										}}
									/>
								</ThemeProvider>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Box>
		</Box>
	);
};
