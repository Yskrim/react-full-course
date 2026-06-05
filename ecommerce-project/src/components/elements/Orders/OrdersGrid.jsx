import { OrderContainer } from "./OrderContainer";

export function OrdersGrid({orders, loadCart}) {
	return (
		<div className="orders-grid">
			{orders.map((order) => {
				return <OrderContainer order={order} key={order.id} loadCart={loadCart}/>;
			})}
		</div>
	);
}
