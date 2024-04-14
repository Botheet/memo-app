"use client";

import axios from "axios";
import { useState } from "react";
import { SubmitButton } from "@/components/augs/Login/SubmitButton";

import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone";
import { IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import { PrimaryButton } from "@/components/core/Button";

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

	return (
		<Box component="form" sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }} noValidate autoComplete="off">
			<Typography variant="h3" component="h2">
				MEMOアプリ
			</Typography>
			<Typography>ログインフォーム</Typography>
			<TextField
				label="Email"
				type="email"
				variant="outlined"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>

			<TextField
				label="Password"
				type={showPassword ? "text" : "password"}
				variant="outlined"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
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
			<PrimaryButton
				icon={<LoginTwoToneIcon />}
				buttonText="Login"
				onClickButton={function (number: number): void {
					throw new Error("Function not implemented.");
				}}
			/>
		</Box>
	);
};
