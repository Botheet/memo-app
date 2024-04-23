"use client";

import axios from "axios";
import { useState } from "react";
import { SubmitButton } from "@/components/augs/Login/SubmitButton";

import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone";
import { Button, Divider, IconButton, Link, Paper, Typography } from "@mui/material";
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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Margin } from "@mui/icons-material";

import Image from "next/image"; // Next.jsのImageコンポーネントをインポート

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
		<div style={{ position: "fixed", top: "0", left: "0", width: "100%", height: "100%", zIndex: "-1" }}>
			<Image src="/ログインページ背景.png" layout="fill" objectFit="cover" alt={""} />
			<div style={{ position: "relative", minHeight: "100vh" }}>
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
					<Box mt={6}>
						<Typography sx={{ textAlign: "center" }} variant="h4" color={"white"} margin={1}>
							MEMO app
						</Typography>
						<Card sx={{ backgroundColor: "rgba(255,255,255,1)" }}>
							<CardContent sx={{ textAlign: "center" }}>
								<Typography>MEMOへログイン</Typography>
								<Grid container spacing={1} alignItems="center" justifyContent="center" direction="column">
									{/* Email 入力フィールド */}
									<Grid item xs={10}>
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
									<Grid xs={12} md={15} sx={{ marginTop: 1 }} container justifyContent="center">
										<ThemeProvider theme={colorTheme}>
											<PrimaryButton
												fullWidth
												size="large"
												icon={<LoginTwoToneIcon />}
												buttonText="ログイン"
												color="info"
												onClickButton={function (number: number): void {
													throw new Error("Function not implemented.");
												}}
											/>
										</ThemeProvider>
									</Grid>
								</Grid>
								<Box mt={1} mb={2} sx={{ textAlign: "center", marginTop: 2 }}>
									<Typography variant="caption" display="block" gutterBottom>
										<Link href="#" underline="hover" color={"navy"}>
											{"パスワードを忘れた場合はこちら"}
										</Link>
									</Typography>
								</Box>
								{/* 区切り線 */}
								<Divider variant="middle" sx={{ my: 2 }} />

								{/* ログインボタン */}
								<Grid xs={1} md={15} sx={{ marginTop: 1 }} container justifyContent="center">
									<ThemeProvider theme={colorTheme}>
										<PrimaryButton
											fullWidth
											size="large"
											color="success"
											icon={<AccountCircleIcon />}
											buttonText="アカウントを新規作成"
											onClickButton={function (number: number): void {
												throw new Error("Function not implemented.");
											}}
										/>
									</ThemeProvider>
								</Grid>
							</CardContent>
						</Card>
					</Box>
				</Box>
			</div>
		</div>
	);
};
