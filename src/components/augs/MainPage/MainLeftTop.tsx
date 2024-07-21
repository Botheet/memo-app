import { Box, Button, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useEffect } from "react";
import { apiClient } from "@/libs/apiClient";
import { MemoContents } from "@/types";

export const MainLeftTop = () => {
	const onSubmit = (memoStatus: MemoContents) => {
		console.log(memoStatus);

		useEffect(() => {
			const putMemos = async () => {
				try {
					const response = await apiClient.put("/api/memos/{id}");
					console.log(response.data);
					// putMemos(response.data);
				} catch (error) {
					console.error("Error registering user:", error);
				}
			};
			putMemos();
		}, []);
	};
	return (
		<Box display="flex" alignItems="flex-start" flexDirection="column" gap={0.1}>
			<Button fullWidth style={{ justifyContent: "flex-start" }}>
				<AddIcon />
				<Typography fontSize="12px">新規作成</Typography>
			</Button>
			<Button fullWidth items-align="flex-start" style={{ justifyContent: "flex-start" }}>
				<DeleteOutlineIcon />
				<Typography fontSize="12px">削除</Typography>
			</Button>
		</Box>
	);
};
