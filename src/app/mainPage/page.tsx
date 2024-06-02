"use client";

import { LeftBottom } from "@/components/augs/MainPage/LeftBottom";
import { LeftTop } from "@/components/augs/MainPage/LeftTop";
import { Grid, Paper } from "@mui/material";
import React from "react";

export default function mainPage() {
	return (
		// 左のフレーム
		<Grid container spacing={0.5} marginTop={8}>
			<Grid item xs={3}>
				<Grid>
					<Paper
						sx={{
							height: "auto",
							minHeight: "50px",
							backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A2027" : "#fff")
						}}
					>
						<LeftTop />
					</Paper>
				</Grid>
				<Grid>
					<Paper
						sx={{
							height: "auto",
							minHeight: "430px",
							backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A2027" : "#fff")
						}}
					>
						作成したメモのタイトルを表示
					</Paper>
				</Grid>
				<Grid>
					<Paper
						sx={{
							height: "auto",
							minHeight: "70px",
							backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A2027" : "#fff")
						}}
					>
						<LeftBottom />
					</Paper>
				</Grid>
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
							height: "auto",
							minHeight: "500px",
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
						height: "auto",
						minHeight: "550px",
						backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A2027" : "#fff")
					}}
				>
					右
				</Paper>
			</Grid>
		</Grid>
	);
}
