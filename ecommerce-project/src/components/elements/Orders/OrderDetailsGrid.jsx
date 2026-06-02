import { OrderProductContainer } from "./OrderProductContainer";

export function OrderDetailsGrid({order}) {
	return (
		<div className="order-details-grid">
			{order.products.map((item) => {
				return (
					<OrderProductContainer
						item={item}
						orderID={order.id}
						key={`${order.id}:${item.productId}`}
					/>
				);
			})}
		</div>
	);
}
