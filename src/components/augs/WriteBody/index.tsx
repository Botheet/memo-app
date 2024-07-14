import { apiClient } from "@/libs/apiClient";

import { Box, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { DefaultValue } from "recoil";

// export interface SimpleDialogProps {
// 	open: boolean;
// 	selectedValue: string;
// 	onClose: (value: string) => void;
// }

const StyledTextField = styled(TextField, { name: "StyledTextField" })({
	"& .MuiInputBase": { height: 550 }
});
type MemoFormProps = {
	content?: string;
	title?: string;
	//?つけてオプショナルにする
};

export const MemoForm = ({ content, title }: MemoFormProps) => {
	const inputRef = useRef(null);

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
		if (inputRef.current) {
			inputRef.current.focus();
		}
		console.log(inputRef);
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
				{...register("content")}
			/>
		</Box>
	);
};
