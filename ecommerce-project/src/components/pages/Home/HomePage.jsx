import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../elements/Header";
import { ProductsGrid } from "../../elements/Home/ProductsGrid";
import "./HomePage.css";

export function HomePage({ cart }) {
	/*
	try{
		const res = await fetch("http://localhost:3000/api/products")
		if(!res.ok){
			throw new Error('HTTP error')
		}
		const products = await res.json()
	} catch(err){
		console.log(err.message)
	}

	fetch("http://localhost:3000/api/products")
		.then((res)=>{
			return res.json()
		}).then(data=>{
			console.log(data)
		})
	*/
	
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
				<ProductsGrid products={products} />
			</div>
		</>
	);
}
