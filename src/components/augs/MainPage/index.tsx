"use client";

import { MainLeftTop } from "@/components/augs/MainPage/components_MP/MainLeftTop";
import { MemoForm } from "@/components/augs/MainPage/components_MP/MemoForm";
import { MainLoadingList } from "@/components/augs/MainPage/components_MP/MainLoadingList";
import { TrashBoxButtom } from "@/components/core/TrashBoxButtom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useGetMemos, usePostNewMemoApi, usePutTrashMemoRequestApi } from "@/modules/apiHooks/hooks";
import { MemoContents, PostNewMemoFormBody, TrashMemoMutationVariables } from "@/types";
import { Box, Button, Grid, List, ListItem, ListItemButton, ListItemText, Paper } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { AlertDialog } from "./components_MP/AlertDialog";
import { DeleteDialog } from "./components_MP/DeleteDialog";

export default function main() {
	// カスタムフックuseGetMemosを使用してメモデータを取得し、状態やエラー、リフレッシュ機能を取得
	const { getMemosData, getMemosError, getMemosIsPending, refetchMemosData } = useGetMemos();
	// データの内容を確認
	console.log(getMemosData);

	//●ダイアログの基本動作に関する部分●
	// ダイアログの開閉状態を管理するステート
	const [open, setOpen] = React.useState(false);
	// ダイアログを開く処理
	const handleClickOpen = () => {
		setOpen(true);
	};
	// ダイアログを閉じる処理
	const handleClose = () => {
		setOpen(false);
	};

	// 現在選択されているメモのインデックスを管理するステート
	const [selectedMemoIndex, setSelectedMemoIndex] = useState(0);

	// 新しいメモを作成しているかどうかを管理するステート
	const [newMemoCreate, setNewMemoCreate] = useState(false);

	// テキスト入力のリファレンスを設定（直接DOM要素にアクセスするため）
	const inputRef = useRef<HTMLInputElement>(null);

	// メモコンテントの入力フォームにフォーカスを当てる処理
	const handleFocus = () => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	};

	// 選択されたメモが変わるか、メモデータが取得される度にフォーカスを再設定
	useEffect(() => {
		handleFocus();
	}, [selectedMemoIndex, getMemosData]); // 依存配列には選択したメモのインデックスと取得したメモデータ

	// ゴミ捨てダイアログの挙動
	const [selectedTrashMemoId, setSelectedTrashMemoId] = useState<number | null>(null);
	const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [selectedDeleteIndex, setSelectedDeleteIndex] = useState<number | null>(null);
	const handleTrashMemoDialogOpenClick = (index: number, id: number) => {
		setDeleteDialogOpen(true);
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
		? getMemosData.data.filter((memo: MemoContents) => memo.id === selectedTrashMemoId)
		: [];

	//complete_flagがfalseになっているメモをfilterringするロジック
	const completedFlagIsFalseMemosData = getMemosData
		? getMemosData.data.filter((memo: MemoContents) => !memo.complete_flag)
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

	if (getMemosIsPending) return <p>Loading...</p>; // ローディング表示
	if (getMemosError) return <p>Error: {getMemosError.message}</p>; // エラー表示

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
					{/* 左上（新規・削除） */}
					<MainLeftTop handleCreateButtonClick={handleCreateButtonClick} />
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
								minHeight: "600px",
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

								{completedFlagIsFalseMemosData.map((memo: MemoContents, index: number) => {
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
							minHeight: "580px",
							marginTop: "8px",
							backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A2027" : "#fff")
						}}
					>
						{getMemosIsPending || !getMemosData ? undefined : (
							<MemoForm
								content={
									!newMemoCreate
										? completedFlagIsFalseMemosData.length !== 0
											? completedFlagIsFalseMemosData[selectedMemoIndex].content
											: ""
										: ""
								}
								title={
									!newMemoCreate
										? completedFlagIsFalseMemosData.length !== 0
											? completedFlagIsFalseMemosData[selectedMemoIndex].title
											: ""
										: ""
								}
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
