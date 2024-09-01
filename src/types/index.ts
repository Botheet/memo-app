export type LoginFormBody = { email: string; password: string };

export type AccountCreateBody = { email: string; password: string; username: string };

export type MemoContents = {
	title: string;
	content: string;
	id: number;
	complete_flag?: boolean;
	created_at: string;
};

// export type GetMemoBody = {
// 	id: number;
// 	title: string;
// 	content: string;
// 	complete_flag: true;
// 	created_at: string;
// };

export type PostNewMemoFormBody = {
	title: string;
	content: string;
	complete_flag?: boolean;
};

// ゴミ箱に移動するためのリクエストデータとIDを含む型を定義
export type TrashMemoMutationVariables = {
	id: number;
	putDate: {
		title: string;
		content: string;
		complete_flag: true;
	};
};

// ゴミ箱からメインに戻すためのリクエストデータとIDを含む型を定義
export type ReturnMemoMutationVariables = {
	id: number;
	putDate: {
		title: string;
		content: string;
		complete_flag: false;
	};
};
