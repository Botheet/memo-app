import { apiClient } from "@/libs/apiClient";
import { LoginFormBody, MemoContents } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

//ログイン用のAPI
export const useLoginApi = () => {
	const router = useRouter();
	const loginApi = async (postData: LoginFormBody) => {
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

//メモ一覧取得のAPI
export const useGetMemos = () => {
	const getMemos = async () => {
		const response = await apiClient.get("/api/memos/");
		return response?.data;
	};
	//respons? レスポンスがオブジェクトじゃない場合、後ろの.dataがヌルやアンディファインドの場合、評価を止める
	// ? ←オプショナルチェーニング
	const { isPending, error, data } = useQuery({
		queryKey: ["getMemosApiData"],
		queryFn: getMemos
	});
	return { getMemosData: data, getMemosError: error, getMemosIsPending: isPending };
};
