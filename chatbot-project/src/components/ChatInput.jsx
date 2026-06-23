import { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";

import "./ChatInput.css";

export function ChatInput({ chatMessages, setChatMessages }) {
	const [inputText, setInputText] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const inputRef = useRef(null);

    async function sendRequest(query, messages){
        const res = await fetch("http://localhost:3000/api/chat", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ query: query, messages: [...messages] }),
		});
		const data = await res.json();
		return data.response;
    }

	async function sendMessage() {
		const newChatMessages = [
			...chatMessages,
			{
				message: inputText,
				sender: "user",
				id: crypto.randomUUID(),
				time: dayjs().format("h:mma"),
			},
			{
				message: '',
				sender: "robot",
				isLoading: true,
				id: crypto.randomUUID(),
			},
		];
		setChatMessages(newChatMessages);
		setIsLoading(true);

		const response = await sendRequest(inputText, chatMessages);

		setIsLoading(false);
		newChatMessages.splice(-1, 1);
		setChatMessages([
			...newChatMessages,
			{
				message: response,
				sender: "robot",
				id: crypto.randomUUID(),
				time: dayjs().format("h:mma"),
			},
		]);
		setInputText("");
	}

	useEffect(() => {
		if (!isLoading && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isLoading]);

	return (
		<div className="chat-input-container">
            <div className="spacer-bottom"></div>
			<input
				ref={inputRef}
				className="chat-input"
				placeholder="Send a message to Chatbot"
				disabled={isLoading}
				onChange={(e) => {
					setInputText(e.target.value);
				}}
				onKeyDown={(e) => {
					e.key === "Enter" && sendMessage();
					e.key === "Escape" && setInputText("");
				}}
				value={inputText}
			/>
			<div className={`button-group ${inputText ? "is-visible" : ""}`}>
				<button onClick={sendMessage} className="send-button">
					Send
				</button>
				{chatMessages.length > 0 && (
					<button
						onClick={() => {
							localStorage.setItem("messages", JSON.stringify([]));
							setChatMessages([]);
						}}
					>
						Clear
					</button>
				)}
			</div>
		</div>
	);
}
