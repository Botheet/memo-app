import { PostNewMemoFormBody } from "@/types";
import { Box, Button, Fab, TextField } from "@mui/material";
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
	onSubmitPostNewMemo?: (date: PostNewMemoFormBody) => void;
	//?つけてオプショナルにする
};

export const MemoForm = forwardRef<HTMLInputElement, MemoFormProps>(
	({ content, title, onSubmitPostNewMemo }, inputRef) => {
		const {
			handleSubmit,
			register,
			setValue,
			watch,
			formState: { errors }
		} = useForm({ defaultValues: { title, content } });

		const onSubmit = (data) => {};

		useEffect(() => {
			setValue("content", content);
			setValue("title", title);
		}, [content, title]);
		// console.log(content);
		// console.log(watch("content"));

		return (
			<Box
				component="form"
				display="flex"
				flexDirection="column"
				onSubmit={handleSubmit((data) => {
					console.log(data);
					onSubmitPostNewMemo(data);
				})}
			>
				<TextField placeholder="タイトル" fullWidth {...register("title")} />
				<StyledTextField
					placeholder="本文"
					multiline
					minRows="23"
					maxRows="23"
					fullWidth
					inputRef={inputRef}
					// ref={inputRef}
					{...register("content")}
				/>{" "}
				<Fab variant="extended">
					<NavigationIcon sx={{ mr: 1 }} />
					Extended
				</Fab>
			</Box>
		);
	}
);
