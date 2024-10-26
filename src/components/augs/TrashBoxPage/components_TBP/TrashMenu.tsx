import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import TrashMenuComponents from ".";
import { CompDeleteMutationVariables, ReturnMemoMutationVariables } from "@/types";
import { Box } from "@mui/material";

type TrashMenuProps = {
	id: number;
	title: string;
	content: string;
	handlePutReturnMemo: (putBody: ReturnMemoMutationVariables) => void;
	handleCompDeleteMemo: (deleteBody: CompDeleteMutationVariables) => void;
};

export const TrashMenu: React.FC<TrashMenuProps> = ({
	id,
	title,
	content,
	handlePutReturnMemo,
	handleCompDeleteMemo
}) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box>
			<Button
				id="basic-button"
				aria-controls={open ? "basic-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
			>
				<MenuIcon />
			</Button>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button"
				}}
			>
				<TrashMenuComponents.TrashBoxPageMenu
					handleClose={handleClose}
					id={id}
					title={title}
					content={content}
					handlePutReturnMemo={handlePutReturnMemo}
					handleCompDeleteMemo={handleCompDeleteMemo}
				/>
			</Menu>
		</Box>
	);
};
