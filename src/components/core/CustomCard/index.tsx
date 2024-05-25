import { Card, CardContent, Typography } from "@mui/material";
import { FC, ReactNode } from "react";

type CardComponentsProps = {
	title: string;
	children: ReactNode;
};

export const CustomCard: FC<CardComponentsProps> = ({ title, children }) => {
	return (
		<Card sx={{ maxWidth: 345 }}>
			<Typography px={4} py={2} textAlign="center">
				{title}
			</Typography>
			<CardContent sx={{ px: 4, pt: 0 }}>{children}</CardContent>
		</Card>
	);
};
