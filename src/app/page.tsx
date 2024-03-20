"use client"

import axios from "axios"

export default function Home() {

	const onClickButton = ()=>{
		axios("https://jsonplaceholder.typicode.com/users").then((res)=>{console.log(res.data.filter((item)=>{return item.id % 2 ===0}))}).catch((err)=>{console.log(err)})
	}

	return(
	<>
		<h1>helloworld</h1>
		<p>helloworld</p>

		<button onClick={onClickButton}>JsonP</button>
	</>
	)
}
	
