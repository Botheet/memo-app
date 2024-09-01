"use client";

import { MainLeftTop } from "@/components/augs/MainPage/MainLeftTop";
import { MemoForm } from "@/components/augs/MainPage/MemoForm";
import { MainLoadingList } from "@/components/augs/MainPage/MainLoadingList";
import { TrashBoxButtom } from "@/components/core/TrashBoxButtom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useGetMemos, usePostNewMemoApi, useReturnMemoRequestApi } from "@/modules/apiHooks/hooks";
import { MemoContents, PostNewMemoFormBody, ReturnMemoMutationVariables } from "@/types";
import { Box, Button, Grid, List, ListItem, ListItemButton, ListItemText, Paper } from "@mui/material";
import Link from "next/link";
import React, { use, useEffect, useRef, useState } from "react";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import { ReturnDialog } from "./ReturnMemoDialog";

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
	}, [selectedMemoIndex, getMemosData]);

	// ゴミ捨てダイアログの挙動

	const [selectedReturnMemoId, setSelectedReturnMemoId] = useState<number | null>(null);
	const [isReturnDialogOpen, setReturnDialogOpen] = useState(false);
	const [selectedReturnIndex, setSelectedReturnIndex] = useState<number | null>(null);
	const handleReturnMemoDialogOpenClick = (index: number, id: number) => {
		setReturnDialogOpen(true);
		setSelectedReturnIndex(index);
		setSelectedReturnMemoId(id);
	};
	const handleReturnMemoDialogClose = () => {
		setReturnDialogOpen(false);
		setSelectedReturnIndex(null);
		setSelectedReturnMemoId(null);
	};

	//ゴミ捨てダイアログ内の削除ボタンの挙動
	const { mutationPutReturnMemo } = useReturnMemoRequestApi();
	const onSubmitPutReturnMemo = (putBody: ReturnMemoMutationVariables) => {
		mutationPutReturnMemo.mutate(putBody, {
			onSuccess: () => {
				// データの再取得や状態の更新処理をここに記述
				refetchMemosData();
			}
		});
	};

	const selectedReturnMemosArrayFilter = getMemosData
		? getMemosData.filter((memo: MemoContents) => memo.id === selectedReturnMemoId)
		: [];

	// 新規作成ボタンをクリックした際の挙動。本文にフォーカスする機能付き。
	const handleCreateButtonClick = () => {
		setNewMemoCreate(true);
		handleFocus();
	};
	const handleExitWithoutSavingClick = () => {
		setNewMemoCreate(false);
	};

	const handlePrevMemoListClick = () => {
		if (newMemoCreate) {
			handleClickOpen();
		}
	};

	useEffect(() => {
		if (!newMemoCreate) {
		}
	}, [newMemoCreate]);

	const { mutationPostNewMemo } = usePostNewMemoApi();
	const onSubmitPostNewMemo = (postBody: PostNewMemoFormBody) => {
		mutationPostNewMemo.mutate(postBody);
	};

	return (
		<Grid container spacing={0.5} marginTop={8}>
			<ReturnDialog
				open={isReturnDialogOpen}
				handleClose={handleReturnMemoDialogClose}
				handlePutReturnMemo={onSubmitPutReturnMemo}
				id={selectedReturnMemoId}
				title={selectedReturnMemosArrayFilter.length > 0 ? selectedReturnMemosArrayFilter[0].title : ""}
				content={selectedReturnMemosArrayFilter.length > 0 ? selectedReturnMemosArrayFilter[0].content : ""}
			/>
			{/* 左のフレーム */}
			<Grid item xs={3.5}>
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
									.filter((memo: MemoContents) => memo.complete_flag)
									.map((memo: MemoContents, index: number) => {
										return (
											<ListItem key={memo.id} disablePadding sx={{ display: "flex", flexDirection: "row" }}>
												<ListItemButton
													onClick={() => {
														handlePrevMemoListClick(); //ダイアログで注意→このファルスをまとめた関数を作ってここにいれる
														setSelectedMemoIndex(index);
													}}
													sx={{ backgroundColor: index === selectedReturnIndex ? "skyblue" : undefined }}
													selected={selectedMemoIndex === index && selectedReturnIndex === null && !newMemoCreate}
												>
													<ListItemText primary={memo.title} />
												</ListItemButton>
												<Button
													// color={index === selectedDeleteIndex ? "error" : undefined}
													onClick={(e) => {
														e.stopPropagation();
														handleReturnMemoDialogOpenClick(index, memo.id);
													}}
												>
													<DriveFileMoveIcon color={index === selectedReturnIndex ? "info" : undefined} />
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
