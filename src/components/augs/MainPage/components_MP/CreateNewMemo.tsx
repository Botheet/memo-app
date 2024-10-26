// import { apiClient } from "@/libs/apiClient";
// import { Box, TextField } from "@mui/material";
// import { styled } from "@mui/system";
// import { useEffect, useRef } from "react";
// import { useForm } from "react-hook-form";
// import { DefaultValue } from "recoil";

// type MemoFormProps = {
// 	content?: string;
// 	title?: string;
// 	//?つけてオプショナルにする
// };

// export const CreateNexMemo = ({ content, title }: MemoFormProps) => {
// 	const inputRef = useRef(null);

// 	const handleSubmit = () => {};

// 	const {
// 		register,
// 		setValue,
// 		formState: { errors }
// 	} = useForm({ defaultValues: { title, content } });

// 	useEffect(() => {
// 		setValue("content", content);
// 		setValue("title", title);
// 		if (inputRef.current) {
// 			inputRef.current.focus();
// 		}

// 	}, [content, title]);

// 	return ()}
