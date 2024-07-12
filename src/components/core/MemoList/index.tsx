import { Memo } from "../Memo";

export const MemoList = ({ memos }) => {
	return memos.map((memo) => <Memo memo={memo} />);
};
