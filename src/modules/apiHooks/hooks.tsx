import { apiClient } from "@/libs/apiClient";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLoginApi = () => {
	const router = useRouter();
	const loginApi = async (postData) => {
		const response = await apiClient.post("/auth/token/", postData);
		return response;
	};

	const mutation = useMutation({
		mutationFn: loginApi,
		onSuccess: (response) => {
			localStorage.setItem("accessToken", response.data.access);
			localStorage.setItem("refreshToken", response.data.refresh);
			router.push("/mainPage");
		},
		onError: (error) => {
			console.error("Error registering user:", error);
		}
	});
	return { mutationLogin: mutation };
};
