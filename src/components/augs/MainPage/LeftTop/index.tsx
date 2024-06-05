import { Box, Button, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export const MainLeftTop = () => {
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
