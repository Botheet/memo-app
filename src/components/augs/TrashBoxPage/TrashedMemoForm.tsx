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

		//ToDo:保存機能実装のときに使用
		const onSubmit = (data) => {};

		useEffect(() => {
			setValue("content", content);
			setValue("title", title);
		}, [content, title]);

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
				<TextField placeholder="タイトル" fullWidth {...register("title")} disabled />

				<StyledTextField
					placeholder="本文"
					multiline
					minRows="25"
					maxRows="25"
					fullWidth
					inputRef={inputRef}
					{...register("content")}
					disabled
				/>
			</Box>
		);
	}
);
