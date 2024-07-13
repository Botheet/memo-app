import { Box, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useRef } from "react";

// export interface SimpleDialogProps {
// 	open: boolean;
// 	selectedValue: string;
// 	onClose: (value: string) => void;
// }

const StyledTextField = styled(TextField, { name: "StyledTextField" })({
	"& .MuiInputBase": { height: 550 }
});

export const WriteBody = () => {
	const inputRef = useRef(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
		console.log(inputRef);
	}, []);

	return (
		<Box>
			<StyledTextField label="本文" multiline minRows="23" maxRows="23" fullWidth inputRef={inputRef} />
		</Box>
	);
};
