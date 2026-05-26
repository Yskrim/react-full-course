import { Link } from "react-router";
import logo from "../../../assets/images/logo.png";
import logo_mobile from "../../../assets/images/mobile-logo.png";
import lock_icon from "../../../assets/images/icons/checkout-lock-icon.png";
import "./CheckoutHeader.css";

export function CheckoutHeader({ cart }) {
	let cartQuantity = 0;
	cart.forEach((item) => {
		cartQuantity += item.quantity;
	});
	return (
		<div className="checkout-header">
			<div className="header-content">
				<div className="checkout-header-left-section">
					<Link to="/">
						<img className="logo" src={logo} />
						<img className="mobile-logo" src={logo_mobile} />
					</Link>
				</div>

				<div className="checkout-header-middle-section">
					Checkout (
					<Link className="return-to-home-link" to="/">
						{cartQuantity} items
					</Link>
					)
				</div>

				<div className="checkout-header-right-section">
					<img src={lock_icon} />
				</div>
			</div>
		</div>
	);
}
