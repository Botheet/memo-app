import { Box, Button, Link, Typography } from "@mui/material";
import NoteAltIcon from "@mui/icons-material/NoteAlt";

export const LinkToMainPageButtom = () => {
	return (
		<Box display="flex" alignItems="flex-start" flexDirection="column" gap={0.5}>
			{/* <Link href="/mainPage"> */}
			<Button fullWidth style={{ justifyContent: "flex-start" }}>
				<NoteAltIcon />
				<Typography fontSize="14px">メインページ</Typography>
			</Button>
			{/* </Link> */}
		</Box>
	);
};
