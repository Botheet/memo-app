"use client";

import { MainLeftTop } from "@/components/augs/MainPage/MainLeftTop";
import { MemoForm } from "@/components/augs/MainPage/MemoForm";
import { MainLoadingList } from "@/components/augs/MainPage/MainLoadingList";
import { TrashBoxButtom } from "@/components/core/TrashBoxButtom";
import { useGetMemos } from "@/modules/apiHooks/hooks";
import { MemoContents } from "@/types";
import { Box, Grid, List, ListItem, ListItemButton, ListItemText, Paper } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export default function main() {
	const { getMemosData, getMemosError, getMemosIsPending } = useGetMemos();

	const [selectedMemoIndex, setSelectedMemoIndex] = useState(0);

	// 編集中であることを管理するステートを追加

	// ①新しいメモを作成した状態を管理するステートをここに追加。true,falseの判定
	const [newMemoCreate, setNewMemoCreate] = useState(false);

	const inputRef = useRef<HTMLInputElement>(null);

	const handleFocus = () => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	};

	useEffect(() => {
		handleFocus();
		// console.log(inputRef);
	}, [selectedMemoIndex, getMemosData]);

	const handleCreateButtonClick = () => {
		setNewMemoCreate(true);
		handleFocus();
	};

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
						<MainLeftTop handleCreateButtonClick={handleCreateButtonClick} />
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
								{newMemoCreate && (
									<ListItem disablePadding>
										<ListItemButton>
											<ListItemText primary={"新しいメモ"} />
										</ListItemButton>
									</ListItem>
								)}
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
								ref={inputRef}
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
