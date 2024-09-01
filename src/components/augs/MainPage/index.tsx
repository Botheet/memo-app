"use client";

import { MainLeftTop } from "@/components/augs/MainPage/MainLeftTop";
import { MemoForm } from "@/components/augs/MainPage/MemoForm";
import { MainLoadingList } from "@/components/augs/MainPage/MainLoadingList";
import { TrashBoxButtom } from "@/components/core/TrashBoxButtom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useGetMemos, usePostNewMemoApi, usePutTrashMemoRequestApi } from "@/modules/apiHooks/hooks";
import { MemoContents, PostNewMemoFormBody, TrashMemoMutationVariables } from "@/types";
import { Box, Button, Grid, List, ListItem, ListItemButton, ListItemText, Paper } from "@mui/material";
import Link from "next/link";
import React, { use, useEffect, useRef, useState } from "react";
import { AlertDialog } from "./AlertDialog";
import { Padding } from "@mui/icons-material";
import { DeleteDialog } from "./DeleteDialog";

export default function main() {
	const { getMemosData, getMemosError, getMemosIsPending, refetchMemosData } = useGetMemos();

	const [open, setOpen] = React.useState(false);

	// dialog
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

	// ゴミ捨てダイアログの挙動

	const [selectedTrashMemoId, setSelectedTrashMemoId] = useState<number | null>(null);
	const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [selectedDeleteIndex, setSelectedDeleteIndex] = useState<number | null>(null);
	const handleTrashMemoDialogOpenClick = (index: number, id: number) => {
		setDeleteDialogOpen(true);
		console.log("deleteDialog");
		setSelectedDeleteIndex(index);
		setSelectedTrashMemoId(id);
	};
	const handleTrashMemoDialogClose = () => {
		setDeleteDialogOpen(false);
		setSelectedDeleteIndex(null);
		setSelectedTrashMemoId(null);
	};

	//ゴミ捨てダイアログ内の削除ボタンの挙動
	const { mutationPutTrashMemo } = usePutTrashMemoRequestApi();
	const onSubmitPutTrashMemo = (putBody: TrashMemoMutationVariables) => {
		mutationPutTrashMemo.mutate(putBody, {
			onSuccess: () => {
				// データの再取得や状態の更新処理をここに記述
				refetchMemosData();
			}
		});
	};

	const selectedTrashMemosArrayFilter = getMemosData
		? getMemosData.filter((memo: MemoContents) => memo.id === selectedTrashMemoId)
		: [];

	// 新規作成ボタンをクリックした際の挙動。本文にフォーカスする機能付き。
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
	const onSubmitPostNewMemo = (postBody: PostNewMemoFormBody) => {
		mutationPostNewMemo.mutate(postBody);
	};

	return (
		<Grid container spacing={0.5} marginTop={8}>
			{/* 新規メモを保存せずに他のメモへ移動しようとした場合のアラート（他ボタンへは未対応） */}
			<AlertDialog open={open} handleClose={handleClose} handleExitWithoutSavingClick={handleExitWithoutSavingClick} />
			<DeleteDialog
				open={isDeleteDialogOpen}
				handleClose={handleTrashMemoDialogClose}
				handlePutTrashMemo={onSubmitPutTrashMemo}
				id={selectedTrashMemoId}
				title={selectedTrashMemosArrayFilter.length > 0 ? selectedTrashMemosArrayFilter[0].title : ""}
				content={selectedTrashMemosArrayFilter.length > 0 ? selectedTrashMemosArrayFilter[0].content : ""}
			/>
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
						{/* 左上（新規・削除） */}
						<MainLeftTop handleCreateButtonClick={handleCreateButtonClick} />
					</Paper>
				</Grid>
				{/* 左中段　メモリスト */}
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
								{getMemosData
									.filter((memo: MemoContents) => !memo.complete_flag)
									.map((memo: MemoContents, index: number) => {
										return (
											<ListItem key={memo.id} disablePadding sx={{ display: "flex", flexDirection: "row" }}>
												<ListItemButton
													onClick={() => {
														handlePrevMemoListClick(); //ダイアログで注意→このファルスをまとめた関数を作ってここにいれる
														setSelectedMemoIndex(index);
													}}
													sx={{ backgroundColor: index === selectedDeleteIndex ? "pink" : undefined }}
													selected={selectedMemoIndex === index && selectedDeleteIndex === null && !newMemoCreate}
												>
													<ListItemText primary={memo.title} />
												</ListItemButton>
												<Button
													// color={index === selectedDeleteIndex ? "error" : undefined}
													onClick={(e) => {
														e.stopPropagation();
														handleTrashMemoDialogOpenClick(index, memo.id);
													}}
												>
													<DeleteOutlineIcon color={index === selectedDeleteIndex ? "error" : undefined} />
												</Button>
											</ListItem>
										);
									})}
							</List>
						</Paper>
					)}
				</Grid>
				{/* 左下段　ゴミ箱 */}
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
