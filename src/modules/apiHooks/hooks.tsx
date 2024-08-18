import { apiClient } from "@/libs/apiClient";
import {
	LoginFormBody,
	MemoContents,
	PostNewMemoFormBody,
	TrashMemoMutationVariables,
	TrashMemoRequest
} from "@/types";
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

//メモ本文取得API,`/api/memos/${id}/`の${id}/`は動的に変わる
// （""のままだとAPIに送るのはidという文字になってしまいエラーが出る
// バックコォート``に囲いテンプレートにし、${id}と記述することにより対応することが可能
export const useGetOneMemo = (id: number) => {
	const getOneMemo = async () => {
		const response = await apiClient.get(`/api/memos/${id}/`);
		return response?.data;
	};
	const { isPending, error, data } = useQuery({
		queryKey: ["getOneMemoApiData"],
		queryFn: getOneMemo
	});
	return { getOneMemoData: data, getOneMemoError: error, getOneMemoIsPending: isPending };
};

//新規メモ保存用のAPI
export const usePostNewMemoApi = () => {
	const postNewMemoApi = async (postData: PostNewMemoFormBody) => {
		const response = await apiClient.post("/api/memos/", postData);
		return response;
	};

	const mutation = useMutation({
		mutationFn: postNewMemoApi,
		onSuccess: (response) => {
			console.log("登録しました", response);
		},
		onError: (error) => {
			console.error("Error registering user:", error);
		}
	});
	return { mutationPostNewMemo: mutation };
};

//削除用のAPI
//{ id, postData }: TrashMemoMutationVariables...mutationFnには引数が1つしか渡されない為、id と postData をオブジェクトにまとめた
export const usePostTrashMemoRequestApi = () => {
	const postTrashMemoRequestApi = async ({ id, postData }: TrashMemoMutationVariables) => {
		const response = await apiClient.post(`/api/memos/${id}`, postData);
		return response;
	};

	const mutation = useMutation({
		mutationFn: postTrashMemoRequestApi,
		onSuccess: (response) => {
			console.log("トラッシュの対象にしました", response);
		},
		onError: (error) => {
			console.error("Error registering user:", error);
		}
	});
	return { mutationPostTrashMemo: mutation };
};
