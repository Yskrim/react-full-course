import { useState, useEffect } from "react";
import { Route, Routes } from "react-router";
import { HomePage } from "./components/pages/Home/HomePage";
import { CheckoutPage } from "./components/pages/Checkout/CheckoutPage";
import { OrdersPage } from "./components/pages/Orders/OrdersPage";
import { TrackingPage } from "./components/pages/Tracking/TrackingPage";
import { NotFoundPage } from "./components/pages/NotFound/NotFoundPage";
import axios from "axios";
import "./App.css";

function App() {
	const [cart, setCart] = useState([]);

	const loadCart = async () => {
		const response = await axios.get("/api/cart-items?expand=product");
		setCart(response.data);
	};

	useEffect(() => {
		loadCart();
	}, []);

	return (
		<Routes>
			<Route index element={<HomePage cart={cart} loadCart={loadCart}/>} />
			<Route path="/checkout" element={<CheckoutPage cart={cart} loadCart={loadCart}/>} />
			<Route path="/orders" element={<OrdersPage cart={cart} loadCart={loadCart}/>} />
			<Route path="/tracking" element={<TrackingPage cart={cart} />} />
			<Route path="/tracking/:orderId/:productId" element={<TrackingPage cart={cart} />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}

export default App;
