import { CartItemContainer } from "./CartItemContainer";

export function CheckoutSummaryContainer({ cart, deliveryOptions, loadCart }) {
	return (
		<div className="order-summary">
			{cart.map((item) => {
				return (
					<CartItemContainer
						key={item.productId}
						item={item}
						deliveryOptions={deliveryOptions}
						loadCart={loadCart}
					/>
				);
			})}
		</div>
	);
}
