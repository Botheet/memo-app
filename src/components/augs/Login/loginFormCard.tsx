import { CustomCard } from "@/components/core/CustomCard";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
	Typography,
	TextField,
	InputAdornment,
	IconButton,
	Button,
	Box,
	Divider,
	Grid,
	ThemeProvider,
	createTheme
} from "@mui/material";
import Link from "next/link";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { LoginFormBody } from "@/types";

export const LoginFormCard = () => {
	const schema = z
		.object({
			email: z.string().email("正しい形式で入力してください"),
			password: z.string().min(8, "パスワードが違います").max(12, "パスワードが違います")
		})
		.required();

	const [showPassword, setShowPassword] = useState(false);

	const {
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

	return (
		<CustomCard title={"MEMOへログイン"}>
			<Grid container spacing={1} alignItems="center" justifyContent="center" direction="column">
				{/* Email 入力フィールド */}
				<Box display="flex" flexDirection={"column"} gap={3}>
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
						{/* Password 入力フィールド */}
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
										<IconButton aria-label="toggle password visibility" onClick={togglePasswordVisibility} edge="end">
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								)
							}}
							size="small"
						/>
					</ThemeProvider>
				</Box>

				{/* ログインボタン */}
				<Grid xs={12} md={15} sx={{ marginTop: 3 }} container justifyContent="center">
					<Button variant="contained" size="large" color="info" type="submit" sx={{ width: "245px" }}>
						ログイン
						<LoginTwoToneIcon />
					</Button>
				</Grid>
			</Grid>
			<Box mt={1} mb={2} sx={{ textAlign: "center", marginTop: 2 }}>
				<Typography variant="caption" display="block" gutterBottom>
					<Link href="#" color={"navy"}>
						{/* <Typography underline="hover"> */}
						{"パスワードを忘れた場合はこちら"}
						{/* </Typography> */}
					</Link>
				</Typography>
			</Box>

			{/* 区切り線 */}
			<Divider variant="middle" sx={{ my: 2 }} />

			{/* 新規作成ボタン */}
			<Grid xs={12} md={15} sx={{ marginTop: 1 }} container justifyContent="center">
				<Button variant="contained" size="large" color="success" type="submit" sx={{ width: "250px" }}>
					アカウント新規作成
					<AccountCircleIcon />
				</Button>
			</Grid>
		</CustomCard>
	);
};
