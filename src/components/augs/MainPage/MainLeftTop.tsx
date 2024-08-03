import { Box, Button, TextField, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useEffect, useRef } from "react";
import { apiClient } from "@/libs/apiClient";
import { MemoContents } from "@/types";
import { register } from "module";

interface ContentTextBox1Props {
	handleClick: () => void;
}
export const MainLeftTop: React.FC<ContentTextBox1Props> = ({ handleClick }) => {
	const inputRef = useRef<HTMLInputElement>(null);

	if (inputRef.current) {
		inputRef.current.focus();
	}

	return (
		<Box display="flex" alignItems="flex-start" flexDirection="column" gap={0.1}>
			<Button fullWidth style={{ justifyContent: "flex-start" }} onClick={handleClick}>
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
