import { CompDeleteMutationVariables } from "@/types";
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Dialog from "@mui/material/Dialog";

type CompDeleteDialogprops = {
	handleClose: () => void;
	handleDeleteMemo: (deleteBody: CompDeleteMutationVariables) => void;
	open: boolean;
	id: number;
};

export const CompDeleteDialog: React.FC<CompDeleteDialogprops> = ({ handleClose, handleDeleteMemo, open, id }) => {
	const deleteBody: CompDeleteMutationVariables = {
		id
	};
	const handleCompDeleteButtonClick = () => {
		handleDeleteMemo(deleteBody);
		handleClose();
	};
	return (
		<>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{"選択中のメモを元に戻します"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">選択中のメモを完全に削除しますか？</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCompDeleteButtonClick}>削除する</Button>
					<Button onClick={handleClose} autoFocus>
						キャンセル
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
