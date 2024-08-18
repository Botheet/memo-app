import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type DeleteDialogprops = {
	handleClose: () => void;
	open: boolean;
};

export const DeleteDialog: React.FC<DeleteDialogprops> = ({ handleClose, open }) => {
	return (
		<React.Fragment>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{"選択中のメモを削除します"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						選択中のメモを削除しますがよろしいでしょうか
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>削除</Button>
					<Button onClick={handleClose} autoFocus>
						キャンセル
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
};
