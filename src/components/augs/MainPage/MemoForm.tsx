import { Box, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { forwardRef, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

const StyledTextField = styled(TextField, { name: "StyledTextField" })({
	"& .MuiInputBase": { height: 550 }
});
type MemoFormProps = {
	content?: string;
	title?: string;
	// inputRef: React.Ref<HTMLInputElement>;
	//?つけてオプショナルにする
};

export const MemoForm = forwardRef<HTMLInputElement, MemoFormProps>(({ content, title }, inputRef) => {
	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors }
	} = useForm({ defaultValues: { title, content } });

	const onSubmit = (data) => {};

	useEffect(() => {
		setValue("content", content);
		setValue("title", title);
		// if (inputRef.current) {
		// 	inputRef.current.focus();
		// }
	}, [content, title]);

	return (
		<Box display="flex" flexDirection="column" onSubmit={handleSubmit(onSubmit)}>
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
			/>
		</Box>
	);
});
