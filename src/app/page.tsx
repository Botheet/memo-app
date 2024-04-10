"use client";

import axios from "axios";
import { useState } from "react";
import { IconButton, Typography } from "@mui/material";
import AlarmIcon from "@mui/icons-material/Alarm";
import { SubmitButton } from "@/components/augs/Login/SubmitButton";
import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone";
import { Login } from "@mui/icons-material";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";

export default function Home() {
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const onClickButton = () => {
		axios("https://jsonplaceholder.typicode.com/users")
			.then((res) => {
				console.log(
					res.data.filter((item) => {
						return item.id % 2 === 0;
					})
				);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<Box component="form" sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }} noValidate autoComplete="off">
			<h1>MEMOアプリ</h1>
			<p>ログインフォーム</p>
			<TextField label="Email" type="email" variant="outlined" />
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
			<SubmitButton icon={<LoginTwoToneIcon />} buttonText="login" />
		</Box>
	);
}
