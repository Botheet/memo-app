import { MemoList } from "@/components/core/MemoList";
import { useState } from "react";

// const [inputValue, setInputValue] = useState("");
// const [memoLists, setMemoLists] = useState<memoList[]>([]);

type MemoList = {
	listName: string;
	id: number;
	isSelected: boolean;
};

function MemoTitleList() {
	const [memos, setMemos] = useState(["未作成"]);
	return (
		<>
			<MemoList memos={memos} />
		</>
	);
}
export default MemoTitleList;
