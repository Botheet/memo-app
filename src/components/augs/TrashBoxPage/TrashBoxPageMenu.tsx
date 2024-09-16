import * as React from "react";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Box, Button, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ReturnMemoMutationVariables } from "@/types";

type TrashBoxPageMenuprops = {
	handleClose: () => void;
	// open: boolean;
	handlePutReturnMemo: (putBody: ReturnMemoMutationVariables) => void;
	id: number;
	title: string;
	content: string;
};

export const TrashBoxPageMenu: React.FC<TrashBoxPageMenuprops> = ({
	handleClose,
	// open,
	handlePutReturnMemo,
	id,
	title,
	content
}) => {
	const putBody: ReturnMemoMutationVariables = {
		id,
		putDate: {
			title: title,
			content: content,
			complete_flag: false
		}
	};
	const handleReturnButtonClick = () => {
		handlePutReturnMemo(putBody);
		handleClose();
	};
	console.log(id, title, content);

	return (
		<Box sx={{ width: 320, maxWidth: "100%" }}>
			<MenuList>
				<Button onClick={handleReturnButtonClick}>
					<MenuItem>
						<ListItemIcon>
							<RestoreFromTrashIcon fontSize="small" />
						</ListItemIcon>
						<ListItemText>メモリストへ戻す</ListItemText>
					</MenuItem>
				</Button>

				<MenuItem>
					<ListItemIcon>
						<DeleteForeverIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText>削除する</ListItemText>
				</MenuItem>
			</MenuList>

			<Divider />
			<Button onClick={handleClose} autoFocus>
				<MenuItem>
					<ListItemIcon>
						<CloseIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText>閉じる</ListItemText>
				</MenuItem>
			</Button>
		</Box>
	);
};
