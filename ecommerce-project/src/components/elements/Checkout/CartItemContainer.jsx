import dayjs from "dayjs";
import { formatMoney } from "../../../utils/money";

export function CartItemContainer({ item, deliveryOptions }) {
	const selectedOption = deliveryOptions.find((opt) => {
		return opt.id === item.deliveryOptionId;
	});

	return (
		<div key={item.productId} className="cart-item-container">
			<div className="delivery-date">
				Delivery date:{" "}
				{deliveryOptions.length > 0 &&
					dayjs(selectedOption.estimatedDeliveryTimeMs).format("dddd, MMMM, D")}
			</div>

			<div className="cart-item-details-grid">
				<img className="product-image" src={item.product.image} />

				<div className="cart-item-details">
					<div className="product-name">{item.product.name}</div>
					<div className="product-price">
						{formatMoney(item.product.priceCents)}
					</div>
					<div className="product-quantity">
						<span>Quantity: {item.quantity}</span>
						<span className="update-quantity-link link-primary">Update</span>
						<span className="delete-quantity-link link-primary">Delete</span>
					</div>
				</div>

				<div className="delivery-options">
					<div className="delivery-options-title">
						Choose a delivery option:
					</div>
					{deliveryOptions.map((option) => {
						return (
							<div key={option.id} className="delivery-option">
								<input
									type="radio"
									defaultChecked={option.id === item.deliveryOptionId}
									className="delivery-option-input"
									name={`delivery-option-${item.product.id}`}
								/>
								<div>
									<div className="delivery-option-date">
										{dayjs(option.estimatedDeliveryTimeMs).format(
											"dddd, MMMM, D",
										)}
									</div>
									<div className="delivery-option-price">
										{option.priceCents
											? `${formatMoney(option.priceCents)} - Shipping`
											: "FREE Shipping"}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
