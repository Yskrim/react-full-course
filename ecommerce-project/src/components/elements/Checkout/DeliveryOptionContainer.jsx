import axios from "axios";
import dayjs from "dayjs";
import { formatMoney } from "../../../utils/money";

export function DeliveryOptionContainer({ option, item, loadCart }) {
	const updateDeliveryOption = async () => {
		if (option.id !== item.deliveryOptionId) {
			await axios.put(`/api/cart-items/${item.product.id}`, {
				deliveryOptionId: option.id,
			});

			await loadCart();
		}
	};

	return (
		<div
			className="delivery-option"
			data-testid="option-container"
			id={`${item.id}-${item.productId}-${option.id}`}
		>
			<input
				type="radio"
				id={option.id}
				checked={option.id === item.deliveryOptionId}
				onChange={() => {}}
				className="delivery-option-input"
				name={`delivery-option-${item.product.id}`}
				onClick={updateDeliveryOption}
				data-testid="test-radio-input"
			/>
			<div>
				<div className="delivery-option-date" data-testid="option-eta">
					{dayjs(option.estimatedDeliveryTimeMs).format("dddd, MMMM, D")}
				</div>
				<div className="delivery-option-price" data-testid="option-price">
					{option.priceCents
						? `${formatMoney(option.priceCents)} - Shipping`
						: "FREE Shipping"}
				</div>
			</div>
		</div>
	);
}
