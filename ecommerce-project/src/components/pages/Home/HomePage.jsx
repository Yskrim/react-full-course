import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../elements/Header";
import { ProductContainer } from "../../elements/ProductContainer";
import "./HomePage.css";

export function HomePage() {
	// try{
	// 	const res = await fetch("http://localhost:3000/api/products")
	// 	if(!res.ok){
	// 		throw new Error('HTTP error')
	// 	}
	// 	const products = await res.json()
	// } catch(err){
	// 	console.log(err.message)
	// }

	// fetch("http://localhost:3000/api/products")
	// 	.then((res)=>{
	// 		return res.json()
	// 	}).then(data=>{
	// 		console.log(data)
	// 	})
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState([]);

	useEffect(() => {
		axios.get("/api/products").then((response) => {
			setProducts(response.data);
		});

		axios.get("/api/cart-items").then((response) => {
			setCart(response.data);
		});

	}, []);

	return (
		<>
			<title>ecommerce project</title>
			<link rel="icon" href="images/favicons/home-favicon.png" />

			<Header cart={cart} />

			<div className="home-page">
				<div className="products-grid">
					{products.map((p) => {
						return (
							<ProductContainer
								key={p.id}
								name={p.name}
								id={p.id}
								image={p.image}
								rating={p.rating}
								priceCents={p.priceCents}
							/>
						);
					})}
				</div>
			</div>
		</>
	);
}
