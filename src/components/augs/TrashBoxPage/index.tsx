"use client";

import TrashMenuComponents from "./componets";
import { MainLoadingList } from "@/components/augs/MainPage/MainLoadingList";
import { useCompDeleteRequestApi, useGetMemos, useReturnMemoRequestApi } from "@/modules/apiHooks/hooks";
import { CompDeleteMutationVariables, MemoContents, ReturnMemoMutationVariables } from "@/types";
import { Box, Grid, List, ListItem, ListItemButton, ListItemText, Paper } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { LinkToMainPageButtom } from "@/components/core/LinkToMainPage";

export default function main() {
	const { getMemosData, getMemosIsPending, refetchMemosData } = useGetMemos();

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

	// 完全削除の挙動
	const { mutationDeleteCompDelete } = useCompDeleteRequestApi();
	const onSubmitCompDeleteMemo = (deleteBody: CompDeleteMutationVariables) => {
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

	return (
		<Grid container spacing={0.5} marginTop={8}>
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
					<TrashMenuComponents.TrashBoxLeftTop />
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
													selected={selectedMemoIndex === index}
												>
													<ListItemText primary={memo.title} />
												</ListItemButton>
												{/* メニューボタン */}
												<TrashMenuComponents.TrashMenu
													id={memo.id}
													title={memo.title}
													content={memo.content}
													handlePutReturnMemo={onSubmitPutReturnMemo}
													handleCompDeleteMemo={onSubmitCompDeleteMemo}
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
							<TrashMenuComponents.MemoForm
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
