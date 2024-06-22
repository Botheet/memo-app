"use client";

import { MainLeftTop } from "@/components/augs/MainPage/LeftTop";
import { WriteBody } from "@/components/augs/WriteBody";
import { WriteTitle } from "@/components/augs/WriteTitle";
import { TrashBoxButtom } from "@/components/core/TrashBoxButtom";
import { apiClient } from "@/libs/apiClient";
import { Grid, Paper, Typography } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function mainPage() {
	const [memos, setMemos] = useState([]);

	useEffect(() => {
		const getMemos = async () => {
			try {
				const response = await apiClient.get("/api/memos/");
				console.log(response.data);
				setMemos(response.data);
			} catch (error) {
				console.error("Error registering user:", error);
			}
		};
		getMemos();
	}, []);

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
						<MainLeftTop />
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
						{memos.map((memo) => {
							return <Typography key={memo.id}>{memo.title}</Typography>;
						})}
						{/* <MemoTitleList /> */}
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
						<Link href="/trashBox">
							<TrashBoxButtom />
						</Link>
					</Paper>
				</Grid>
			</Grid>
			{/* 真ん中のフレーム */}
			<Grid item xs={8.5}>
				<Grid container spacing={-1} direction="column" justifyContent="center">
					<Grid>
						<Paper
							sx={{
								height: 50,
								backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A2027" : "#fff")
							}}
						>
							<WriteTitle />
						</Paper>
					</Grid>
					<Grid>
						<Paper
							sx={{
								// height: "auto",
								minHeight: "580px",
								backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A2027" : "#fff")
							}}
						>
							{/* <Box sx={{ Height: "100%" }}> */}
							<WriteBody />
							{/* </Box> */}
						</Paper>
					</Grid>
				</Grid>
			</Grid>
			{/* 右のフレーム */}
			{/* <Grid item xs={2}>
				<Paper
					sx={{
						height: "auto",
						minHeight: "630px",
						backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A2027" : "#fff")
					}}
				>
					右
				</Paper>
			</Grid> */}
		</Grid>
	);
}
