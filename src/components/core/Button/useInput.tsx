"use client";

import { useState } from "react";

export const useInputForm = () => {
	const [value, setValue] = useState("");

	const onChangeValue = (e) => {
		setValue(e.target.value);
	};

	return { value, onChangeValue, setValue }; //オブジェクト。。。value:value を省略している。おんチェンジとかは返す
};
