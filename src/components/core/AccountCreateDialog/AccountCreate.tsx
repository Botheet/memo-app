import { LoginFormBody } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Box, TextField, InputAdornment, IconButton, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const AccountCreate = () => {
	const schema = z
		.object({
			email: z.string().email("正しい形式で入力してください"),
			password: z
				.string()
				.min(8, "パスワードは8文字以上12文字以下で作成してください")
				.max(12, "パスワードは8文字以上12文字以下で作成してください")
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

	//パスワードの確認とパスワードの入力内容があっているか確認するのも作成
	return (
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
			<Button variant="contained" size="large" color="success" endIcon={<AccountCircleIcon />}>
				アカウントを新規作成
			</Button>
		</Box>
	);
};
