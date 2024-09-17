"use client";

import { MemoForm } from "@/components/augs/TrashBoxPage/TrashedMemoForm";
import { MainLoadingList } from "@/components/augs/MainPage/MainLoadingList";
import { useCompDeleteRequestApi, useGetMemos, useReturnMemoRequestApi } from "@/modules/apiHooks/hooks";
import { CompDeleteMutationVariables, MemoContents, ReturnMemoMutationVariables } from "@/types";
import { Box, Button, Grid, List, ListItem, ListItemButton, ListItemText, Paper } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

import { ReturnDialog } from "./ReturnMemoDialog";
import { LinkToMainPageButtom } from "@/components/core/LinkToMainPage";
import { TrashBoxLeftTop } from "./TrashBoxLeftTop";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { TrashMenu } from "./TrashMenu";

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

	const { mutationDeleteCompDelete } = useCompDeleteRequestApi();
	const onSubmitCompDelete = (deleteBody: CompDeleteMutationVariables) => {
		mutationDeleteCompDelete.mutate(deleteBody, {
			onSuccess: () => {
				// データの再取得や状態の更新処理をここに記述
				refetchMemosData();
			}
		});
	};

	//ゴミ捨てダイアログ内のもとに戻すの挙動
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
				<Grid>
					{/* <Paper
						sx={{
							height: "auto",
							minHeight: "80px",
							backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A2027" : "#fff")
						}}
					> */}
					<TrashBoxLeftTop />
					{/* </Paper> */}
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
								{getMemosData
									.filter((memo: MemoContents) => memo.complete_flag)
									.map((memo: MemoContents, index: number) => {
										return (
											<ListItem key={memo.id} disablePadding sx={{ display: "flex", flexDirection: "row" }}>
												<ListItemButton
													onClick={() => {
														setSelectedMemoIndex(index);
													}}
													sx={{ backgroundColor: index === selectedReturnIndex ? "skyblue" : undefined }}
													selected={selectedMemoIndex === index && selectedReturnIndex === null}
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
													<RestoreFromTrashIcon color={index === selectedReturnIndex ? "info" : undefined} />
												</Button>
												<TrashMenu
													id={memo.id}
													title={memo.title}
													content={memo.content}
													handlePutReturnMemo={onSubmitPutReturnMemo}
													handleCompDelteMemo={onSubmitCompDelete}
												/>
											</ListItem>
										);
									})}
							</List>
						</Paper>
					)}
				</Grid>
				{/* 左下段　mainpageへもどる */}
				<Grid>
					<Paper
						sx={{
							height: "auto",
							minHeight: "50px",
							backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A2027" : "#fff")
						}}
					>
						<Link href="/mainPage">
							<LinkToMainPageButtom />
						</Link>
					</Paper>
				</Grid>
			</Grid>
			{/* 真ん中のフレーム */}
			<Grid item xs={8}>
				<Grid>
					<Paper
						sx={{
							Height: "1000px",
							marginTop: "8px",
							backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A2027" : "#fff")
						}}
					>
						{getMemosIsPending || !getMemosData ? undefined : (
							<MemoForm
								content={getMemosData[selectedMemoIndex].content}
								title={getMemosData[selectedMemoIndex].title}
								ref={inputRef}
							/>
						)}
					</Paper>
				</Grid>
			</Grid>
		</Grid>
	);
}
