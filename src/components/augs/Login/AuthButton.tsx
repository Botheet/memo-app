"use client";

import { createClient } from "@/utils/supabase/component";

const AuthButton = () => {
	const supabase = createClient();
	const handleSignIn = async () => {
		try {
			const { data, error } = await supabase.auth.signInWithOAuth({
				provider: "github",
				options: { redirectTo: "http://localhost:3000/auth/callback" }
			});
		} catch (error) {
			console.log(error);
		}
	};
	return <button onClick={handleSignIn}>ログイン</button>;
};

export default AuthButton;
