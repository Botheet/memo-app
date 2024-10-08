import { Box, Button, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useRef } from "react";

interface ContentTextBox1Props {
	handleCreateButtonClick: () => void;
}
export const MainLeftTop: React.FC<ContentTextBox1Props> = ({ handleCreateButtonClick }) => {
	const inputRef = useRef<HTMLInputElement>(null);

	if (inputRef.current) {
		inputRef.current.focus();
	}

	return (
		<Box display="flex" alignItems="flex-start" flexDirection="column" gap={0.1}>
			<Button fullWidth style={{ justifyContent: "flex-start" }} onClick={handleCreateButtonClick}>
				<AddIcon />
				<Typography fontSize="12px">新規作成</Typography>
			</Button>
		</Box>
	);
};
