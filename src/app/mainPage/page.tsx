"use client";

import { Grid, Paper } from "@mui/material";
import React from "react";

export default function mainPage() {
	return (
		// 左のフレーム
		<Grid container spacing={0.5} marginTop={8}>
			<Grid item xs={3}>
				<Paper
					sx={{
						height: 550,
						backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A2027" : "#fff")
					}}
				>
					左
				</Paper>
			</Grid>

			{/* 真ん中のフレーム */}
			<Grid item xs={7} container spacing={0.1} direction="column" justifyContent="center" alignItems="stretch">
				<Grid>
					<Paper
						sx={{
							height: 50,
							backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A2027" : "#fff")
						}}
					>
						タイトル
					</Paper>
				</Grid>

				<Grid>
					<Paper
						sx={{
							height: 500,
							backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A2027" : "#fff")
						}}
					>
						本文
					</Paper>
				</Grid>
			</Grid>
			{/* 右のフレーム */}
			<Grid item xs={2}>
				<Paper
					sx={{
						height: 550,
						backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A2027" : "#fff")
					}}
				>
					右
				</Paper>
			</Grid>
		</Grid>
	);
}
