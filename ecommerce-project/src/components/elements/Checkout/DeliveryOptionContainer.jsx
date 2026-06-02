import dayjs from "dayjs";
import { formatMoney } from "../../../utils/money";

export function DeliveryOptionContainer({option, item}) {
	return (
		<div className="delivery-option">
			<input
				type="radio"
				defaultChecked={option.id === item.deliveryOptionId}
				className="delivery-option-input"
				name={`delivery-option-${item.product.id}`}
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
