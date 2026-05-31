import axios from "axios";
import { useState, useEffect } from "react";
import { Header } from "../../elements/Header";
import { OrderContainer } from "../../elements/Orders/OrderContainer";
import "./OrdersPage.css";

export function OrdersPage({ cart }) {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		axios.get("/api/orders?expand=products").then((response) => {
			setOrders(response.data);
		});
	}, []);

	return (
		<>
			<title>Orders</title>
			<div className="orders-page">
				<Header cart={cart} />
				<div className="page-title">Your Orders</div>

				<div className="orders-grid">
					{orders.map((order) => {
						return <OrderContainer order={order} key={order.id} />;
					})}
				</div>
			</div>
		</>
	);
}
