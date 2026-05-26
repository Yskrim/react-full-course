import { useState, useEffect } from 'react'
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

	useEffect(()=>{
		axios.get("/api/cart-items").then((response) => {
			setCart(response.data);
		});
	}, [])
	return (
		<Routes>
			<Route index element={<HomePage cart={cart}/>} />
			<Route path="/checkout" element={<CheckoutPage cart={cart}/>} />
			<Route path="/orders" element={<OrdersPage cart={cart}/>} />
			<Route path="/tracking" element={<TrackingPage cart={cart}/>} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}

export default App;
