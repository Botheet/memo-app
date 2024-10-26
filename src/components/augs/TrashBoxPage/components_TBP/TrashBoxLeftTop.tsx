import { Box, Button, Typography } from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import ClearAllIcon from "@mui/icons-material/ClearAll";

export const TrashBoxLeftTop = () => {
	return (
		<Box display="flex" alignItems="flex-start" flexDirection="column" gap={0.1}>
			<Button fullWidth style={{ justifyContent: "flex-start" }}>
				<ClearAllIcon />
				<Typography fontSize="12px">全て削除</Typography>
			</Button>
			{/* 未実装
			<Button fullWidth items-align="flex-start" style={{ justifyContent: "flex-start" }}>
				<DeleteOutlineIcon />
				<Typography fontSize="12px">選択した項目を削除</Typography>
			</Button> */}
		</Box>
	);
};
