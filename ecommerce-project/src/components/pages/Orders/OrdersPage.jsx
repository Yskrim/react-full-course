import axios from "axios";
import { useState, useEffect } from "react";
import { Header } from "../../elements/Header";
import { OrdersGrid } from "../../elements/Orders/OrdersGrid";
import "./OrdersPage.css";

export function OrdersPage({ cart, loadCart }) {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		const getOrdersData = async () => {
			const res = await axios.get("/api/orders?expand=products");
			setOrders(res.data);
		};
		getOrdersData();
	}, []);

	return (
		<>
			<title>Orders</title>
			<div className="orders-page">
				<Header cart={cart} />
				<div className="page-title">Your Orders</div>

				<OrdersGrid orders={orders} loadCart={loadCart}/>
			</div>
		</>
	);
}
