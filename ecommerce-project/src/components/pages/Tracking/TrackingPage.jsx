import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { Header } from "../../elements/Header";
import "./TrackingPage.css";
import dayjs from "dayjs";
import axios from "axios";

export function TrackingPage({ cart }) {
	const { orderId, productId } = useParams();
	const [order, setOrder] = useState(null);

	useEffect(() => {
		const getData = async () => {
			const response = await axios.get(
				`/api/orders/${orderId}?expand=products`,
			);
			setOrder(response.data);
		};
		getData();
	}, [orderId]);

	if (!order) return null;
	const p = order.products.find((p) => p.productId === productId);
	if (!p) return null;

	const totalTime = p.estimatedDeliveryTimeMs - order.orderTimeMs;
	const timePassed = dayjs().valueOf() - order.orderTimeMs;
	const percentage = (timePassed / totalTime) * 100;
	const progress = percentage > 100 ? 100 : percentage ;

	return (
		<>
			<title>Tracking</title>
			<link rel="icon" href="images/favicons/tracking-favicon.png" />

			<Header cart={cart} />

			<div className="tracking-page">
				<div className="order-tracking">
					<Link className="back-to-orders-link link-primary" to="/orders">
						View all orders
					</Link>

					<div className="delivery-date">
						<div className="product-delivery-date">
							{ progress < 100 ? "Arriving on:" : "Delivered on:"} {dayjs(p.estimatedDeliveryTimeMs).format("MMMM D, YYYY")}
						</div>
					</div>

					<div className="product-info">{p.product.name}</div>

					<div className="product-info">Quantity: {p.quantity}</div>

					<img className="product-image" src={p.product.image} />

					<div className="progress-labels-container">
						<div
							className={`progress-label ${progress < 33 && "current-status"}`}
						>
							Preparing{" "}
						</div>
						<div
							className={`progress-label ${progress >= 33 && progress < 100 && "current-status"}`}
						>
							Shipped
						</div>
						<div
							className={`progress-label ${progress === 100 && "current-status"}`}
						>
							Delivered
						</div>
					</div>

					<div className="progress-bar-container">
						<div
							className="progress-bar"
							style={{ width: `${progress}%` }}
						></div>
					</div>
				</div>
			</div>
		</>
	);
}
