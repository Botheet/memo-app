"use client";

import { MainLeftTop } from "@/components/augs/MainPage/LeftTop";
import { TrashBoxLeftTop } from "@/components/augs/TrashBoxPage/TrashBoxLeftTop";
import { MainPageButton } from "@/components/core/MainPageButton";
import { Grid, Paper } from "@mui/material";
import React from "react";

export default function mainPage() {
	return (
		<Grid container spacing={0.5} marginTop={8}>
			{/* 左のフレーム */}
			<Grid item xs={3.5}>
				<Grid>
					<Paper
						sx={{
							height: "auto",
							minHeight: "80px",
							backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A2027" : "#fff")
						}}
					>
						<TrashBoxLeftTop />
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
						<li>作成したメモのタイトルを表示</li>
					</Paper>
				</Grid>
				<Grid>
					<Paper
						sx={{
							height: "auto",
							minHeight: "50px",
							backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A2027" : "#fff")
						}}
					>
						<MainPageButton />
					</Paper>
				</Grid>
			</Grid>

			{/* 真ん中のフレーム */}
			<Grid item xs={8.5}>
				<Grid container spacing={0} direction="column" justifyContent="center">
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
								minHeight: "580px",
								backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A2027" : "#fff")
							}}
						>
							本文
						</Paper>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}
