import axios from "axios";
import dayjs from "dayjs";
import { formatMoney } from "../../../utils/money";

export function DeliveryOptionContainer({option, item, loadCart}) {
	const updateDeliveryOption = async () => {
		await axios.put(`/api/cart-items/${item.product.id}`, {
			deliveryOptionId : option.id
		});

		await loadCart();
	}

	return (
		<div className="delivery-option">
			<input
				type="radio"
				defaultChecked={option.id === item.deliveryOptionId}
				className="delivery-option-input"
				name={`delivery-option-${item.product.id}`}
				onClick={updateDeliveryOption}
			/>
			<div>
				<div className="delivery-option-date">
					{dayjs(option.estimatedDeliveryTimeMs).format("dddd, MMMM, D")}
				</div>
				<div className="delivery-option-price">
					{option.priceCents
						? `${formatMoney(option.priceCents)} - Shipping`
						: "FREE Shipping"}
				</div>
			</div>
		</div>
	);
}
