import dayjs from "dayjs";
import { formatMoney } from "../../../utils/money";
import { DeliveryOptions } from "./DeliveryOptions";
import axios from "axios";

export function CartItemContainer({ item, deliveryOptions, loadCart }) {
	const selectedOption = deliveryOptions.find((opt) => {
		return opt.id === item.deliveryOptionId;
	});

	const deleteItem = async () => {
		await axios.delete(`/api/cart-items/${item.product.id}`);
		await loadCart();
	};

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
						<span
							className="update-quantity-link link-primary"
							onClick={() => {}}
						>
							Update
						</span>
						<span
							className="delete-quantity-link link-primary"
							onClick={deleteItem}
						>
							Delete
						</span>
					</div>
				</div>

				<DeliveryOptions
					deliveryOptions={deliveryOptions}
					item={item}
					loadCart={loadCart}
				/>
			</div>
		</div>
	);
}
