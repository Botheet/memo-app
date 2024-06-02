import { useState } from "react";

const [inputValue, setInputValue] = useState("");
const [memoLists, setMemoLists] = useState<memoList[]>([]);

type memoList = {
	listName: string;
	id: number;
	isSelected: boolean;
};
