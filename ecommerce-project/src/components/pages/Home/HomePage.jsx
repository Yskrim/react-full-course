import axios from "axios";
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


	axios.get("http://localhost:3000/api/products")
		.then((response) => {
			console.log(response.data);
		});

	return (
		<>
			<title>ecommerce project</title>

			<Header />
			<link rel="icon" href="images/favicons/home-favicon.png" />

			<div className="home-page">
				<div className="products-grid">
					{/* {products.map(p => {
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
					})} */}
				</div>
			</div>
		</>
	);
}
