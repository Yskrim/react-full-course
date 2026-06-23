// import RobotImage from "../assets/robot.png";
// import UserImage from "../assets/custom-pic.jpeg";
import LoadingSpinner from "../assets/loading-spinner.gif";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import "./ChatMessage.css";

const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const theme = isDark ? oneDark : oneLight;

export function MarkdownRenderer({ content }) {
	return (
		<Markdown
			remarkPlugins={[remarkGfm]}
			components={{
				code({ className, children, ...rest }) {
					const match = /language-(\w+)/.exec(className || "");
					return match ? (
						<SyntaxHighlighter
							language={match[1]}
							style={theme}
							PreTag="div"
							customStyle={{
								fontSize: "0.875rem",
							}}
						>
							{String(children).replace(/\n$/, "")}
						</SyntaxHighlighter>
					) : (
						<code className={className} {...rest}>
							{children}
						</code>
					);
				},
			}}
		>
			{content}
		</Markdown>
	);
}

export function ChatMessage({ message, sender, time, isLoading }) {
	return (
		<div
			className={sender === "user" ? "chat-message-user" : "chat-message-robot"}
		>
			{sender === "user" && <div className="profile-img"></div>}
			<div className="message-bubble">
				{isLoading ? (
					<img src={LoadingSpinner} className="loading-spinner" />
				) : (
					<MarkdownRenderer content={message} />
				)}
				{time && <p className="message-meta">{time}</p>}
			</div>
			{sender === "robot" && <div className="profile-img"></div>}
		</div>
	);
}
