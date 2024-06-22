import { TextFieldsSharp } from "@mui/icons-material";
import { Box, TextField } from "@mui/material";
import { maxHeaderSize } from "http";

// export interface SimpleDialogProps {
// 	open: boolean;
// 	selectedValue: string;
// 	onClose: (value: string) => void;
// }

export const WriteTitle = () => {
	return (
		<Box>
			<TextField label="タイトル" fullWidth />
		</Box>
	);
};
