import dayjs from "dayjs";
import { useState } from "react";
import { formatMoney } from "../../../utils/money";
import { DeliveryOptions } from "./DeliveryOptions";
import axios from "axios";

export function CartItemContainer({ item, deliveryOptions, loadCart }) {
	const selectedOption = deliveryOptions.find((opt) => {
		return opt.id === item.deliveryOptionId;
	});

	const [isUpdating, setIsUpdating] = useState(false);
	const [newValue, setNewValue] = useState(item.quantity);

	const deleteItem = async () => {
		await axios.delete(`/api/cart-items/${item.product.id}`);
		await loadCart();
	};

	const updateItem = async () => {
		if (newValue > 0 && newValue < 999) {
			await axios.put(`/api/cart-items/${item.product.id}`, {
				quantity: newValue,
			});
			await loadCart();
		} else if (newValue === 0) {
			deleteItem();
		} else {
			setNewValue(item.quantity);
			setIsUpdating(false);
		}
	};

	const handleSave = () => {
		updateItem();
		setIsUpdating(false);
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
						{isUpdating ? (
							<>
								<span>Quantity:</span>
								<input
									type="number"
									value={newValue}
									autoFocus
									style={{width: 50}}
									onChange={(e) => {
										setNewValue(Number(e.currentTarget.value));
									}}
									onKeyDown={(e) => {
										e.key === "Enter" && handleSave();
										if (e.key === "Escape") {
											setNewValue(item.quantity);
											setIsUpdating(false);
										}
									}}
								/>
								<span
									className="update-quantity-link link-primary"
									onClick={handleSave}
								>
									Save
								</span>
							</>
						) : (
							<>
								<span>Quantity: {item.quantity}</span>
								<span
									className="update-quantity-link link-primary"
									onClick={() => {
										setIsUpdating(true);
									}}
								>
									Update
								</span>
							</>
						)}
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
