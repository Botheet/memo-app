import React from "react";
import Image from "next/image";

// const Home: React.FC = () => {
// 	return <div>{/* ここにホームページのコンテンツを記述 */}</div>;
// };

export const TopPage = () => {
	return (
		<div style={{ position: "fixed", top: "0", left: "0", width: "100%", height: "100%", zIndex: "-1" }}>
			<Image src={"/TopPageImage.png"} layout="fill" objectFit="cover" alt={""} />
		</div>
		// </Box>
	);
};
