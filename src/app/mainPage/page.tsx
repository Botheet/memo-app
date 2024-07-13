"use client";

import { MainLeftTop } from "@/components/augs/MainPage/LeftTop";
import { WriteBody } from "@/components/augs/WriteBody";
import { WriteTitle } from "@/components/augs/WriteTitle";
import { LoadingList } from "@/components/core/ListSkeleton";
import { TrashBoxButtom } from "@/components/core/TrashBoxButtom";
import { useGetMemos } from "@/modules/apiHooks/hooks";
import { Box, Grid, Paper, Skeleton, Typography } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function mainPage() {
	const { getMemosData, getMemosError, getMemosIsPending } = useGetMemos();
	// console.log(getMemosData);

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
					{getMemosIsPending || !getMemosData ? (
						<Box padding={2} minHeight="500px" height="auto">
							<LoadingList />
						</Box>
					) : (
						<Paper
							sx={{
								height: "auto",
								minHeight: "500px",
								backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A2027" : "#fff")
							}}
						>
							{getMemosData.map((memo) => {
								return <Typography key={memo.id}>{memo.title}</Typography>;
							})}
							{/* <MemoTitleList /> */}
						</Paper>
					)}
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
							elevation={0}
							sx={{
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
								marginTop: "8px",
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
