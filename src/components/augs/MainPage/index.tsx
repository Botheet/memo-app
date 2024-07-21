"use client";

import { MainLeftTop } from "@/components/augs/MainPage/MainLeftTop";
import { MemoForm } from "@/components/augs/MainPage/MemoForm";
import { MainLoadingList } from "@/components/augs/MainPage/MainLoadingList";
import { TrashBoxButtom } from "@/components/core/TrashBoxButtom";
import { useGetMemos } from "@/modules/apiHooks/hooks";
import { MemoContents } from "@/types";
import { Box, Grid, List, ListItem, ListItemButton, ListItemText, Paper } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

export default function main() {
	const { getMemosData, getMemosError, getMemosIsPending } = useGetMemos();
	// console.log(getMemosData);

	const [selectedMemoIndex, setSelectedMemoIndex] = useState(0);

	// const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string
	// ) => {
	// 	setSelectedMemoIndex(selectedMemoIndex);
	// };

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
							<MainLoadingList />
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
											<ListItemButton
												onClick={() => setSelectedMemoIndex(index)}
												selected={selectedMemoIndex === index}
											>
												<ListItemText primary={memo.title} />
											</ListItemButton>
										</ListItem>
									);
								})}
							</List>
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
			<Grid item xs={8}>
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
					{/* </Grid> */}
				</Grid>
			</Grid>
		</Grid>
	);
}
