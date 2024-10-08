import * as React from "react";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Box, Button, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CompDeleteMutationVariables, ReturnMemoMutationVariables } from "@/types";
import { useState } from "react";
import TrashMenuComponents from ".";

type TrashBoxPageMenuprops = {
	handleClose: () => void;
	handlePutReturnMemo: (putBody: ReturnMemoMutationVariables) => void;
	handleCompDeleteMemo: (deleteBody: CompDeleteMutationVariables) => void;
	id: number;
	title: string;
	content: string;
};

export const TrashBoxPageMenu: React.FC<TrashBoxPageMenuprops> = ({
	handleClose,
	handlePutReturnMemo,
	handleCompDeleteMemo,
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

	// 完全削除の注意ダイアログ
	const [isCompDeleteDialogOpen, setCompDeleteDialogOpen] = useState(false);
	const handleCompDeleteDialogOpenClick = () => {
		setCompDeleteDialogOpen(true);
	};
	const handleCompDeleteDialogClose = () => {
		setCompDeleteDialogOpen(false);
	};

	return (
		<Box sx={{ width: 320, maxWidth: "100%" }}>
			<TrashMenuComponents.CompDeleteDialog
				open={isCompDeleteDialogOpen}
				handleClose={handleCompDeleteDialogClose}
				handleCompDeleteMemo={handleCompDeleteMemo}
				id={id}
			/>
			<MenuList>
				<Button onClick={handleReturnButtonClick}>
					<MenuItem>
						<ListItemIcon>
							<RestoreFromTrashIcon fontSize="small" />
						</ListItemIcon>
						<ListItemText>メモリストへ戻す</ListItemText>
					</MenuItem>
				</Button>

				<Button
					onClick={(e) => {
						e.stopPropagation();
						handleCompDeleteDialogOpenClick();
					}}
				>
					<MenuItem>
						<ListItemIcon>
							<DeleteForeverIcon fontSize="small" />
						</ListItemIcon>
						<ListItemText>削除する</ListItemText>
					</MenuItem>
				</Button>
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
