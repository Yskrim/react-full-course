import { Header } from "../../elements/Header";
import { Link } from "react-router";
import "./NotFoundPage.css"

export function NotFoundPage() {
	return (
		<>
            <title>404</title>

			<Header />
			<div className="orders-page">
				<h1>404</h1>
				<h2>Page not found</h2>
				<Link to="/">Return to home</Link>
			</div>
		</>
	);
}
