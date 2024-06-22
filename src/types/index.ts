export type LoginFormBody = { email: string; password: string };

export type AccountCreateBody = { email: string; password: string; username: string };

export type MemoContents = {
	title: string;
	content: string;
	id: number;
	complete_flag: true;
};
