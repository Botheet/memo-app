import { Box, Button, Typography } from "@mui/material";
import NoteAltIcon from "@mui/icons-material/NoteAlt";

export const MainPageButton = () => {
	return (
		<Box display="flex" alignItems="flex-start" flexDirection="column" gap={0.5}>
			<Button fullWidth style={{ justifyContent: "flex-start" }}>
				<NoteAltIcon />
				<Typography fontSize="14px">メインページへ</Typography>
			</Button>
		</Box>
	);
};
