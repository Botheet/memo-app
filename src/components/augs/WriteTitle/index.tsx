import { Box, TextField } from "@mui/material";

// export interface SimpleDialogProps {
// 	open: boolean;
// 	selectedValue: string;
// 	onClose: (value: string) => void;
// }
// const StyledTextField = styled(TextField, { name: "StyledTextField" })({
// 	"& .MuiInput-underline": false
// });

export const WriteTitle = () => {
	return (
		<Box>
			<TextField label="タイトル" fullWidth />
		</Box>
	);
};
