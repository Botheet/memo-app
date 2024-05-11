"use client";

import axios from "axios";
import { useState } from "react";
import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone";
import { Button, Divider, IconButton, Link, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Image from "next/image"; // Next.jsのImageコンポーネントをインポート
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type LoginFormBody = { email: string; password: string };

const schema = z
	.object({
		email: z.string().email("正しい形式で入力してください"),
		password: z
			.string()
			.min(8, "パスワードは8文字以上12文字以下で使用してください")
			.max(12, "パスワードは8文字以上12文字以下で使用してください")
	})
	.required();

export const Login = () => {
	const [showPassword, setShowPassword] = useState(false);

	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm<LoginFormBody>({ resolver: zodResolver(schema), mode: "onBlur" });

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	// カスタムテーマを作成
	const inputTheme = createTheme({
		components: {
			MuiInputLabel: {
				styleOverrides: {
					root: {
						color: "color" // ラベルの色
					}
				}
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

	const onSubmit = ({ email, password }) => {
		console.log({ email, password });
	};

	return (
		<Box style={{ position: "fixed", top: "0", left: "0", width: "100%", height: "100%", zIndex: "-1" }}>
			<Image src="/ログインページ背景.png" layout="fill" objectFit="cover" alt={""} />
			<Box style={{ position: "relative", minHeight: "100vh" }}>
				<Box
					component="form"
					onSubmit={handleSubmit(onSubmit)}
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
					<Box mt={14}>
						<Typography sx={{ textAlign: "center" }} variant="h4" color={"white"} margin={1}>
							MEMO app
						</Typography>
						<Card sx={{ backgroundColor: "rgba(255,255,255,1)" }}>
							<CardContent sx={{ textAlign: "center" }}>
								<Typography>MEMOへログイン</Typography>
								<Grid container spacing={1} alignItems="center" justifyContent="center" direction="column">
									{/* Email 入力フィールド */}
									<Grid item xs={10}>
										<ThemeProvider theme={inputTheme}>
											<TextField
												{...register("email")}
												error={Boolean(errors.email)}
												helperText={errors.email?.message}
												label="Email"
												type="email"
												variant="outlined"
												size="small"
											/>
										</ThemeProvider>
									</Grid>

									{/* Password 入力フィールド */}
									<Grid item xs={12}>
										<ThemeProvider theme={inputTheme}>
											<TextField
												{...register("password")}
												error={Boolean(errors.password)}
												helperText={errors.password?.message}
												label="Password"
												type={showPassword ? "text" : "password"}
												variant="outlined"
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
										</ThemeProvider>
									</Grid>

									{/* ログインボタン */}
									<Grid xs={12} md={15} sx={{ marginTop: 2 }} container justifyContent="center">
										<Button variant="contained" size="large" color="info" type="submit" sx={{ width: "245px" }}>
											ログイン
											<LoginTwoToneIcon />
										</Button>
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

								{/* 新規作成ボタン */}
								<Grid xs={1} md={15} sx={{ marginTop: 1 }} container justifyContent="center">
									<Button variant="contained" size="large" color="success" type="submit" sx={{ width: "250px" }}>
										アカウント新規作成
										<AccountCircleIcon />
									</Button>
								</Grid>
							</CardContent>
						</Card>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
