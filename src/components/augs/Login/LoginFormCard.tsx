import { CustomCard } from "@/components/core/CustomCard";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Typography, TextField, InputAdornment, IconButton, Button, Box, Divider } from "@mui/material";
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
			password: z
				.string()
				.min(8, "パスワードは8文字以上12文字以下で使用してください")
				.max(12, "パスワードは8文字以上12文字以下で使用してください")
		})
		.required();

	const [showPassword, setShowPassword] = useState(false);

	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm<LoginFormBody>({ resolver: zodResolver(schema), mode: "onBlur" });

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const onSubmit = ({ email, password }) => {
		console.log({ email, password });
	};

	return (
		<CustomCard title={"MEMOへログイン"}>
			<Box
				display="flex"
				flexDirection="column"
				component="form"
				onSubmit={handleSubmit(onSubmit)}
				gap={2}
				textAlign="center"
			>
				<TextField
					size="small"
					color="secondary"
					{...register("email")}
					error={Boolean(errors.email)}
					helperText={errors.email?.message}
					FormHelperTextProps={{ sx: { maxWidth: "230px" } }}
					label="Email"
					type="email"
					variant="outlined"
				/>

				<TextField
					size="small"
					color="secondary"
					{...register("password")}
					error={Boolean(errors.password)}
					helperText={errors.password?.message}
					FormHelperTextProps={{ sx: { maxWidth: "230px" } }}
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
				/>
				<Button variant="contained" size="large" color="info" type="submit" endIcon={<LoginTwoToneIcon />}>
					ログイン
				</Button>
				<Link href="#" color="navy">
					<Typography fontSize="12px">パスワードを忘れた場合はこちら</Typography>
				</Link>
				<Divider variant="middle" />
				<Button variant="contained" size="large" color="success" endIcon={<AccountCircleIcon />}>
					アカウントを新規作成
				</Button>
			</Box>
		</CustomCard>
	);
};
