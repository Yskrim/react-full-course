import dayjs from "dayjs"

export function ProductDeliveryDate({date}) {
	return (<div className="product-delivery-date">
		Arriving on: {dayjs(date).format("MMMM D, YYYY")}
	</div>)
}
