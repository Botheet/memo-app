"use client";

import { MainLeftTop } from "@/components/augs/MainPage/MainLeftTop";
import { MemoForm } from "@/components/augs/MainPage/MemoForm";
import { MainLoadingList } from "@/components/augs/MainPage/MainLoadingList";
import { TrashBoxButtom } from "@/components/core/TrashBoxButtom";
import { useGetMemos, usePostNewMemoApi } from "@/modules/apiHooks/hooks";
import { MemoContents, PostNemMemoFormBody } from "@/types";
import { Box, Grid, List, ListItem, ListItemButton, ListItemText, Paper } from "@mui/material";
import Link from "next/link";
import React, { use, useEffect, useRef, useState } from "react";
import { AlertDialog } from "./AlertDialog";

export default function main() {
	const { getMemosData, getMemosError, getMemosIsPending } = useGetMemos();

	const [open, setOpen] = React.useState(false);

	// daialog
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const [selectedMemoIndex, setSelectedMemoIndex] = useState(0);

	// 編集中であることを管理するステートを追加

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

	const handleExitWithoutSavingClick = () => {
		setNewMemoCreate(false);
	};

	// useEffect(() => {}, []);
	const handlePrevMemoListClick = () => {
		if (newMemoCreate) {
			handleClickOpen();
		}
		// setNewMemoCreate(false) 後で移動させる
	};

	useEffect(() => {
		if (!newMemoCreate) {
			// console.log("click");
		}
	}, [newMemoCreate]);

	// const onSubmitEditMemo = () => {};

	const { mutationPostNewMemo } = usePostNewMemoApi();
	const onSubmitPostNewMemo = (postBody: PostNemMemoFormBody) => {
		mutationPostNewMemo.mutate(postBody);
	};

	return (
		<Grid container spacing={0.5} marginTop={8}>
			<AlertDialog open={open} handleClose={handleClose} handleExitWithoutSavingClick={handleExitWithoutSavingClick} />
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
										<ListItemButton selected={newMemoCreate}>
											<ListItemText primary={"新しいメモ"} />
										</ListItemButton>
									</ListItem>
								)}
								{getMemosData.map((memo: MemoContents, index: number) => {
									return (
										<ListItem key={memo.id} disablePadding>
											<ListItemButton
												onClick={() => {
													handlePrevMemoListClick(); //ダイアログで注意→このファルスをまとめた関数を作ってここにいれる
													setSelectedMemoIndex(index);
												}}
												selected={selectedMemoIndex === index && !newMemoCreate}
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
							<TrashBoxButtom
							// メモ編集中に移動しようとしたときにダイアログでるようにする
							/>
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
						{getMemosIsPending || !getMemosData ? undefined : (
							<MemoForm
								content={!newMemoCreate ? getMemosData[selectedMemoIndex].content : ""}
								title={!newMemoCreate ? getMemosData[selectedMemoIndex].title : ""}
								ref={inputRef}
								onSubmitPostNewMemo={onSubmitPostNewMemo}
							/>
						)}
					</Paper>
				</Grid>
			</Grid>
		</Grid>
	);
}
