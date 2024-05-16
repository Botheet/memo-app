import { Box } from "@mui/material";
import React from "react";
import Image from "next/image";

// const Home: React.FC = () => {
// 	return <div>{/* ここにホームページのコンテンツを記述 */}</div>;
// };

export const TopPage = () => {
	return (
		// <Box
		// sx={{
		// 	position: "fixed",
		// 	top: "0",
		// 	left: "0",
		// 	width: "100%",
		// 	height: "100%",
		// 	overflow: "auto",
		// 	backgroundImage: "url('/TopPageImage.png')", //背景崩れ回避のため、cssにて記述
		// 	backgroundSize: "cover",
		// 	backgroundPosition: "center",
		// 	backgroundRepeat: "no-repeat"
		// }}
		// >
		<div style={{ position: "fixed", top: "0", left: "0", width: "100%", height: "100%", zIndex: "-1" }}>
			<Image src={"/TopPageImage.png"} layout="fill" objectFit="cover" alt={""} />
		</div>
		// </Box>
	);
};
