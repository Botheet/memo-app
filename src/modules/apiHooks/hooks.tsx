import {
	CompDeleteMutationVariables as CompDeleteMutationVariables,
	LoginFormBody,
	PostNewMemoFormBody,
	ReturnMemoMutationVariables,
	TrashMemoMutationVariables
} from "@/types";
import { createClient } from "@/utils/supabase/component";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const supabase = createClient();

//ログイン用のAPI(supabase)
export const useLoginApi = () => {
	const router = useRouter();
	const loginApi = async () => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "github",
			options: { redirectTo: "http://localhost:3000/auth/callback" }
		});

		if (error) {
			throw new Error(error.message);
		}

		return data;
	};

	const mutation = useMutation({
		mutationFn: loginApi,
		onError: (error) => {
			console.error("Sign-in error:", error);
		},
		onSuccess: (data) => {
			console.log("Signed in successfully:", data);
		}
	});

	return { mutationLogin: mutation };
};

//メモ一覧取得のAPI
export const useGetMemos = () => {
	const getMemos = async () => {
		const { data: memos, error } = await supabase
			.from("memos") // テーブル名
			.select("*"); // 全データを取得

		if (error) {
			throw new Error(error.message);
		}
		console.log(data);
		return { data: memos };
	};

	const { isPending, error, data, refetch } = useQuery({
		queryKey: ["getMemosApiData"], // クエリキーを配列形式で指定
		queryFn: getMemos // フェッチ関数
	});

	return {
		getMemosData: data,
		getMemosError: error,
		getMemosIsPending: isPending,
		refetchMemosData: refetch
	};
};

//メモ本文取得API,`/api/memos/${id}/`の${id}/`は動的に変わる

// （""のままだとAPIに送るのはidという文字になってしまいエラーが出る
// バックコォート``に囲いテンプレートにし、${id}と記述することにより対応することが可能
export const useGetOneMemo = (id: number) => {
	const getOneMemo = async () => {
		const response = await supabase.from("memos").select(`${id}`);
		// return response?.select(`${id}`);
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
		const response = await supabase.from("memos").insert([postData]).select();
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

//既存メモの上書き保存用のAPI ※
// export const usePutSavedMemoApi =()=>{
// 	const putSavedMemoApi = async
// }

//削除用のAPI
//{ id, postData }: TrashMemoMutationVariables...mutationFnには引数が1つしか渡されない為、id と postData をオブジェクトにまとめた
export const usePutTrashMemoRequestApi = () => {
	const putTrashMemoRequestApi = async ({ id, putDate }: TrashMemoMutationVariables) => {
		const token = localStorage.getItem(`accessToken`); // トークンを取得
		if (!token) {
			throw new Error("認証トークンが見つかりません");
		}
		const response = await supabase.from("memos").update(putDate).eq("id", `${id}`).select();

		return response;
	};

	const mutation = useMutation({
		mutationFn: putTrashMemoRequestApi,
		onSuccess: (response) => {
			console.log("トラッシュの対象にしました", response);
		},
		onError: (error) => {
			console.error("Error registering user失敗:", error);
		}
	});
	return { mutationPutTrashMemo: mutation };
};

//ゴミ箱からもとに戻す
export const useReturnMemoRequestApi = () => {
	const putReturnMemoRequestApi = async ({ id, putDate }: ReturnMemoMutationVariables) => {
		const token = localStorage.getItem(`accessToken`); // トークンを取得
		if (!token) {
			throw new Error("認証トークンが見つかりません");
		}
		const response = await apiClient.put(`/api/memos/${id}/`, putDate);

		return response;
	};

	const mutation = useMutation({
		mutationFn: putReturnMemoRequestApi,
		onSuccess: (response) => {
			console.log("リターンの対象にしました", response);
		},
		onError: (error) => {
			console.error("Error registering user失敗:", error);
		}
	});
	return { mutationPutReturnMemo: mutation };
};

// //完全削除
// メモを完全削除するためのAPIリクエストを行うカスタムフック
export const useCompDeleteRequestApi = () => {
	// メモの完全削除を行う非同期関数
	const deleteCompDeleteRequestApi = async ({ id }: CompDeleteMutationVariables) => {
		// 認証トークンをlocalStorageから取得
		const token = localStorage.getItem(`accessToken`);
		// トークンが存在しない場合はエラーを投げる
		if (!token) {
			throw new Error("認証トークンが見つかりません");
		}
		// APIクライアントを使用して指定IDのメモを完全削除
		const response = await apiClient.delete(`/api/memos/${id}/`);

		// APIのレスポンスを返す
		return response;
	};
	// ↑ deleteCompDeleteRequestApi関数の定義終了
	// react-queryのuseMutationを使用して、削除APIの呼び出しを管理
	const mutation = useMutation({
		// deleteCompDeleteRequestApi関数をmutationの関数として登録
		mutationFn: deleteCompDeleteRequestApi,
		// 削除が成功した場合のコールバック処理
		onSuccess: (response) => {
			console.log("完全削除の対象にしました", response);
		},
		// エラーが発生した場合のコールバック処理
		onError: (error) => {
			console.error("Error registering user失敗:", error);
		}
	});

	// 削除用のmutationを返す
	return { mutationDeleteCompDelete: mutation };
};
