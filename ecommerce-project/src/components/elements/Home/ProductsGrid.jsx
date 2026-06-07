import { ProductContainer } from "./ProductContainer";
export function ProductsGrid({ products, loadCart, search }) {
	const searchCriteria = (product, string) => {
		const productName = product.name.toLowerCase();
		const productKeyWords = product.keywords;
		const searchString = string.toLowerCase();

		if (productName.includes(searchString)) return true;
		if (productKeyWords.includes(searchString)) return true;
	};

	return (
		<div className="products-grid">
			{products.map((p) => {
				return (
					searchCriteria(p, search) && (
						<ProductContainer key={p.id} product={p} loadCart={loadCart} />
					)
				);
			})}
		</div>
	);
}
