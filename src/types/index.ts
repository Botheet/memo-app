export type LoginFormBody = { email: string; password: string };

export type AccountCreateBody = { email: string; password: string; username: string };

export type MemoContents = {
	title: string;
	content: string;
	id: number;
	complete_flag: boolean;
	created_at: string;
};

// export type GetMemoBody = {
// 	id: number;
// 	title: string;
// 	content: string;
// 	complete_flag: true;
// 	created_at: string;
// };
