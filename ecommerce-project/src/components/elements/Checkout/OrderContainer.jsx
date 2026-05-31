import dayjs from "dayjs";
import { formatMoney } from "../../../utils/money";
import { OrderProductContainer } from "./OrderProductContainer";

export function OrderContainer({ order }) {
	return (
		<div className="order-container">
			<div className="order-header">
				<div className="order-header-left-section">
					<div className="order-date">
						<div className="order-header-label">Order Placed:</div>
						<div>{dayjs(order.createdAt).format("MMMM D, YYYY")}</div>
					</div>
					<div className="order-total">
						<div className="order-header-label">Total:</div>
						<div>{formatMoney(order.totalCostCents)}</div>
					</div>
				</div>

				<div className="order-header-right-section">
					<div className="order-header-label">Order ID:</div>
					<div>{order.id}</div>
				</div>
			</div>

			<div className="order-details-grid">
				{order.products.map((item) => {
					return (
						<OrderProductContainer
							item={item}
							orderID={order.id}
							key={`${order.id}:${item.productId}`}
						/>
					);
				})}
			</div>
		</div>
	);
}
