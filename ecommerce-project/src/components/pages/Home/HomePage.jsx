import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../elements/Header";
import { ProductsGrid } from "../../elements/Home/ProductsGrid";
import { ResetButton } from "../../elements/ResetButton";
import { useSearchParams } from "react-router";
import "./HomePage.css";

export function HomePage({ cart, loadCart }) {
	const [searchParams] = useSearchParams();
	const search = searchParams.get("search");

	const [products, setProducts] = useState([]);
	useEffect(() => {
		const getHomeData = async () => {
			const response = await axios.get("/api/products");
			setProducts(response.data);
		};

		getHomeData();
	}, [search]);

	return (
		<>
			<title>ecommerce project</title>
			<link rel="icon" href="images/favicons/home-favicon.png" />

			<div className="home-page">
				<Header cart={cart} searchStr={search}/>
				<ProductsGrid products={products} loadCart={loadCart} search={search}/>
			</div>

			<ResetButton loadCart={loadCart} />
		</>
	);
}
