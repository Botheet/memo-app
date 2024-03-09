import { IconButton, Typography } from "@mui/material";
import AlarmIcon from "@mui/icons-material/Alarm";

export default function Home() {
	const num: number = 1;
	const num2: number = 2;
	const total: number = num + num2;

	return (
		<>
			<h1>helloworld</h1>
			<p>helloworld</p>
			<IconButton color="secondary" aria-label="add an alarm">
				<AlarmIcon />
			</IconButton>
			<Typography variant="h4" gutterBottom>
				{total}
			</Typography>
		</>
	);
}
