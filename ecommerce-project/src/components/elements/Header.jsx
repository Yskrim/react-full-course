import { NavLink } from "react-router";
import "./Header.css";
import logo_white from "../../assets/images/logo-white.png";
import logo_white_mobile from "../../assets/images/mobile-logo-white.png";
import search_icon from "../../assets/images/icons/search-icon.png";
import cart_icon from "../../assets/images/icons/cart-icon.png";

export function Header({ cart }) {
	let cartQuantity = 0;
	cart.forEach((item) => {
		cartQuantity += item.quantity;
	});

	return (
		<div className="header">
			<div className="left-section">
				<NavLink to="/" className="header-link">
					<img className="logo" src={logo_white} />
					<img className="mobile-logo" src={logo_white_mobile} />
				</NavLink>
			</div>

			<div className="middle-section">
				<input className="search-bar" type="text" placeholder="Search" />

				<button className="search-button">
					<img className="search-icon" src={search_icon} />
				</button>
			</div>

			<div className="right-section">
				<NavLink className="orders-link header-link" to="/orders">
					<span className="orders-text">Orders</span>
				</NavLink>

				<NavLink className="cart-link header-link" to="/checkout">
					<img className="cart-icon" src={cart_icon} />
					<div className="cart-quantity">{cartQuantity}</div>
					<div className="cart-text">Cart</div>
				</NavLink>
			</div>
		</div>
	);
}
