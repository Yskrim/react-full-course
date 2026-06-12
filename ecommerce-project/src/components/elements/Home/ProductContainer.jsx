import axios from "axios";
import { useState, useRef } from "react";
import { formatMoney } from "../../../utils/money";

export function ProductContainer({ product, loadCart }) {
	const { id, image, name, rating, priceCents } = product;
	let intervalRef = useRef(null);
	const [isShown, setIsShown] = useState(false);
	const [quantity, setQuantity] = useState(1);

	const playAnimation = () =>{
		clearTimeout(intervalRef.current);
		setIsShown(true);
		intervalRef.current = setTimeout(()=>{
			setIsShown(false);
		}, 1000);
	}

	const addToCart = async () => {
		await axios.post("/api/cart-items", {
			productId: id,
			quantity,
		});
		await loadCart();

		playAnimation();
	};

	const selectQuantity = (e) => {
		setQuantity(Number(e.target.value));
	}

	return (
		<div className="product-container" id={id} data-testid="product-container">
			<div className="product-image-container">
				<img className="product-image" src={image} data-testid="product-image"/>
			</div>

			<div className="product-name limit-text-to-2-lines">{name}</div>

			<div className="product-rating-container">
				<img
					className="product-rating-stars"
					src={`images/ratings/rating-${rating.stars * 10}.png`}
					data-testid="product-rating-stars-image"
				/>
				<div className="product-rating-count link-primary">{rating.count}</div>
			</div>

			<div className="product-price">{formatMoney(priceCents)}</div>

			<div className="product-quantity-container">
				<select
					value={quantity}
					onChange={selectQuantity}
					data-testid="quantity-selector"
				>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
					<option value="6">6</option>
					<option value="7">7</option>
					<option value="8">8</option>
					<option value="9">9</option>
					<option value="10">10</option>
				</select>
			</div>

			<div className="product-spacer"></div>

			<div className="added-to-cart" style={{ opacity: isShown ? 1 : 0 }}>
				<img src="images/icons/checkmark.png" />
				Added
			</div>

			<button className="add-to-cart-button button-primary" onClick={addToCart} data-testid="add-to-cart-button">
				Add to Cart
			</button>
		</div>
	);
}
