import { PostNewMemoFormBody } from "@/types";
import { Box, Button, Fab, Paper, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { forwardRef, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import NavigationIcon from "@mui/icons-material/Add";

const StyledTextField = styled(TextField, { name: "StyledTextField" })({
	"& .MuiInputBase": { height: 550 }
});
type MemoFormProps = {
	content?: string;
	title?: string;
	//?つけてオプショナルにする
};

export const MemoForm = forwardRef<HTMLInputElement, MemoFormProps>(({ content, title }, inputRef) => {
	const {
		handleSubmit,
		register,
		setValue,
		watch,
		formState: { errors }
	} = useForm({ defaultValues: { title, content } });

	useEffect(() => {
		setValue("content", content);
		setValue("title", title);
	}, [content, title]);

	return (
		<Box
			height={"680px"}
			display="flex"
			flexDirection="column"
			onSubmit={handleSubmit((data) => {
				console.log(data);
			})}
		>
			<Typography p={"14px"}>{title}</Typography>
			<Box height={"540px"}>
				<Typography p={"14px"} maxHeight={"530px"}>
					{content}
				</Typography>
			</Box>
		</Box>
	);
});
