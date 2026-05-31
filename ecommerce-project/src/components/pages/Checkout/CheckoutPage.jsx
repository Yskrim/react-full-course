import { useState, useEffect } from "react";
import axios from "axios";
import { CheckoutHeader } from "../../elements/Checkout/CheckoutHeader";
import "./CheckoutPage.css";
import { CartItemContainer } from "../../elements/Checkout/CartItemContainer";
import { PaymentSummaryContainer } from "../../elements/Checkout/PaymentSummaryContainer";

export function CheckoutPage({ cart }) {
	const [paymentSummary, setPaymentSummary] = useState(null);

	const [deliveryOptions, setDeliveryOptions] = useState([]);

	useEffect(() => {
		axios
			.get("/api/delivery-options?expand=estimatedDeliveryTime")
			.then((response) => {
				setDeliveryOptions(response.data);
			});

		axios.get("/api/payment-summary").then((response) => {
			setPaymentSummary(response.data);
		});
	}, []);

	return (
		<>
			<title>Checkout</title>
			<link rel="icon" href="images/favicons/cart-favicon.png" />

			<div className="checkout-page">

				<CheckoutHeader cart={cart} />

				<div className="page-title">Review your order</div>
				<div className="checkout-grid">
					<div className="order-summary">
						{cart.map((item) => {
							return (
								<CartItemContainer
									key={item.productId}
									item={item}
									deliveryOptions={deliveryOptions}
								/>
							);
						})}
					</div>

					{paymentSummary && (
						<PaymentSummaryContainer paymentSummary={paymentSummary} />
					)}
				</div>
			</div>
		</>
	);
}
