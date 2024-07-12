import { Box, Button, Typography } from "@mui/material";

import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";

export const TrashBoxButtom = () => {
	return (
		<Box display="flex" alignItems="flex-start" flexDirection="column" gap={0.5}>
			<Button fullWidth style={{ justifyContent: "flex-start" }}>
				<RestoreFromTrashIcon />
				<Typography fontSize="14px">ゴミ箱</Typography>
			</Button>
		</Box>
	);
};
