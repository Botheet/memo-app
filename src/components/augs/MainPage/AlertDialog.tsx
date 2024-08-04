import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type AlertDialogprops = {
	handleClose: () => void;
	open: boolean;
	handleExitWithoutSavingClick: () => void;
};

export const AlertDialog: React.FC<AlertDialogprops> = ({ handleClose, open, handleExitWithoutSavingClick }) => {
	// const [open, setOpen] = React.useState(false);

	// const handleClickOpen = () => {
	// 	setOpen(true);
	// };

	// const handleClose = () => {
	// 	setOpen(false);
	// };

	return (
		<React.Fragment>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{"編集中の内容を保存しますか"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						保存せずに移動した場合、編集中の内容は削除されてしまいます。
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>保存</Button>
					<Button
						onClick={() => {
							handleExitWithoutSavingClick();
							handleClose();
						}}
					>
						保存せずに編集終了
					</Button>
					<Button onClick={handleClose} autoFocus>
						キャンセル
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
};
