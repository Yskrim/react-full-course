import axios from "axios";
import { useState, useEffect } from "react";
import { CheckoutHeader } from "../../elements/Checkout/CheckoutHeader";
import "./CheckoutPage.css";
import { PaymentSummaryContainer } from "../../elements/Checkout/PaymentSummaryContainer";
import { CheckoutSummaryContainer } from "../../elements/Checkout/CheckoutSummaryContainer";

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
					<CheckoutSummaryContainer cart={cart} deliveryOptions={deliveryOptions} />

					{paymentSummary && (
						<PaymentSummaryContainer paymentSummary={paymentSummary} />
					)}
				</div>
			</div>
		</>
	);
}
