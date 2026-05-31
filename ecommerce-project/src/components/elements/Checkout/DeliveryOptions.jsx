import { DeliveryOptionContainer } from "./DeliveryOptionContainer";

export function DeliveryOptions({ deliveryOptions, item }) {
	return (
		<div className="delivery-options">
			<div className="delivery-options-title">Choose a delivery option:</div>
			{deliveryOptions.map((option) => {
				return <DeliveryOptionContainer option={option} item={item} />;
			})}
		</div>
	);
}
