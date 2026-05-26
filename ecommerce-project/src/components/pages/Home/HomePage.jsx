import "./HomePage.css";
import { Header } from "../../elements/Header";
import { products } from "../../../../data/products";
import { ProductContainer } from "../../elements/ProductContainer";

export function HomePage() {
	return (
		<>
			<title>ecommerce project</title>

			<Header />
			<link rel="icon" href="images/favicons/home-favicon.png" />

			<div className="home-page">
				<div className="products-grid">
					{products.map(p => {
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
