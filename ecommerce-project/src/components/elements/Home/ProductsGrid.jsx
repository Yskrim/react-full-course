import { ProductContainer } from "./ProductContainer";
export function ProductsGrid({ products }) {
	return (
		<div className="products-grid">
			{products.map((p) => {
				return <ProductContainer key={p.id} product={p} />;
			})}
		</div> 
	);
}