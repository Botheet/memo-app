import { TextFieldsSharp } from "@mui/icons-material";
import { Box, TextField } from "@mui/material";
import { maxHeaderSize } from "http";
import { styled } from "@mui/system";

// export interface SimpleDialogProps {
// 	open: boolean;
// 	selectedValue: string;
// 	onClose: (value: string) => void;
// }

const StyledTextField = styled(TextField, { name: "StyledTextField" })({ "& .MuiInputBase": { height: 550 } });

export const WriteBody = () => {
	return (
		<Box>
			<StyledTextField label="本文" fullWidth />
		</Box>
	);
};
