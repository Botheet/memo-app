import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AccountCreate } from "./AccountCreate";
import { Box } from "@mui/material";

const emails = ["username@gmail.com", "user02@gmail.com"];

export interface SimpleDialogProps {
	open: boolean;
	selectedValue: string;
	onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
	const { onClose, selectedValue, open } = props;

	const handleClose = () => {
		onClose(selectedValue);
	};

	const handleListItemClick = (value: string) => {
		onClose(value);
	};

	return (
		<Dialog onClose={handleClose} open={open} sx={{ minWidth: "100" }}>
			<DialogTitle>アカウント作成</DialogTitle>
			<Box
				sx={{
					padding: 5
				}}
			>
				<AccountCreate />
			</Box>
		</Dialog>
	);
}

export default function AccountCreateDialog() {
	const [open, setOpen] = React.useState(false);
	const [selectedValue, setSelectedValue] = React.useState(emails[1]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (value: string) => {
		setOpen(false);
		setSelectedValue(value);
	};

	return (
		<>
			<Button
				variant="contained"
				onClick={handleClickOpen}
				size="large"
				color="success"
				endIcon={<AccountCircleIcon />}
			>
				アカウントを新規作成
			</Button>
			<SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
		</>
	);
}
