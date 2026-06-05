import { ProductContainer } from "./ProductContainer";
export function ProductsGrid({ products, loadCart }) {
	return (
		<div className="products-grid">
			{products.map((p) => {
				return <ProductContainer key={p.id} product={p} loadCart={loadCart}/>;
			})}
		</div> 
	);
}