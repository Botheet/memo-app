// import Button from "@mui/material/Button";
// import { createTheme } from "@mui/material/styles";

// export const SubmitButton = (props) => {
// 	const { onClickButton, buttonText = "", buttonColor = "success", isDisabled = false, index = null, icon } = props; //分割代入。{}内をpropsで展開
// 	return (
// 		<>
// 			<Button
// 				onClick={() => {
// 					onClickButton(index !== null && index);
// 				}} //indexがぬるじゃなかったら引数がここに入る
// 				variant="contained"
// 				disabled={isDisabled}
// 				color={buttonColor}
// 				endIcon={icon} //propsにiconを追加。→各ボタンにiconを渡せる
// 				sx={{
// 					ml: 2
// 				}}
// 			>
// 				{buttonText}
// 			</Button>
// 		</>
// 	);
// };
