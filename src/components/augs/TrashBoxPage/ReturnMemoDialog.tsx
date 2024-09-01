import { ReturnMemoMutationVariables } from "@/types";
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Dialog from "@mui/material/Dialog";

type ReturnDialogprops = {
	handleClose: () => void;
	open: boolean;
	handlePutReturnMemo: (putBody: ReturnMemoMutationVariables) => void;
	id: number;
	title: string;
	content: string;
};

export const ReturnDialog: React.FC<ReturnDialogprops> = ({
	handleClose,
	open,
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
					<DialogContentText id="alert-dialog-description">選択中のメモを元に戻しますかしますか？</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleReturnButtonClick}>元に戻す</Button>
					<Button onClick={handleClose} autoFocus>
						キャンセル
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
