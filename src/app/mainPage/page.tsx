"use client";

import { MainLeftTop } from "@/components/augs/MainPage/LeftTop";
import { MemoForm } from "@/components/augs/WriteBody";
import { WriteTitle } from "@/components/augs/WriteTitle";
import { LoadingList } from "@/components/core/ListSkeleton";
import { TrashBoxButtom } from "@/components/core/TrashBoxButtom";
import { useGetMemos } from "@/modules/apiHooks/hooks";
import { MemoContents } from "@/types";
import {
	Box,
	Button,
	Grid,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Paper,
	Skeleton,
	Typography
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function mainPage() {
	const { getMemosData, getMemosError, getMemosIsPending } = useGetMemos();
	// console.log(getMemosData);

	const [selectedMemoIndex, setSelectedMemoIndex] = useState(0);

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
							<List>
								{getMemosData.map((memo: MemoContents, index: number) => {
									return (
										<ListItem key={memo.id} disablePadding>
											<ListItemButton onClick={() => setSelectedMemoIndex(index)}>
												<ListItemText primary={memo.title} />
											</ListItemButton>
										</ListItem>
									);
								})}
							</List>
							{/* {getMemosData.map((memo: MemoContents, index: number) => {
								return (
									<Box>
										<Button onClick={() => setSelectedMemoIndex(index)}>
											<Typography key={memo.id}>{memo.title}</Typography>
										</Button>
									</Box>
								);
							})} */}
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
							{/* <WriteTitle /> WriteBodyから取得するようにする */}
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

							{getMemosIsPending || !getMemosData ? undefined : (
								<MemoForm
									content={getMemosData[selectedMemoIndex].content}
									title={getMemosData[selectedMemoIndex].title}
								/>
								// <Typography>{getMemosData[selectedMemoIndex].content}</Typography>
							)}
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
