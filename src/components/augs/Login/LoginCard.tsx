import { CustomCard } from "@/components/core/CustomCard";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Typography, TextField, InputAdornment, IconButton, Button, Box, Divider } from "@mui/material";
import Link from "next/link";
import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { LoginFormBody } from "@/types";
import AccountCreateDialog from "@/components/core/AccountCreateDialog";
import { useLoginApi } from "@/modules/apiHooks/hooks";

export const LoginFormCard = () => {
	const { mutationLogin } = useLoginApi();
	const handleLogin = () => {
		mutationLogin.mutate();
	};

	return (
		<CustomCard title={"MEMOへログイン"}>
			<Box display="flex" flexDirection="column" gap={2} textAlign="center">
				<Button
					onClick={handleLogin}
					disabled={mutationLogin.isPending} //isPending(進行中)はtrueなのでdisabled（非活性）になる
					variant="contained"
					size="large"
					color="info"
					endIcon={<LoginTwoToneIcon />}
				>
					ログイン
				</Button>
				<Link href="/forgot-password">
					<Typography fontSize="12px" color="navy">
						パスワードを忘れた場合はこちら
					</Typography>
				</Link>
				<Divider variant="middle" />
				{/* <AccountCreateDialog /> */}
			</Box>
		</CustomCard>
	);
};
