import { Link } from "react-router";
import buyAgainIcon from "../../../assets/images/icons/buy-again.png";
import { ProductDeliveryDate } from "./ProductDeliveryDate";

export function OrderProductContainer({ orderID, item }) {
	return (
		<div className="order-product-container">
			<div className="product-image-container">
				<img src={item.product.image} />
			</div>

			<div className="product-details">
				<div className="product-name">{item.product.name}</div>

				<ProductDeliveryDate date={item.product.estimatedDeliveryTimeMs} />

				<div className="product-quantity">Quantity: {item.quantity}</div>
				<button className="buy-again-button button-primary">
					<img className="buy-again-icon" src={buyAgainIcon} />
					<span className="buy-again-message">Add to Cart</span>
				</button>
			</div>

			<div className="product-actions">
				<Link to="/tracking" id={`${orderID}-${item.productId}`}>
					<button className="track-package-button button-secondary">
						Track package
					</button>
				</Link>
			</div>
		</div>
	);
}
