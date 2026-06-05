import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../elements/Header";
import { ProductsGrid } from "../../elements/Home/ProductsGrid";
import { ResetButton } from "../../elements/ResetButton";
import "./HomePage.css";

export function HomePage({ cart, loadCart }) {	
	const [products, setProducts] = useState([]);
	useEffect(() => {
		const getHomeData = async()=>{
			const response = await axios.get("/api/products");
			setProducts(response.data);
		};

		getHomeData();
	}, []);

	return (
		<>
			<title>ecommerce project</title>
			<link rel="icon" href="images/favicons/home-favicon.png" />

			<div className="home-page">
				<Header cart={cart} />
				<ProductsGrid products={products} loadCart={loadCart}/>
			</div>

			<ResetButton loadCart={loadCart}/>
		</>
	);
}
