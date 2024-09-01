import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home"; // インポートするアイコン
import LanguageIcon from "@mui/icons-material/Language";
import InfoIcon from "@mui/icons-material/Info";
import MenuIcon from "@mui/icons-material/Menu";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LoginIcon from "@mui/icons-material/Login";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import NoteAltIcon from "@mui/icons-material/NoteAlt";

type Anchor = "top" | "left" | "bottom" | "right";

const DrawerMenuIcon: React.FC = () => {
	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false
	});

	const drawerMenuItems = ["ログイン・ログアウト"];

	const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
		if (
			event &&
			event.type === "keydown" &&
			((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const iconListMenu = [<KeyboardReturnIcon />, <NoteAltIcon />, <HomeIcon />, <LanguageIcon />];
	const iconListAccount = [<LoginIcon />, <LanguageIcon />, <InfoIcon />, <ContactMailIcon />];
	//※※※ログインとログアウトを切り替えるコンポーネントを作成してインポートする※※※

	const list = (anchor: Anchor) => (
		<Box
			sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 200, backgroundColor: "rgba(0, 0, 0, 0.1)" }}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<List>
				{["閉じる", "メモ"].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemIcon>{iconListMenu[index]}</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>

			<Divider />
			<List>
				{drawerMenuItems.map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemIcon>{iconListAccount[index]}</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	return (
		<Box>
			<Button onClick={toggleDrawer("right", true)}>
				<MenuIcon />
			</Button>
			<SwipeableDrawer
				anchor={"right"}
				open={state["right"]}
				onClose={toggleDrawer("right", false)}
				onOpen={toggleDrawer("right", true)}
			>
				{list("right")}
			</SwipeableDrawer>
		</Box>
	);
};

export default DrawerMenuIcon;
