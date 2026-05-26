import { CheckoutHeader } from "../../elements/Checkout/CheckoutHeader";
import "./CheckoutPage.css";
import { CartItemContainer } from "../../elements/Checkout/CartItemContainer";

export function CheckoutPage({ cart }) {
	return (
		<>
			<title>Checkout</title>
			<link rel="icon" href="images/favicons/cart-favicon.png" />
			<CheckoutHeader cart={cart} />

			<div className="checkout-page">
				<div className="page-title">Review your order</div>

				<div className="checkout-grid">
					<div className="order-summary">
						{cart.map((item) => {
							return (
								<CartItemContainer key={item.productId} item={item}/>
							);
						})}
					</div>

					<div className="payment-summary">
						<div className="payment-summary-title">Payment Summary</div>

						<div className="payment-summary-row">
							<div>Items (3):</div>
							<div className="payment-summary-money">$42.75</div>
						</div>

						<div className="payment-summary-row">
							<div>Shipping &amp; handling:</div>
							<div className="payment-summary-money">$4.99</div>
						</div>

						<div className="payment-summary-row subtotal-row">
							<div>Total before tax:</div>
							<div className="payment-summary-money">$47.74</div>
						</div>

						<div className="payment-summary-row">
							<div>Estimated tax (10%):</div>
							<div className="payment-summary-money">$4.77</div>
						</div>

						<div className="payment-summary-row total-row">
							<div>Order total:</div>
							<div className="payment-summary-money">$52.51</div>
						</div>

						<button className="place-order-button button-primary">
							Place your order
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
