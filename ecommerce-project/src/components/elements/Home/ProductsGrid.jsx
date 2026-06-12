import { ProductContainer } from "./ProductContainer";
export function ProductsGrid({ products, loadCart, search }) {
	const searchCriteria = (product, string) => {
		const productName = product.name.toLowerCase();
		const productKeyWords = product.keywords;
		const searchString = string.toLowerCase();

		if (productName.includes(searchString)) return true;
		if (productKeyWords.some(w=>w.includes(searchString))) return true;
	};

	return (
		<div className="products-grid">
			{ 
			products.length > 0 ? 
				products.map((p) => {
					return search && typeof search === "string" ? (
						searchCriteria(p, search) && (
							<ProductContainer key={p.id} product={p} loadCart={loadCart} />
						)
					) : (
						<ProductContainer key={p.id} product={p} loadCart={loadCart} />
					);
				}) 
				: <h1>No products available</h1>
			}
		</div>
	);
}
