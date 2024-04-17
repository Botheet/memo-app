import Button, { ButtonProps, ButtonPropsColorOverrides } from "@mui/material/Button";
import { FC, ReactNode } from "react";

type PrimaryButtonProps = ButtonProps & {
	onClickButton: (number: number) => void;
	buttonText: string;
	isDisabled?: boolean;
	index?: number | null;
	icon?: ReactNode;
	color?: string;
};

export const PrimaryButton: FC<PrimaryButtonProps> = (props) => {
	const {
		onClickButton,
		buttonText,
		isDisabled = false,
		index = null,
		size,
		icon,
		color = "primary",
		...other
	} = props; //分割代入。{}内をpropsで展開
	return (
		<>
			<Button
				{...other}
				onClick={() => {
					onClickButton(index !== null && index);
				}} //indexがぬるじゃなかったら引数がここに入る
				variant="contained"
				size={size}
				disabled={isDisabled}
				color={color}
				endIcon={icon} //propsにiconを追加。→各ボタンにiconを渡せる
				sx={{
					ml: 2
				}}
			>
				{buttonText}
			</Button>
		</>
	);
};
